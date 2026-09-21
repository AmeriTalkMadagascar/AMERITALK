import { Stack, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { speakNatural } from "@/lib/speech";

// ============================================================
// JEU : Écoute et trouve
// On prononce une lettre (auto-play, car c'est le but du jeu),
// l'enfant doit cliquer la bonne lettre parmi 4 choix.
// 10 questions par partie.
// ============================================================

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const LETTER_COLORS: Record<string, { bg: string; dark: string }> = {
  A: { bg: "#FF6B9D", dark: "#E05285" },
  B: { bg: "#FFD966", dark: "#E5C050" },
  C: { bg: "#A8D8FF", dark: "#8AB8DD" },
  D: { bg: "#B5E8B5", dark: "#96C996" },
  E: { bg: "#C9B5FF", dark: "#A896DD" },
  F: { bg: "#FFB6C1", dark: "#E8939E" },
  G: { bg: "#FFE5A8", dark: "#E5CC8A" },
  H: { bg: "#B5D8FF", dark: "#96B8DD" },
  I: { bg: "#FFC9E5", dark: "#E5A8CC" },
  J: { bg: "#FFD9A8", dark: "#E5C08A" },
  K: { bg: "#B5FFD9", dark: "#96E5C0" },
  L: { bg: "#FFE5B5", dark: "#E5CC96" },
  M: { bg: "#C9D4FF", dark: "#A8B5DD" },
  N: { bg: "#FFD9C9", dark: "#E5B8A8" },
  O: { bg: "#FFC9A8", dark: "#E5A88A" },
  P: { bg: "#FFB5B5", dark: "#E59696" },
  Q: { bg: "#E5B5FF", dark: "#CC96E5" },
  R: { bg: "#B5E8FF", dark: "#96C9E5" },
  S: { bg: "#FFE59E", dark: "#E5CC80" },
  T: { bg: "#FFCC99", dark: "#E5B080" },
  U: { bg: "#C9B5FF", dark: "#A896DD" },
  V: { bg: "#FFD9D9", dark: "#E5B5B5" },
  W: { bg: "#B5FFB5", dark: "#96E596" },
  X: { bg: "#FFC9E5", dark: "#E5A8CC" },
  Y: { bg: "#FFE5C9", dark: "#E5CCB0" },
  Z: { bg: "#C9D4E5", dark: "#A8B5CC" },
};

const TOTAL_QUESTIONS = 10;

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

type Question = {
  target: string;
  choices: string[];
};

function generateQuestions(): Question[] {
  const questions: Question[] = [];
  const targets = shuffle(ALPHABET).slice(0, TOTAL_QUESTIONS);
  for (const target of targets) {
    const others = shuffle(ALPHABET.filter((l) => l !== target)).slice(0, 3);
    questions.push({
      target,
      choices: shuffle([target, ...others]),
    });
  }
  return questions;
}

export default function ListenLetterScreen() {
  const router = useRouter();

  const [questions] = useState<Question[]>(() => generateQuestions());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [playing, setPlaying] = useState(false);

  const feedbackScale = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const current = questions[index];

  // Auto-play de la lettre cible quand on change de question
  // (C'est un jeu d'écoute : écouter EST le but du jeu)
  useEffect(() => {
    if (current && !finished && !picked) {
      setPlaying(true);
      const timer = setTimeout(() => {
        void speakNatural(current.target);
        setTimeout(() => setPlaying(false), 1200);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [current, finished, picked]);

  // Animation du bouton haut-parleur pendant la lecture
  useEffect(() => {
    if (playing) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
  }, [playing, pulseAnim]);

  const onPick = (letter: string) => {
    if (picked) return;
    setPicked(letter);
    const right = letter === current.target;
    setIsCorrect(right);
    if (right) {
      setScore((s) => s + 1);
      void speakNatural("Yes! " + letter);
    } else {
      void speakNatural("Try again");
    }

    feedbackScale.setValue(0);
    Animated.spring(feedbackScale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 10,
      stiffness: 140,
    }).start();

    setTimeout(() => {
      if (index + 1 >= questions.length) {
        setFinished(true);
      } else {
        setIndex((i) => i + 1);
        setPicked(null);
        setIsCorrect(null);
      }
    }, 1600);
  };

  const replayTarget = () => {
    if (!current) return;
    setPlaying(true);
    void speakNatural(current.target);
    setTimeout(() => setPlaying(false), 1200);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setPicked(null);
    setIsCorrect(null);
    setFinished(false);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer
        edges={["top", "bottom", "left", "right"]}
        className="px-5"
        containerClassName="bg-[#FFF9F0]"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Retour */}
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={26} color="#8B6B4A" />
          </Pressable>

          {finished ? (
            // ===== FIN =====
            <View style={styles.finishWrap}>
              <Text style={styles.finishEmoji}>
                {score >= 8 ? "🏆" : score >= 5 ? "🎉" : "💪"}
              </Text>
              <Text style={styles.finishTitle}>
                {score >= 8 ? "Super !" : score >= 5 ? "Bravo !" : "Bien essayé !"}
              </Text>
              <Text style={styles.finishScore}>
                {score} / {TOTAL_QUESTIONS}
              </Text>
              <Text style={styles.finishText}>
                {score >= 8
                  ? "Tu as une super oreille !"
                  : score >= 5
                  ? "Tu écoutes de mieux en mieux !"
                  : "Essaie encore, tu vas y arriver !"}
              </Text>
              <Pressable onPress={restart} style={styles.primary}>
                <MaterialIcons name="refresh" size={22} color="#FFFFFF" />
                <Text style={styles.primaryText}>Rejouer</Text>
              </Pressable>
              <Pressable onPress={() => router.back()} style={styles.secondary}>
                <Text style={styles.secondaryText}>Retour aux jeux</Text>
              </Pressable>
            </View>
          ) : (
            // ===== JEU =====
            <>
              {/* Progression */}
              <View style={styles.topBar}>
                <Text style={styles.progressText}>
                  {index + 1} / {TOTAL_QUESTIONS}
                </Text>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${((index + 1) / TOTAL_QUESTIONS) * 100}%` },
                    ]}
                  />
                </View>
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreText}>⭐ {score}</Text>
                </View>
              </View>

              {/* Consigne */}
              <Text style={styles.instruction}>
                Quelle lettre entends-tu ?
              </Text>
              <Text style={styles.instructionHint}>
                👇 Touche le gros bouton pour réécouter
              </Text>

              {/* Bouton haut-parleur central */}
              <Pressable onPress={replayTarget}>
                <Animated.View
                  style={[
                    styles.speakerBig,
                    playing && styles.speakerPlaying,
                    { transform: [{ scale: pulseAnim }] },
                  ]}
                >
                  <MaterialIcons name="volume-up" size={64} color="#FFFFFF" />
                </Animated.View>
              </Pressable>
              <Text style={styles.replayHint}>
                {playing ? "🔊 J'écoute..." : "Touche pour écouter"}
              </Text>

              {/* Choix des lettres */}
              <View style={styles.choices}>
                {current.choices.map((letter) => {
                  const colors = LETTER_COLORS[letter] ?? { bg: "#CCCCCC", dark: "#999999" };
                  const isPicked = picked === letter;
                  const showCorrect = picked && letter === current.target;
                  const showWrong = isPicked && letter !== current.target;
                  return (
                    <Pressable
                      key={letter}
                      onPress={() => onPick(letter)}
                      disabled={!!picked}
                      style={({ pressed }) => [
                        styles.choice,
                        { backgroundColor: colors.bg, borderBottomColor: colors.dark },
                        pressed && !picked && styles.choicePressed,
                        showCorrect && styles.choiceCorrect,
                        showWrong && styles.choiceWrong,
                        picked && !showCorrect && !showWrong && styles.choiceDim,
                      ]}
                    >
                      <Text style={styles.choiceText}>{letter}</Text>
                      {showCorrect ? (
                        <View style={styles.badge}>
                          <MaterialIcons name="check" size={22} color="#FFFFFF" />
                        </View>
                      ) : null}
                      {showWrong ? (
                        <View style={[styles.badge, styles.badgeWrong]}>
                          <MaterialIcons name="close" size={22} color="#FFFFFF" />
                        </View>
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>

              {/* Feedback animé */}
              {picked ? (
                <Animated.View
                  style={[
                    styles.feedback,
                    isCorrect ? styles.feedbackGood : styles.feedbackBad,
                    { transform: [{ scale: feedbackScale }] },
                  ]}
                >
                  <Text style={styles.feedbackEmoji}>{isCorrect ? "🎉" : "💪"}</Text>
                  <Text
                    style={[
                      styles.feedbackText,
                      { color: isCorrect ? "#2E7D32" : "#C62828" },
                    ]}
                  >
                    {isCorrect
                      ? `Bravo ! C'était bien ${current.target}.`
                      : `C'était ${current.target}. Écoute encore !`}
                  </Text>
                </Animated.View>
              ) : null}
            </>
          )}
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 14, paddingBottom: 40 },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  // Top bar
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 22,
  },
  progressText: { fontSize: 15, fontWeight: "900", color: "#8B6B4A" },
  progressTrack: {
    flex: 1,
    height: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#A8D8FF",
  },
  progressFill: { height: "100%", backgroundColor: "#A8D8FF", borderRadius: 7 },
  scoreBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: "#A8D8FF",
  },
  scoreText: { fontSize: 14, fontWeight: "900", color: "#8B6B4A" },

  // Consigne
  instruction: {
    fontSize: 26,
    fontWeight: "900",
    color: "#8B6B4A",
    textAlign: "center",
    marginTop: 8,
  },
  instructionHint: {
    fontSize: 13,
    color: "#8B6B4A",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
    opacity: 0.8,
  },

  // Bouton haut-parleur
  speakerBig: {
    alignSelf: "center",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#A8D8FF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 10,
    borderBottomColor: "#8AB8DD",
  },
  speakerPlaying: { backgroundColor: "#6BB8F0", borderBottomColor: "#4A96C8" },
  replayHint: {
    fontSize: 14,
    color: "#8B6B4A",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 14,
    marginBottom: 30,
  },

  // Choix
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  choice: {
    width: 130,
    height: 130,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 8,
    position: "relative",
  },
  choicePressed: { opacity: 0.9, transform: [{ scale: 0.96 }] },
  choiceCorrect: { borderWidth: 5, borderColor: "#2E7D32" },
  choiceWrong: { opacity: 0.7 },
  choiceDim: { opacity: 0.4 },
  choiceText: {
    fontSize: 68,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 72,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWrong: { backgroundColor: "#C62828" },

  // Feedback
  feedback: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 20,
    marginTop: 10,
  },
  feedbackGood: { backgroundColor: "#E8F5E9" },
  feedbackBad: { backgroundColor: "#FFEBEE" },
  feedbackEmoji: { fontSize: 32 },
  feedbackText: { fontSize: 15, fontWeight: "900", flex: 1 },

  // Fin
  finishWrap: { alignItems: "center", paddingTop: 30 },
  finishEmoji: { fontSize: 100, marginBottom: 10 },
  finishTitle: { fontSize: 34, fontWeight: "900", color: "#A8D8FF" },
  finishScore: {
    fontSize: 56,
    fontWeight: "900",
    color: "#FFD966",
    marginTop: 16,
  },
  finishText: {
    fontSize: 15,
    color: "#8B6B4A",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 30,
    lineHeight: 22,
  },

  // Boutons
  primary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#A8D8FF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderBottomWidth: 5,
    borderBottomColor: "#8AB8DD",
    marginBottom: 14,
  },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  secondary: { padding: 14 },
  secondaryText: { color: "#8B6B4A", fontSize: 15, fontWeight: "800" },
});