import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { RecordingPresets, requestRecordingPermissionsAsync, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from "expo-audio";
import * as FileSystem from "expo-file-system/legacy";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { ScreenContainer } from "@/components/screen-container";
import { duo } from "@/constants/design";
import { useAppState } from "@/lib/app-state";
import { lessons } from "@/lib/content";
import { buildSession, feedbackMessage, requeueAfterMistake, type Exercise } from "@/lib/lesson-engine";
import { lessonXp, pronunciationFeedback, pronunciationScore as calculatePronunciationScore, shouldAutoStopVoice } from "@/lib/practice";
import { preloadAudio, speakNatural } from "@/lib/speech";
import { apiCall } from "@/lib/_core/api";

export default function LessonDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((item) => item.id === id) ?? lessons[0];

  const {
    memory,
    recordAnswer,
    markLessonComplete,
    completedLessons,
    streak,
    masteryOf,
    hearts,
    maxHearts,
    loseHeart,
    resetHearts,
    combo,
    incrementCombo,
    resetCombo,
  } = useAppState();

  const completed = completedLessons.includes(lesson.id);

  const reviewSentences = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lessonSentenceIds = new Set(lesson.sentences.map((s) => s.id));
    return lessons
      .flatMap((l) => l.sentences)
      .filter((s) => !lessonSentenceIds.has(s.id) && memory[s.id] && memory[s.id].dueAt <= today);
  }, [lesson.id]);

  const [queue, setQueue] = useState<Exercise[]>([]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [built, setBuilt] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);

  // Prononciation
  const [isRecording, setIsRecording] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState<string | null>(null);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder, 200);
  const speechDetected = useRef(false);
  const silenceStartedAt = useRef<number | null>(null);
  const analyzingRef = useRef(false);
  const gaugeScale = useRef(new Animated.Value(0.84)).current;

  useEffect(() => {
    setQueue(buildSession(lesson, memory, reviewSentences));
    setStarted(false);
    setIndex(0);
    setAnswer(null);
    setBuilt([]);
    setCorrectCount(0);
    setAttempts(0);
    setFinished(false);
    setPronunciationScore(null);
    setVoiceTranscript(null);
    setRecordingError(null);
    resetCombo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  useEffect(() => {
    void setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true }).catch(() => undefined);
  }, []);

  // Préchargement uniquement (pas de lecture)
  useEffect(() => {
    preloadAudio(lesson.sentences.map((s) => s.english));
  }, [lesson.id]);

  const current = queue[index];
  const mastery = masteryOf(lesson.sentences.map((s) => s.id));

  const submit = (value: string, expected: string, sentenceId: string) => {
    if (answer || !current) return;
    const right = value.trim().toLowerCase() === expected.trim().toLowerCase();
    setAnswer(value);
    setAttempts((c) => c + 1);
    if (right) {
      setCorrectCount((c) => c + 1);
      recordAnswer(sentenceId, true);
      incrementCombo();
    } else {
      loseHeart();
      recordAnswer(sentenceId, false);
      setQueue((q) => requeueAfterMistake(q, index, current));
    }
  };

  const goNext = () => {
    setAnswer(null);
    setBuilt([]);
    setPronunciationScore(null);
    setVoiceTranscript(null);
    setRecordingError(null);
    if (index >= queue.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((v) => v + 1);
  };

  const finish = () => {
    const score = attempts ? Math.round((correctCount / attempts) * 100) : 100;
    markLessonComplete(
      lesson.id,
      lesson.sentences.map((s) => s.id),
      lessonXp(lesson.level, streak, score)
    );
    resetCombo();
    router.back();
  };

  // Prononciation
  const readAudioAsBase64 = async (uri: string) => {
    if (Platform.OS !== "web") return FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const blob = await fetch(uri).then((r) => r.blob());
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result).split(",")[1] || "");
      reader.onerror = () => reject(new Error("Unable to read recording"));
      reader.readAsDataURL(blob);
    });
  };

  const analyzeRecording = async () => {
    if (analyzingRef.current || !current || current.kind !== "speak") return;
    analyzingRef.current = true;
    try {
      setRecordingError(null);
      await recorder.stop();
      const uri = recorder.uri;
      if (!uri) {
        setRecordingError("Aucun enregistrement capté.");
        return;
      }
      setVoiceLoading(true);
      const audioBase64 = await readAudioAsBase64(uri);
      const result = await apiCall<{ text: string }>("/api/voice/transcribe", {
        method: "POST",
        body: JSON.stringify({
          audioBase64,
          mimeType: Platform.OS === "web" ? "audio/webm" : "audio/m4a",
          language: "en",
          prompt: `English pronunciation practice. Target sentence: ${current.sentence.english}`,
        }),
      });
      const score = calculatePronunciationScore(current.sentence.english, result.text);
      setPronunciationScore(score);
      setVoiceTranscript(result.text);
      recordAnswer(current.sentence.id, score >= 70);
      if (score >= 70) incrementCombo();
      else loseHeart();
      setVoiceLoading(false);
      Animated.spring(gaugeScale, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 140 }).start();
    } catch {
      setVoiceLoading(false);
      setRecordingError("Analyse vocale échouée.");
    } finally {
      analyzingRef.current = false;
      speechDetected.current = false;
      silenceStartedAt.current = null;
    }
  };

  const practicePronunciation = async () => {
    try {
      setRecordingError(null);
      setPronunciationScore(null);
      setVoiceTranscript(null);
      gaugeScale.setValue(0.84);
      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        setRecordingError("Permission micro requise.");
        return;
      }
      await recorder.prepareToRecordAsync({ ...RecordingPresets.HIGH_QUALITY, isMeteringEnabled: true });
      recorder.record();
      setIsRecording(true);
      speechDetected.current = false;
      silenceStartedAt.current = null;
    } catch {
      setRecordingError("Enregistrement impossible.");
    }
  };

  useEffect(() => {
    if (!recorderState.isRecording || voiceLoading) return;
    const metering = recorderState.metering ?? -160;
    const speaking = metering > -45;
    if (speaking) {
      speechDetected.current = true;
      silenceStartedAt.current = null;
    } else if (speechDetected.current && recorderState.durationMillis > 700) {
      silenceStartedAt.current ??= Date.now();
      if (
        shouldAutoStopVoice({
          metering,
          hasDetectedSpeech: speechDetected.current,
          silenceDurationMillis: Date.now() - silenceStartedAt.current,
          durationMillis: recorderState.durationMillis,
        })
      ) {
        setIsRecording(false);
        void analyzeRecording();
      }
    }
    if (
      shouldAutoStopVoice({
        metering,
        hasDetectedSpeech: speechDetected.current,
        silenceDurationMillis: 0,
        durationMillis: recorderState.durationMillis,
      })
    ) {
      setIsRecording(false);
      void analyzeRecording();
    }
  }, [recorderState.isRecording, recorderState.metering, recorderState.durationMillis, voiceLoading]);

  const feedback =
    current && answer
      ? feedbackMessage(
          answer.trim().toLowerCase() ===
            (("answer" in current ? current.answer : "") as string).trim().toLowerCase(),
          ("answer" in current ? current.answer : "") as string,
          "sentence" in current ? memory[current.sentence.id] : undefined
        )
      : null;
  const isCorrect = feedback?.title !== "Pas encore";
  const gameOver = hearts <= 0 && !finished;

  // ===== Labels =====
  const stepTag = current ? getStepTag(current) : "";
  const stepTitle = current ? getStepTitle(current) : "";

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-5" containerClassName="bg-[#131A20]">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {!started ? (
            // ===== INTRO =====
            <View>
              <View style={styles.top}>
                <Pressable onPress={() => router.back()} style={styles.back}>
                  <MaterialIcons name="close" size={20} color={duo.muted} />
                </Pressable>
              </View>
              <View style={styles.hero}>
                <Text style={styles.level}>{lesson.level.toUpperCase()}</Text>
                <Text style={styles.title}>{lesson.title}</Text>
                <Text style={styles.subtitle}>{lesson.subtitle}</Text>
                <View style={styles.masteryRow}>
                  <View style={styles.masteryBar}>
                    <View style={[styles.masteryFill, { width: `${mastery}%` }]} />
                  </View>
                  <Text style={styles.masteryText}>{mastery}% maîtrisé</Text>
                </View>
              </View>
              <View style={styles.introCard}>
                <Text style={styles.introKicker}>COMMENT ÇA MARCHE</Text>
                <Text style={styles.introTitle}>Des phrases, pas des mots isolés.</Text>
                <Text style={styles.introText}>
                  Tu apprends des phrases complètes, comme dans la vraie vie. Chaque erreur te donne la correction et revient plus loin. Les phrases acquises reviendront à intervalles croissants.
                </Text>
                {reviewSentences.length > 0 && (
                  <View style={styles.reviewNote}>
                    <MaterialIcons name="refresh" size={14} color={duo.gold} />
                    <Text style={styles.reviewNoteText}>
                      {Math.min(3, reviewSentences.length)} phrase(s) à réviser d'abord
                    </Text>
                  </View>
                )}
              </View>
              <Pressable
                onPress={() => {
                  resetHearts();
                  setStarted(true);
                }}
                style={styles.primary}
              >
                <Text style={styles.primaryText}>Commencer</Text>
              </Pressable>
            </View>
          ) : gameOver ? (
            // ===== PLUS DE CŒURS =====
            <View>
              <View style={styles.resultCard}>
                <Text style={[styles.resultKicker, { color: duo.red }]}>PLUS DE CŒURS</Text>
                <View style={[styles.resultBadge, { backgroundColor: duo.redSoft }]}>
                  <MaterialIcons name="favorite-border" size={44} color={duo.red} />
                </View>
                <Text style={styles.resultTitle}>Aïe...</Text>
                <Text style={styles.resultText}>
                  Tu as perdu tous tes cœurs. Reviens plus tard ou réessaie.
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  resetHearts();
                  setStarted(false);
                  setIndex(0);
                  setAnswer(null);
                  setBuilt([]);
                  setCorrectCount(0);
                  setAttempts(0);
                }}
                style={styles.primary}
              >
                <Text style={styles.primaryText}>Réessayer</Text>
              </Pressable>
              <Pressable onPress={() => router.back()} style={styles.secondary}>
                <Text style={styles.secondaryText}>Retour au chemin</Text>
              </Pressable>
            </View>
          ) : !finished && current ? (
            <>
              {/* ===== BARRE HAUT ===== */}
              <View style={styles.top}>
                <Pressable onPress={() => router.back()} style={styles.closeButton}>
                  <MaterialIcons name="close" size={22} color={duo.muted} />
                </Pressable>
                <View style={styles.progress}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${Math.min(100, ((index + 1) / queue.length) * 100)}%` },
                    ]}
                  />
                </View>
                <View style={styles.heartsRow}>
                  <MaterialIcons
                    name="favorite"
                    size={18}
                    color={hearts === 0 ? duo.muted : duo.red}
                  />
                  <Text style={styles.hearts}>{hearts}</Text>
                </View>
              </View>

              {/* ===== COMBO ===== */}
              {combo > 1 ? (
                <Text style={styles.comboText}>COMBO x{combo}</Text>
              ) : null}

              {/* ===== TAG + TITRE ===== */}
              <Text style={styles.stepTag}>{stepTag}</Text>
              <Text style={styles.stepTitle}>{stepTitle}</Text>

              {/* ===== EXERCICE : EXPOSE ===== */}
              {current.kind === "expose" ? (
                <View>
                  <View style={styles.bubble}>
                    <Pressable
                      onPress={() => void speakNatural(current.sentence.english)}
                      style={styles.speakerBubble}
                    >
                      <MaterialIcons name="volume-up" size={22} color={duo.blue} />
                    </Pressable>
                    <Text style={styles.bubbleText}>{current.sentence.english}</Text>
                  </View>
                  <View style={styles.infoCard}>
                    <Text style={styles.infoPhonetic}>{current.sentence.focusPhonetic}</Text>
                    <Text style={styles.infoFrench}>{current.sentence.french}</Text>
                    <View style={styles.focusChip}>
                      <MaterialIcons name="lightbulb-outline" size={14} color={duo.gold} />
                      <Text style={styles.focusText}>
                        {current.sentence.focusWord} = {current.sentence.focusTranslation}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.bottomArea}>
                    <Pressable
                      onPress={() => {
                        recordAnswer(current.sentence.id, true);
                        goNext();
                      }}
                      style={styles.primary}
                    >
                      <Text style={styles.primaryText}>J'AI COMPRIS</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              {/* ===== EXERCICE : TRANSLATE ===== */}
              {current.kind === "translate" ? (
                <View>
                  <View style={styles.bubble}>
                    <Pressable
                      onPress={() => void speakNatural(current.sentence.english)}
                      style={styles.speakerBubble}
                    >
                      <MaterialIcons name="volume-up" size={22} color={duo.blue} />
                    </Pressable>
                    <Text style={styles.bubbleText}>{current.sentence.english}</Text>
                  </View>
                  <View style={styles.choices}>
                    {current.choices.map((choice) => {
                      const picked = answer === choice;
                      const right = choice === current.answer;
                      const reveal = !!answer && right;
                      return (
                        <Pressable
                          key={choice}
                          disabled={!!answer}
                          onPress={() => submit(choice, current.answer, current.sentence.id)}
                          style={[
                            styles.choice,
                            (picked || reveal) && (right ? styles.choiceGood : styles.choiceBad),
                          ]}
                        >
                          <Text style={styles.choiceText}>{choice}</Text>
                          {picked || reveal ? (
                            <MaterialIcons
                              name={right ? "check-circle" : "cancel"}
                              size={20}
                              color={right ? duo.green : duo.red}
                            />
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>
                  <View style={styles.bottomArea}>
                    {feedback ? <FeedbackBanner feedback={feedback} correct={isCorrect} /> : null}
                    <Pressable
                      disabled={!answer}
                      onPress={goNext}
                      style={[styles.primary, !answer && styles.disabled]}
                    >
                      <Text style={styles.primaryText}>VALIDER</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              {/* ===== EXERCICE : BUILD ===== */}
              {current.kind === "build" ? (
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>{current.sentence.french}</Text>
                  </View>

                  {/* Zone de réponse (lignes horizontales) */}
                  <View style={styles.buildArea}>
                    {built.length === 0 ? (
                      <View style={styles.emptyLines}>
                        <View style={styles.line} />
                        <View style={styles.line} />
                      </View>
                    ) : (
                      <View style={styles.builtTokens}>
                        {built.map((token, i) => (
                          <Pressable
                            key={`${token}-${i}`}
                            onPress={() => {
                              if (answer) return;
                              setBuilt((v) => v.filter((_, idx) => idx !== i));
                            }}
                            style={styles.builtToken}
                          >
                            <Text style={styles.builtTokenText}>{token}</Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Tuiles disponibles */}
                  <View style={styles.tokens}>
                    {current.tokens.map((token, tokenIndex) => {
                      const used =
                        built.filter((t) => t === token).length >
                        current.tokens.slice(0, tokenIndex + 1).filter((t) => t === token).length - 1;
                      return (
                        <Pressable
                          key={`${token}-${tokenIndex}`}
                          disabled={!!answer || used}
                          onPress={() => setBuilt((v) => [...v, token])}
                          style={[styles.token, used && styles.tokenUsed]}
                        >
                          <Text style={styles.tokenText}>{token}</Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <View style={styles.bottomArea}>
                    {feedback ? <FeedbackBanner feedback={feedback} correct={isCorrect} /> : null}
                    {!answer ? (
                      <Pressable
                        disabled={!built.length}
                        onPress={() => submit(built.join(" "), current.answer, current.sentence.id)}
                        style={[styles.primary, !built.length && styles.disabled]}
                      >
                        <Text style={styles.primaryText}>VALIDER</Text>
                      </Pressable>
                    ) : (
                      <Pressable onPress={goNext} style={styles.primary}>
                        <Text style={styles.primaryText}>CONTINUER</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              ) : null}

              {/* ===== EXERCICE : LISTEN ===== */}
              {current.kind === "listen" ? (
                <View>
                  <Pressable
                    onPress={() => void speakNatural(current.sentence.english)}
                    style={styles.listenBig}
                  >
                    <MaterialIcons name="volume-up" size={44} color="#FFFFFF" />
                  </Pressable>
                  <Text style={styles.listenHint}>Touche pour écouter</Text>

                  <View style={styles.choices}>
                    {current.choices.map((choice) => {
                      const picked = answer === choice;
                      const right = choice === current.answer;
                      const reveal = !!answer && right;
                      return (
                        <Pressable
                          key={choice}
                          disabled={!!answer}
                          onPress={() => submit(choice, current.answer, current.sentence.id)}
                          style={[
                            styles.choice,
                            (picked || reveal) && (right ? styles.choiceGood : styles.choiceBad),
                          ]}
                        >
                          <Text style={styles.choiceText}>{choice}</Text>
                          {picked || reveal ? (
                            <MaterialIcons
                              name={right ? "check-circle" : "cancel"}
                              size={20}
                              color={right ? duo.green : duo.red}
                            />
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>
                  <View style={styles.bottomArea}>
                    {feedback ? <FeedbackBanner feedback={feedback} correct={isCorrect} /> : null}
                    <Pressable
                      disabled={!answer}
                      onPress={goNext}
                      style={[styles.primary, !answer && styles.disabled]}
                    >
                      <Text style={styles.primaryText}>VALIDER</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              {/* ===== EXERCICE : RECALL ===== */}
              {current.kind === "recall" ? (
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>{current.sentence.french}</Text>
                  </View>
                  <View style={styles.choices}>
                    {current.choices.map((choice) => {
                      const picked = answer === choice;
                      const right = choice === current.answer;
                      const reveal = !!answer && right;
                      return (
                        <Pressable
                          key={choice}
                          disabled={!!answer}
                          onPress={() => submit(choice, current.answer, current.sentence.id)}
                          style={[
                            styles.choice,
                            (picked || reveal) && (right ? styles.choiceGood : styles.choiceBad),
                          ]}
                        >
                          <Text style={styles.choiceText}>{choice}</Text>
                          {picked || reveal ? (
                            <MaterialIcons
                              name={right ? "check-circle" : "cancel"}
                              size={20}
                              color={right ? duo.green : duo.red}
                            />
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </View>
                  <View style={styles.bottomArea}>
                    {feedback ? <FeedbackBanner feedback={feedback} correct={isCorrect} /> : null}
                    <Pressable
                      disabled={!answer}
                      onPress={goNext}
                      style={[styles.primary, !answer && styles.disabled]}
                    >
                      <Text style={styles.primaryText}>VALIDER</Text>
                    </Pressable>
                  </View>
                </View>
              ) : null}

              {/* ===== EXERCICE : SPEAK ===== */}
              {current.kind === "speak" ? (
                <View>
                  <View style={styles.bubble}>
                    <Pressable
                      onPress={() => void speakNatural(current.sentence.english)}
                      style={styles.speakerBubble}
                    >
                      <MaterialIcons name="volume-up" size={22} color={duo.blue} />
                    </Pressable>
                    <Text style={styles.bubbleText}>{current.sentence.english}</Text>
                  </View>

                  {pronunciationScore === null && !voiceLoading ? (
                    <Pressable
                      onPress={practicePronunciation}
                      disabled={isRecording}
                      style={[styles.micButton, isRecording && styles.micRecording]}
                    >
                      <MaterialIcons name="mic" size={28} color="#0B1116" />
                      <Text style={styles.micButtonText}>
                        {isRecording ? "ÉCOUTE EN COURS..." : "TOUCHE POUR PARLER"}
                      </Text>
                    </Pressable>
                  ) : null}

                  {isRecording ? <Text style={styles.vadHint}>Parle naturellement</Text> : null}
                  {voiceLoading ? <Text style={styles.loadingText}>Analyse en cours...</Text> : null}
                  {recordingError ? <Text style={styles.errorText}>{recordingError}</Text> : null}

                  {pronunciationScore !== null ? (
                    <View style={styles.scoreBox}>
                      <Animated.View style={[styles.gaugeWrap, { transform: [{ scale: gaugeScale }] }]}>
                        <Svg width={100} height={100} viewBox="0 0 100 100">
                          <Circle cx="50" cy="50" r="42" stroke={duo.locked} strokeWidth="8" fill="none" />
                          <Circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke={pronunciationScore >= 70 ? duo.green : duo.orange}
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray="264"
                            strokeDashoffset={264 - (264 * pronunciationScore) / 100}
                            rotation="-90"
                            origin="50, 50"
                          />
                        </Svg>
                        <View style={styles.gaugeCenter}>
                          <Text style={styles.gaugeScore}>{pronunciationScore}%</Text>
                        </View>
                      </Animated.View>
                      <View style={styles.scoreCopy}>
                        <Text style={styles.scoreTitle}>
                          {pronunciationFeedback(pronunciationScore, { english: current.sentence.english, phonetic: current.sentence.focusPhonetic } as never).title}
                        </Text>
                        <Text style={styles.scoreDetail}>
                          {pronunciationFeedback(pronunciationScore, { english: current.sentence.english, phonetic: current.sentence.focusPhonetic } as never).detail}
                        </Text>
                        {voiceTranscript ? (
                          <Text style={styles.transcript}>Entendu : « {voiceTranscript} »</Text>
                        ) : null}
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.bottomArea}>
                    {pronunciationScore !== null ? (
                      <Pressable onPress={goNext} style={styles.primary}>
                        <Text style={styles.primaryText}>CONTINUER</Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => {
                          setAttempts((c) => c + 1);
                          setCorrectCount((c) => c + 1);
                          goNext();
                        }}
                        style={styles.secondary}
                      >
                        <Text style={styles.secondaryText}>Je ne peux pas parler</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              ) : null}
            </>
          ) : (
            // ===== FIN =====
            <View>
              <View style={styles.resultCard}>
                <Text style={styles.resultKicker}>SESSION TERMINÉE</Text>
                <View style={styles.resultBadge}>
                  <MaterialIcons name="stars" size={44} color={duo.gold} />
                </View>
                <Text style={styles.resultTitle}>Bravo !</Text>
                <Text style={styles.resultText}>
                  {correctCount}/{attempts} bonnes réponses. Les phrases ratées reviendront bientôt.
                </Text>
                <View style={styles.stats}>
                  <View style={styles.statItem}>
                    <MaterialIcons name="diamond" size={18} color={duo.blue} />
                    <Text style={styles.statValue}>
                      +{lessonXp(lesson.level, streak, attempts ? Math.round((correctCount / attempts) * 100) : 100)} XP
                    </Text>
                  </View>
                  <View style={styles.statItem}>
                    <MaterialIcons name="favorite" size={18} color={duo.red} />
                    <Text style={styles.statValue}>{hearts}/{maxHearts}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <MaterialIcons name="psychology" size={18} color={duo.purple} />
                    <Text style={styles.statValue}>{mastery}%</Text>
                  </View>
                </View>
              </View>
              <Pressable onPress={finish} style={styles.primary}>
                <Text style={styles.primaryText}>
                  {completed ? "RETOUR AU CHEMIN" : "SAUVEGARDER ET CONTINUER"}
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

// ===== Helpers =====
function getStepTag(ex: Exercise): string {
  switch (ex.kind) {
    case "expose":
      return "NOUVEAU MOT";
    case "translate":
      return "TRADUIS CETTE PHRASE";
    case "build":
      return "CONSTRUIS LA PHRASE";
    case "listen":
      return "ÉCOUTE";
    case "recall":
      return "RAPPEL ACTIF";
    case "speak":
      return "RÉPÈTE APRÈS LE PROFESSEUR";
  }
}

function getStepTitle(ex: Exercise): string {
  switch (ex.kind) {
    case "expose":
      return "Découvre cette phrase";
    case "translate":
      return "Traduis cette phrase";
    case "build":
      return "Construis cette phrase";
    case "listen":
      return "Écoute et choisis";
    case "recall":
      return "Comment dit-on ?";
    case "speak":
      return "Répète la phrase";
  }
}

// ===== Composants =====
function FeedbackBanner({
  feedback,
  correct,
}: {
  feedback: { title: string; detail: string };
  correct: boolean;
}) {
  return (
    <View style={[styles.feedback, correct ? styles.feedbackGood : styles.feedbackBad]}>
      <MaterialIcons
        name={correct ? "check-circle" : "cancel"}
        size={22}
        color={correct ? duo.green : duo.red}
      />
      <Text style={[styles.feedbackTitle, { color: correct ? duo.green : duo.red }]}>
        {feedback.title}
      </Text>
    </View>
  );
}

// ===== Styles =====
const styles = StyleSheet.create({
  content: { paddingTop: 14, paddingBottom: 42 },

  back: { padding: 10 }, top: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  closeButton: { padding: 4 },
  progress: { height: 14, flex: 1, backgroundColor: duo.surface, borderRadius: 7, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: duo.blue, borderRadius: 7 },
  heartsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  hearts: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },

  comboText: {
    color: duo.blue,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 12,
  },

  stepTag: {
    color: duo.purple,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  stepTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
    lineHeight: 30,
  },

  // Bulle de dialogue
  bubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: duo.locked,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },
  speakerBubble: { padding: 2 },
  bubbleText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800", flex: 1, lineHeight: 24 },

  // Carte info (expose)
  infoCard: {
    backgroundColor: duo.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    alignItems: "center",
  },
  infoPhonetic: { color: duo.blue, fontSize: 13, marginBottom: 8 },
  infoFrench: { color: "#FFFFFF", fontSize: 16, fontWeight: "800", textAlign: "center" },
  focusChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: duo.locked,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 14,
  },
  focusText: { color: duo.gold, fontSize: 11, fontWeight: "800" },

  // Zone de réponse build
  buildArea: {
    minHeight: 80,
    justifyContent: "center",
    marginBottom: 30,
  },
  emptyLines: { gap: 14 },
  line: { height: 2, backgroundColor: duo.locked, borderRadius: 1 },
  builtTokens: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  builtToken: {
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: duo.blue,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  builtTokenText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },

  // Tuiles mots
  tokens: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 30,
    justifyContent: "center",
  },
  token: {
    backgroundColor: duo.surface,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: duo.locked,
  },
  tokenUsed: { opacity: 0.25 },
  tokenText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },

  // Choix QCM
  choices: { gap: 10, marginBottom: 24 },
  choice: {
    backgroundColor: "transparent",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: duo.locked,
  },
  choiceGood: { backgroundColor: duo.greenSoft, borderColor: duo.green },
  choiceBad: { backgroundColor: duo.redSoft, borderColor: duo.red },
  choiceText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", flex: 1 },

  // Listen
  listenBig: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: duo.blue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderBottomWidth: 5,
    borderBottomColor: "#1488C5",
  },
  listenHint: {
    color: duo.muted,
    fontSize: 12,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 30,
  },

  // Feedback
  feedback: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
  },
  feedbackGood: { backgroundColor: duo.greenSoft, borderColor: duo.green },
  feedbackBad: { backgroundColor: duo.redSoft, borderColor: duo.red },
  feedbackTitle: { fontSize: 15, fontWeight: "900" },

  // Bottom
  bottomArea: { marginTop: "auto" },

  // Boutons
  primary: {
    backgroundColor: duo.green,
    borderRadius: 14,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderBottomWidth: 4,
    borderBottomColor: "#3D9401",
  },
  primaryText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", letterSpacing: 1 },
  secondary: {
    borderRadius: 14,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  secondaryText: { color: duo.muted, fontSize: 13, fontWeight: "800" },
  disabled: { opacity: 0.35 },

  // Micro
  micButton: {
    backgroundColor: duo.green,
    borderRadius: 16,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    borderBottomWidth: 4,
    borderBottomColor: "#3D9401",
  },
  micRecording: { backgroundColor: duo.orange, borderBottomColor: "#B96A00" },
  micButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  vadHint: { color: duo.orange, fontSize: 11, textAlign: "center", marginTop: 10, fontWeight: "700" },
  loadingText: { color: duo.blue, fontSize: 12, textAlign: "center", marginTop: 12, fontWeight: "800" },
  errorText: { color: duo.red, fontSize: 11, textAlign: "center", marginTop: 10, fontWeight: "700" },

  scoreBox: {
    backgroundColor: duo.surface,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 16,
  },
  gaugeWrap: { width: 100, height: 100, alignItems: "center", justifyContent: "center" },
  gaugeCenter: { position: "absolute", alignItems: "center", justifyContent: "center" },
  gaugeScore: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  scoreCopy: { flex: 1 },
  scoreTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
  scoreDetail: { color: "#B8C0C9", fontSize: 11, lineHeight: 16, marginTop: 4 },
  transcript: { color: "#D4DCE2", fontSize: 10, lineHeight: 15, marginTop: 6, fontStyle: "italic" },

  // Intro / fin
  hero: { backgroundColor: duo.surface, borderRadius: 20, padding: 22, marginBottom: 14 },
  level: { color: duo.blue, fontSize: 10, fontWeight: "900", letterSpacing: 1.4 },
  title: { color: "#FFFFFF", fontSize: 28, fontWeight: "900", marginTop: 8 },
  subtitle: { color: duo.muted, fontSize: 13, marginTop: 5 },
  masteryRow: { marginTop: 20, gap: 7 },
  masteryBar: { height: 8, backgroundColor: duo.locked, borderRadius: 4, overflow: "hidden" },
  masteryFill: { height: "100%", backgroundColor: duo.gold, borderRadius: 4 },
  masteryText: { color: duo.muted, fontSize: 10, fontWeight: "800" },

  introCard: { backgroundColor: duo.surface, borderRadius: 18, padding: 18, marginBottom: 14 },
  introKicker: { color: duo.green, fontSize: 10, fontWeight: "900", letterSpacing: 1.2 },
  introTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", marginTop: 8 },
  introText: { color: duo.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  reviewNote: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 },
  reviewNoteText: { color: duo.gold, fontSize: 11, fontWeight: "800" },

  resultCard: { backgroundColor: duo.surface, borderRadius: 22, padding: 24, alignItems: "center" },
  resultKicker: { color: duo.gold, fontSize: 10, fontWeight: "900", letterSpacing: 1.4 },
  resultBadge: { marginTop: 14, padding: 12, backgroundColor: duo.locked, borderRadius: 999 },
  resultTitle: { color: "#FFFFFF", fontSize: 26, fontWeight: "900", marginTop: 6 },
  resultText: { color: duo.muted, fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 8 },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: duo.locked,
  },
  statItem: { alignItems: "center", gap: 4 },
  statValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", textAlign: "center" },
});