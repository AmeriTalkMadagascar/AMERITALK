import { Stack, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useAppState } from "@/lib/app-state";
import { buildPracticeSession, type PracticeExercise } from "@/lib/practice-v2";

// ============================================================
// PRACTICE — MODE EXERCISE (QCM)
// 10 questions générées automatiquement depuis les leçons V2
// ============================================================

const glass = {
  cardBg: "rgba(255, 255, 255, 0.08)",
  cardBorder: "rgba(255, 255, 255, 0.18)",
  bgTop: "#2A1B4A",
  accentGreen: "#5BE58C",
  accentGold: "#FFD75E",
  accentBlue: "#6EC6FF",
  accentPink: "#FF8FB8",
  accentRed: "#FF6B6B",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.75)",
  textMuted: "rgba(255, 255, 255, 0.55)",
} as const;

const TOTAL_QUESTIONS = 10;

export default function PracticeExerciseScreen() {
  const router = useRouter();
  const { hearts, loseHeart, resetHearts, resetCombo, incrementCombo, combo } = useAppState();

  // ===== Session (générée UNE SEULE fois) =====
  const [queue] = useState<PracticeExercise[]>(() => buildPracticeSession(TOTAL_QUESTIONS));

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [finished, setFinished] = useState(false);

  const feedbackScale = useRef(new Animated.Value(0)).current;
  const current = queue[index];
  const gameOver = hearts <= 0 && !finished;

  useEffect(() => {
    resetHearts();
    resetCombo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== Submit =====
  const onPick = (choice: string) => {
    if (picked || !current) return;
    setPicked(choice);
    setAttempts((a) => a + 1);
    const right = choice === current.answer;

    if (right) {
      setCorrectCount((c) => c + 1);
      incrementCombo();
    } else {
      loseHeart();
    }

    // Animation
    feedbackScale.setValue(0);
    Animated.spring(feedbackScale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 10,
      stiffness: 140,
    }).start();

    // Passage automatique après 1.5s
    setTimeout(() => {
      if (index + 1 >= queue.length) {
        setFinished(true);
      } else {
        setIndex((i) => i + 1);
        setPicked(null);
      }
    }, 1500);
  };

  const restart = () => {
    // Nouvelle session : on régénère tout
    router.replace("/practice-exercise" as never);
  };

  const finishAndGoBack = () => {
    resetCombo();
    router.back();
  };

  const progressPercent = queue.length > 0 ? ((index + 1) / queue.length) * 100 : 0;
  const isCorrect = picked === current?.answer;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "bottom", "left", "right"]}>
        {/* Background */}
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <View style={[styles.bgLayer, { backgroundColor: glass.bgTop }]} />
          <View style={[styles.bgBlob, styles.bgBlob1]} />
          <View style={[styles.bgBlob, styles.bgBlob2]} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* ===== GAME OVER ===== */}
          {gameOver ? (
            <View style={styles.finishWrap}>
              <Text style={styles.finishEmoji}>💔</Text>
              <Text style={styles.finishTitle}>Out of hearts!</Text>
              <Text style={styles.finishSubtitle}>
                You lost all your hearts. Try again later.
              </Text>
              <Pressable onPress={finishAndGoBack} style={styles.primaryButton}>
                <MaterialIcons name="arrow-back" size={20} color="#0B1116" />
                <Text style={styles.primaryText}>BACK TO PRACTICE</Text>
              </Pressable>
            </View>
          ) : finished ? (
            // ===== FINISHED =====
            <View style={styles.finishWrap}>
              <Text style={styles.finishEmoji}>
                {correctCount >= 8 ? "🏆" : correctCount >= 5 ? "🎉" : "💪"}
              </Text>
              <Text style={styles.finishTitle}>
                {correctCount >= 8 ? "Excellent!" : correctCount >= 5 ? "Well done!" : "Keep going!"}
              </Text>
              <Text style={styles.finishScore}>
                {correctCount} / {attempts}
              </Text>
              <Text style={styles.finishSubtitle}>
                {correctCount >= 8
                  ? "You're on fire! 🔥"
                  : correctCount >= 5
                  ? "Good progress, keep it up!"
                  : "Practice makes perfect!"}
              </Text>

              <Pressable onPress={restart} style={styles.primaryButton}>
                <MaterialIcons name="refresh" size={20} color="#0B1116" />
                <Text style={styles.primaryText}>PLAY AGAIN</Text>
              </Pressable>
              <Pressable onPress={finishAndGoBack} style={styles.secondaryButton}>
                <Text style={styles.secondaryText}>Back to Practice</Text>
              </Pressable>
            </View>
          ) : current ? (
            // ===== ACTIVE QUESTION =====
            <>
              {/* Top bar */}
              <View style={styles.topBar}>
                <Pressable onPress={() => router.back()} style={styles.closeButton}>
                  <MaterialIcons name="close" size={22} color={glass.textMuted} />
                </Pressable>

                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                </View>

                <View style={styles.heartsRow}>
                  <MaterialIcons name="favorite" size={18} color={glass.accentRed} />
                  <Text style={styles.heartsText}>{hearts}</Text>
                </View>
              </View>

              {/* Combo */}
              {combo > 1 ? (
                <Text style={styles.comboText}>COMBO x{combo}</Text>
              ) : null}

              {/* Kicker */}
              <Text style={styles.kicker}>
                {current.chapterTitle} · {current.lessonTitle}
              </Text>

              {/* Question */}
              <Text style={styles.questionCount}>
                Question {index + 1} / {queue.length}
              </Text>
              <Text style={styles.question}>{current.question}</Text>

              {/* Choices */}
              <View style={styles.choices}>
                {current.choices.map((choice) => {
                  const isPicked = picked === choice;
                  const isRight = choice === current.answer;
                  const reveal = picked && isRight;
                  const isWrong = isPicked && !isRight;

                  return (
                    <Pressable
                      key={choice}
                      onPress={() => onPick(choice)}
                      disabled={!!picked}
                      style={({ pressed }) => [
                        styles.choice,
                        pressed && !picked && styles.choicePressed,
                        reveal && styles.choiceGood,
                        isWrong && styles.choiceBad,
                        picked && !reveal && !isWrong && styles.choiceDim,
                      ]}
                    >
                      <Text style={styles.choiceText}>{choice}</Text>
                      {reveal ? (
                        <MaterialIcons name="check-circle" size={22} color={glass.accentGreen} />
                      ) : null}
                      {isWrong ? (
                        <MaterialIcons name="cancel" size={22} color={glass.accentRed} />
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>

              {/* Feedback */}
              {picked ? (
                <Animated.View
                  style={[
                    styles.feedback,
                    isCorrect ? styles.feedbackGood : styles.feedbackBad,
                    { transform: [{ scale: feedbackScale }] },
                  ]}
                >
                  <MaterialIcons
                    name={isCorrect ? "check-circle" : "info"}
                    size={22}
                    color={isCorrect ? glass.accentGreen : glass.accentRed}
                  />
                  <View style={styles.feedbackCopy}>
                    <Text
                      style={[
                        styles.feedbackTitle,
                        { color: isCorrect ? glass.accentGreen : glass.accentRed },
                      ]}
                    >
                      {isCorrect ? "Correct! 🎉" : "Not quite"}
                    </Text>
                    <Text style={styles.feedbackDetail}>
                      {isCorrect ? "Keep it up!" : `Answer: ${current.answer}`}
                    </Text>
                  </View>
                </Animated.View>
              ) : null}
            </>
          ) : (
            // ===== NO QUESTIONS =====
            <View style={styles.finishWrap}>
              <MaterialIcons name="info-outline" size={48} color={glass.textMuted} />
              <Text style={styles.finishTitle}>No questions yet</Text>
              <Text style={styles.finishSubtitle}>
                Complete some lessons first to unlock exercises.
              </Text>
              <Pressable onPress={() => router.back()} style={styles.primaryButton}>
                <Text style={styles.primaryText}>BACK TO PRACTICE</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

// ============================================================
// Styles
// ============================================================
const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 40, flexGrow: 1 },

  bgLayer: { ...StyleSheet.absoluteFillObject },
  bgBlob: { position: "absolute", borderRadius: 999 },
  bgBlob1: {
    width: 280, height: 280, top: -80, left: -100,
    backgroundColor: "rgba(200, 155, 255, 0.3)",
  },
  bgBlob2: {
    width: 240, height: 240, bottom: 80, right: -80,
    backgroundColor: "rgba(110, 198, 255, 0.25)",
  },

  // Top bar
  topBar: {
    flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14,
  },
  closeButton: { padding: 4 },
  progressTrack: {
    flex: 1, height: 12, backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 6, overflow: "hidden",
    borderWidth: 1, borderColor: glass.cardBorder,
  },
  progressFill: {
    height: "100%", backgroundColor: glass.accentBlue, borderRadius: 6,
  },
  heartsRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  heartsText: { color: glass.textPrimary, fontSize: 14, fontWeight: "900" },

  comboText: {
    color: glass.accentGold, fontSize: 12, fontWeight: "900",
    letterSpacing: 1.2, marginBottom: 12,
  },

  kicker: {
    color: glass.accentGold, fontSize: 10, fontWeight: "900",
    letterSpacing: 1.4, marginBottom: 6,
    textTransform: "uppercase",
  },
  questionCount: {
    color: glass.textMuted, fontSize: 12, fontWeight: "800", marginBottom: 10,
  },
  question: {
    color: glass.textPrimary, fontSize: 22, fontWeight: "900",
    lineHeight: 30, marginBottom: 24,
  },

  // Choices
  choices: { gap: 12, marginBottom: 18 },
  choice: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    gap: 12,
    backgroundColor: glass.cardBg,
    borderWidth: 1.5, borderColor: glass.cardBorder,
    borderRadius: 18, padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, shadowRadius: 10,
    elevation: 3,
  },
  choicePressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  choiceGood: {
    backgroundColor: "rgba(91, 229, 140, 0.15)",
    borderColor: glass.accentGreen,
  },
  choiceBad: {
    backgroundColor: "rgba(255, 107, 107, 0.15)",
    borderColor: glass.accentRed,
  },
  choiceDim: { opacity: 0.4 },
  choiceText: {
    color: glass.textPrimary, fontSize: 15, fontWeight: "800", flex: 1,
  },

  // Feedback
  feedback: {
    flexDirection: "row", alignItems: "center", gap: 12,
    padding: 16, borderRadius: 16, borderWidth: 1.5, marginTop: 8,
  },
  feedbackGood: {
    backgroundColor: "rgba(91, 229, 140, 0.15)",
    borderColor: glass.accentGreen,
  },
  feedbackBad: {
    backgroundColor: "rgba(255, 107, 107, 0.15)",
    borderColor: glass.accentRed,
  },
  feedbackCopy: { flex: 1 },
  feedbackTitle: { fontSize: 14, fontWeight: "900" },
  feedbackDetail: {
    color: glass.textSecondary, fontSize: 12, fontWeight: "700", marginTop: 2,
  },

  // Finish
  finishWrap: {
    flex: 1, alignItems: "center", justifyContent: "center",
    paddingVertical: 40, gap: 10,
  },
  finishEmoji: { fontSize: 80, marginBottom: 12 },
  finishTitle: {
    color: glass.textPrimary, fontSize: 26, fontWeight: "900", textAlign: "center",
  },
  finishScore: {
    color: glass.accentGold, fontSize: 56, fontWeight: "900", marginTop: 12,
  },
  finishSubtitle: {
    color: glass.textSecondary, fontSize: 14, fontWeight: "700",
    textAlign: "center", marginTop: 10, marginBottom: 26, lineHeight: 20,
    paddingHorizontal: 20,
  },

  // Buttons
  primaryButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
    backgroundColor: glass.accentGreen,
    borderRadius: 16, paddingVertical: 16, paddingHorizontal: 32,
    shadowColor: glass.accentGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 14, elevation: 5,
  },
  primaryText: {
    color: "#0B1116", fontSize: 14, fontWeight: "900", letterSpacing: 1,
  },
  secondaryButton: { padding: 14, marginTop: 4 },
  secondaryText: {
    color: glass.textMuted, fontSize: 13, fontWeight: "800",
  },
});