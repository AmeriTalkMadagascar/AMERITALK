import { Stack, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

import { ScreenContainer } from "@/components/screen-container";
import { duo } from "@/constants/design";
import { useAppState } from "@/lib/app-state";
import {
  buildPronunciationSession,
  computeSimpleScore,
  type PronunciationWord,
} from "@/lib/practice-v2";
import { speakNatural } from "@/lib/speech";

// ============================================================
// PRACTICE — MODE PRONUNCIATION
// Design inspired by language learning apps (jauge circulaire 0-100%)
// ============================================================

const TOTAL_WORDS = 10;

type Phase = "ready" | "recording" | "analyzing" | "result" | "finished";

export default function PracticePronounceScreen() {
  const router = useRouter();
  const { hearts, loseHeart, resetHearts, resetCombo, incrementCombo } = useAppState();

  // ===== Session =====
  const [queue] = useState<PronunciationWord[]>(() => buildPronunciationSession(TOTAL_WORDS));
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // ===== Recording =====
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder, 200);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const recordingStartRef = useRef<number>(0);

  const current = queue[index];

  // ===== Animations =====
  const gaugeScale = useRef(new Animated.Value(0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // ===== Setup audio =====
  useEffect(() => {
    void setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true }).catch(
      () => undefined
    );
    resetHearts();
    resetCombo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== Pulse animation pendant l'enregistrement =====
  useEffect(() => {
    if (phase === "recording") {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [phase, pulseAnim]);

  // ===== Démarrer l'enregistrement =====
  const startRecording = async () => {
    try {
      setRecordingError(null);
      setScore(null);

      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        setRecordingError("Microphone permission is required.");
        return;
      }

      await recorder.prepareToRecordAsync({
        ...RecordingPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });

      recorder.record();
      recordingStartRef.current = Date.now();
      setPhase("recording");
    } catch (e) {
      setRecordingError("Could not start recording. Please try again.");
    }
  };

  // ===== Arrêter l'enregistrement (manuel) =====
  const stopRecording = async () => {
    if (phase !== "recording") return;
    setPhase("analyzing");

    try {
      await recorder.stop();
      const duration = Date.now() - recordingStartRef.current;

      // Délai simulé (pour l'UX)
      await new Promise((r) => setTimeout(r, 800));

      // Score basé sur la durée + mot cible
      const computed = computeSimpleScore({
        durationMs: duration,
        targetWord: current?.word ?? "",
      });

      setScore(computed);
      setAttempts((a) => a + 1);
      setBestScore((b) => Math.max(b, computed));

      // Feedback cœurs/combo
      if (computed >= 70) {
        incrementCombo();
      } else {
        loseHeart();
      }

      // Animation de la jauge
      gaugeScale.setValue(0.85);
      Animated.spring(gaugeScale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 120,
      }).start();

      setPhase("result");
    } catch {
      setRecordingError("Analysis failed. Try again.");
      setPhase("ready");
    }
  };

  // ===== Auto-stop après 5s max =====
  useEffect(() => {
    if (phase === "recording" && recorderState.durationMillis > 5000) {
      void stopRecording();
    }
  }, [phase, recorderState.durationMillis]);

  // ===== Écouter le modèle =====
  const playModel = () => {
    if (current) void speakNatural(current.word);
  };

  // ===== Suivant =====
  const goNext = () => {
    if (index + 1 >= queue.length) {
      setPhase("finished");
      return;
    }
    setIndex((i) => i + 1);
    setPhase("ready");
    setScore(null);
    setRecordingError(null);
  };

  // ===== Recommencer =====
  const restart = () => {
    router.replace("/practice-pronounce" as never);
  };

  const finishAndGoBack = () => {
    resetCombo();
    router.back();
  };

  const averageScore =
    attempts > 0 ? Math.round((bestScore + (score ?? 0)) / Math.max(1, attempts)) : 0;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer
        containerClassName="bg-[#131A20]"
        edges={["top", "bottom", "left", "right"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* ===== FINISHED ===== */}
          {phase === "finished" ? (
            <View style={styles.finishWrap}>
              <Text style={styles.finishEmoji}>
                {bestScore >= 85 ? "🏆" : bestScore >= 70 ? "🎉" : "💪"}
              </Text>
              <Text style={styles.finishTitle}>
                {bestScore >= 85
                  ? "Excellent pronunciation!"
                  : bestScore >= 70
                  ? "Great job!"
                  : "Keep practicing!"}
              </Text>
              <Text style={styles.finishScore}>{bestScore}%</Text>
              <Text style={styles.finishSubtitle}>
                Best score this session.{"\n"}Words practiced: {attempts}
              </Text>

              <Pressable onPress={restart} style={styles.primaryButton}>
                <MaterialIcons name="refresh" size={20} color="#0B1116" />
                <Text style={styles.primaryText}>TRY AGAIN</Text>
              </Pressable>
              <Pressable onPress={finishAndGoBack} style={styles.secondaryButton}>
                <Text style={styles.secondaryText}>Back to Practice</Text>
              </Pressable>
            </View>
          ) : current ? (
            <>
              {/* ===== TOP BAR ===== */}
              <View style={styles.topBar}>
                <Pressable onPress={() => router.back()} style={styles.closeButton}>
                  <MaterialIcons name="close" size={22} color={duo.muted} />
                </Pressable>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${((index + 1) / queue.length) * 100}%` },
                    ]}
                  />
                </View>

                <View style={styles.heartsRow}>
                  <MaterialIcons name="favorite" size={18} color={duo.red} />
                  <Text style={styles.heartsText}>{hearts}</Text>
                </View>
              </View>

              {/* ===== INFO BAR ===== */}
              <Text style={styles.infoBar}>
                ×1.0 · NO PENALTY ·{" "}
                {attempts === 0 ? "1ST TRY" : attempts === 1 ? "2ND TRY" : `${attempts + 1}TH TRY`}
              </Text>

              {/* ===== GAUGE ===== */}
              <View style={styles.gaugeSection}>
                {phase === "result" && score !== null ? (
                  <Animated.View style={{ transform: [{ scale: gaugeScale }] }}>
                    <CircularGauge score={score} />
                  </Animated.View>
                ) : (
                  <View style={styles.gaugePlaceholder}>
                    <MaterialIcons
                      name={phase === "recording" ? "graphic-eq" : "mic-none"}
                      size={48}
                      color={phase === "recording" ? duo.green : duo.muted}
                    />
                  </View>
                )}
              </View>

              {/* ===== WORD ===== */}
              <Text style={styles.targetWord}>{current.word}</Text>

              {/* ===== PHONETIC HINTS ===== */}
              <Text style={styles.phoneticHint}>{getPhoneticHint(current.word)}</Text>

              {/* ===== FEEDBACK ===== */}
              {phase === "result" && score !== null ? (
                <Text
                  style={[
                    styles.feedbackText,
                    {
                      color:
                        score >= 80 ? duo.green : score >= 60 ? duo.orange : duo.red,
                    },
                  ]}
                >
                  {score >= 80
                    ? "Perfect! 🎉"
                    : score >= 60
                    ? "Almost there! 💪"
                    : "Try again 🔁"}
                </Text>
              ) : null}

              {recordingError ? (
                <Text style={styles.errorText}>{recordingError}</Text>
              ) : null}

              {/* ===== LISTEN BUTTON ===== */}
              <Pressable
                onPress={playModel}
                style={({ pressed }) => [styles.listenButton, pressed && styles.pressed]}
              >
                <MaterialIcons name="volume-up" size={22} color={duo.blue} />
                <Text style={styles.listenText}>Listen to the model</Text>
              </Pressable>

              {/* ===== MAIN ACTION BUTTON ===== */}
              {phase === "ready" ? (
                <Pressable
                  onPress={startRecording}
                  style={({ pressed }) => [styles.micButton, pressed && styles.pressed]}
                >
                  <MaterialIcons name="mic" size={28} color="#FFFFFF" />
                  <Text style={styles.micButtonText}>TAP TO SPEAK</Text>
                </Pressable>
              ) : phase === "recording" ? (
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <Pressable
                    onPress={stopRecording}
                    style={({ pressed }) => [
                      styles.micButton,
                      styles.micButtonRecording,
                      pressed && styles.pressed,
                    ]}
                  >
                    <MaterialIcons name="stop" size={28} color="#FFFFFF" />
                    <Text style={styles.micButtonText}>TAP TO STOP</Text>
                  </Pressable>
                </Animated.View>
              ) : phase === "analyzing" ? (
                <View style={[styles.micButton, styles.micButtonAnalyzing]}>
                  <Text style={styles.micButtonText}>ANALYZING...</Text>
                </View>
              ) : (
                // phase === "result"
                <View style={styles.resultActions}>
                  <Pressable
                    onPress={() => {
                      setPhase("ready");
                      setScore(null);
                    }}
                    style={({ pressed }) => [
                      styles.retryButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <MaterialIcons name="refresh" size={20} color={duo.muted} />
                    <Text style={styles.retryText}>Retry</Text>
                  </Pressable>
                  <Pressable
                    onPress={goNext}
                    style={({ pressed }) => [
                      styles.nextButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.nextText}>NEXT</Text>
                    <MaterialIcons name="arrow-forward" size={20} color="#0B1116" />
                  </Pressable>
                </View>
              )}
            </>
          ) : null}
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

// ============================================================
// CircularGauge — jauge circulaire 0-100%
// ============================================================
// ============================================================
// HalfCircleGauge — jauge demi-cercle (arc ouvert en haut)
// ============================================================
function CircularGauge({ score }: { score: number }) {
  const size = 260;         // Largeur totale
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  // Demi-cercle : on n'utilise que la moitié de la circonférence
  const semiCircumference = Math.PI * radius;
  const offset = semiCircumference - (semiCircumference * score) / 100;

  const color = score >= 80 ? duo.green : score >= 60 ? duo.orange : duo.red;

  // Le cercle est décalé : l'arc va de gauche à droite en passant par le haut
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View
      style={{
        width: size,
        height: size / 2 + 40,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
        {/* Background half-circle */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={duo.locked}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${semiCircumference} ${semiCircumference * 2}`}
          rotation="-180"
          origin={`${cx}, ${cy}`}
          strokeLinecap="round"
        />
        {/* Score arc */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${semiCircumference - offset} ${semiCircumference * 2}`}
          rotation="-180"
          origin={`${cx}, ${cy}`}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.gaugeCenterHalf}>
        <Text style={[styles.gaugeScoreHalf, { color }]}>{score}%</Text>
      </View>
    </View>
  );
}

// ============================================================
// Phonetic hint — décompose approximativement un mot
// ============================================================
function getPhoneticHint(word: string): string {
  // Décomposition simple par syllabes approximatives (pas d'IPA)
  const lower = word.toLowerCase();
  // Découper toutes les 2-3 lettres pour donner une idée
  const parts: string[] = [];
  let i = 0;
  while (i < lower.length) {
    const chunk = lower.slice(i, i + 3);
    parts.push(chunk);
    i += 3;
  }
  return parts.join(".");
}

// ============================================================
// Styles
// ============================================================
const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 40,
    flexGrow: 1,
  },

  // Top bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  closeButton: { padding: 4 },
  progressTrack: {
    flex: 1,
    height: 12,
    backgroundColor: duo.surface,
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: duo.blue, borderRadius: 6 },
  heartsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  heartsText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },

  // Info bar
  infoBar: {
    color: duo.muted,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    textAlign: "center",
    marginBottom: 30,
  },

  // Gauge
  gaugeSection: {
    alignItems: "center",
    justifyContent: "center",
    height: 220,
    marginBottom: 10,
  },
  gaugePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: duo.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 14,
    borderColor: duo.locked,
  },
  gaugeCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
    gaugeCenterHalf: {
    position: "absolute",
    top: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeScoreHalf: {
    fontSize: 52,
    fontWeight: "900",
  },
  gaugeScore: {
    fontSize: 44,
    fontWeight: "900",
  },

  // Word
  targetWord: {
    color: "#FFFFFF",
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  phoneticHint: {
    color: duo.muted,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 1,
  },

  // Feedback
  feedbackText: {
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 16,
  },
  errorText: {
    color: duo.red,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  // Listen button
  listenButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listenText: { color: duo.blue, fontSize: 14, fontWeight: "800" },

  // Mic button
  micButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: duo.green,
    borderRadius: 20,
    paddingVertical: 22,
    marginTop: "auto",
    borderBottomWidth: 5,
    borderBottomColor: "#3D9401",
  },
  micButtonRecording: {
    backgroundColor: duo.red,
    borderBottomColor: "#B32424",
  },
  micButtonAnalyzing: {
    backgroundColor: duo.muted,
    borderBottomColor: duo.locked,
  },
  micButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  // Result actions
  resultActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: "auto",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: duo.surface,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomColor: duo.locked,
  },
  retryText: { color: duo.muted, fontSize: 14, fontWeight: "900" },
  nextButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: duo.green,
    borderRadius: 16,
    paddingVertical: 18,
    borderBottomWidth: 4,
    borderBottomColor: "#3D9401",
  },
  nextText: { color: "#0B1116", fontSize: 16, fontWeight: "900", letterSpacing: 1 },

  // Finish
  finishWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 10,
  },
  finishEmoji: { fontSize: 80, marginBottom: 12 },
  finishTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    textAlign: "center",
  },
  finishScore: {
    color: duo.gold,
    fontSize: 64,
    fontWeight: "900",
    marginTop: 14,
  },
  finishSubtitle: {
    color: duo.muted,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 26,
    lineHeight: 20,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: duo.green,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderBottomWidth: 4,
    borderBottomColor: "#3D9401",
  },
  primaryText: { color: "#0B1116", fontSize: 14, fontWeight: "900", letterSpacing: 1 },
  secondaryButton: { padding: 14, marginTop: 4 },
  secondaryText: { color: duo.muted, fontSize: 13, fontWeight: "800" },

  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});