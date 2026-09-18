import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useAppState } from "@/lib/app-state";
import { lessons } from "@/lib/content";
import { calculateScore, lessonXp } from "@/lib/practice";
import { speakNatural } from "@/lib/speech";

type Question = { category: "Vocabulary" | "Grammar" | "Translation" | "Listening"; prompt: string; answer: string; choices: string[]; explanation: string };

export default function LessonTestScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((item) => item.id === id) ?? lessons[0];
  const { addMistake, recordTest, markLessonComplete, streak } = useAppState();
  const questions = useMemo<Question[]>(() => [
    { category: "Vocabulary", prompt: `What does “${lesson.sentences[0].english}” mean?`, answer: lesson.sentences[0].french, choices: [lesson.sentences[0].french, lesson.sentences[1].french, "Merci", "À bientôt"], explanation: `“${lesson.sentences[0].english}” translates to “${lesson.sentences[0].french}”.` },
    { category: "Vocabulary", prompt: `Choose the English word for “${lesson.sentences[1].french}”.`, answer: lesson.sentences[1].english, choices: [lesson.sentences[0].english, lesson.sentences[1].english, lesson.sentences[2].english, "Goodbye"], explanation: `The correct word is “${lesson.sentences[1].english}”.` },
    { category: "Grammar", prompt: "Which phrase is the most natural in this lesson?", answer: lesson.sentences[0].english, choices: [lesson.sentences[0].english, "I name am Sam.", "Sam my is name.", "Name Sam is my."], explanation: `Use the complete phrase: “${lesson.sentences[0].english}”.` },
    { category: "Translation", prompt: `Which translation matches “${lesson.sentences[0].english}”?`, answer: lesson.sentences[0].french, choices: [lesson.sentences[0].french, "Je suis en retard.", "Où est la gare ?", "Merci pour votre aide."], explanation: `The phrase means: “${lesson.sentences[0].french}”.` },
    { category: "Listening", prompt: "Listen to the dialogue, then identify the correct answer.", answer: lesson.dialogue[0].text, choices: [lesson.dialogue[0].text, lesson.dialogue[1].text, lesson.dialogue[lesson.dialogue.length - 1].text, "No dialogue"], explanation: `The first speaker says: “${lesson.dialogue[0].text}”.` },
  ], [lesson]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  const choose = (value: string) => {
    if (selected || finished) return;
    const isCorrect = value === question.answer;
    setSelected(value);
    setAnswers((current) => [...current, isCorrect]);
    if (!isCorrect) addMistake(lesson.sentences[Math.min(index, lesson.sentences.length - 1)].id);
  };
  const next = () => {
    if (index === questions.length - 1) { const finalAnswers = answers; const score = calculateScore(finalAnswers.filter(Boolean).length, questions.length); recordTest(score); if (score >= 80) markLessonComplete(lesson.id, lesson.sentences.map((sentence) => sentence.id), lessonXp(lesson.level, streak, score)); setFinished(true); return; }
    setIndex((current) => current + 1); setSelected(null);
  };
  const restart = () => { setIndex(0); setSelected(null); setAnswers([]); setFinished(false); };
  const score = calculateScore(answers.filter(Boolean).length, questions.length);

  return <><Stack.Screen options={{ headerShown: false }} /><ScreenContainer edges={["top", "bottom", "left", "right"]} className="px-5" containerClassName="bg-[#F7F8FA]"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
    {!finished ? <>
      <View style={styles.header}><Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>←</Text></Pressable><Text style={styles.kicker}>LESSON TEST</Text><Text style={styles.counter}>{index + 1}/{questions.length}</Text></View>
      <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${((index + 1) / questions.length) * 100}%` }]} /></View>
      <View style={styles.categoryRow}><Text style={styles.category}>{question.category.toUpperCase()}</Text><Text style={styles.lessonName}>{lesson.title}</Text></View>
      <Text style={styles.title}>{question.prompt}</Text>
      {question.category === "Listening" && <Pressable onPress={() => { void speakNatural(lesson.dialogue.map((line) => line.text).join(" ")); }} style={styles.listenButton}><Text style={styles.listenIcon}>▶</Text><Text style={styles.listenText}>Play audio · replay anytime</Text></Pressable>}
      <View style={styles.answers}>{question.choices.map((choice) => { const isSelected = selected === choice; const isCorrect = choice === question.answer; return <Pressable key={choice} onPress={() => choose(choice)} style={[styles.answer, isSelected && (isCorrect ? styles.correct : styles.wrong)]}><Text style={styles.answerText}>{choice}</Text><Text style={styles.mark}>{isSelected ? (isCorrect ? "✓" : "×") : ""}</Text></Pressable>; })}</View>
      {selected && <View style={styles.explanation}><Text style={styles.explanationTitle}>{selected === question.answer ? "Correct" : "Review this"}</Text><Text style={styles.explanationText}>{question.explanation}</Text></View>}
      <Pressable disabled={!selected} onPress={next} style={[styles.nextButton, !selected && styles.disabled]}><Text style={styles.nextText}>{index === questions.length - 1 ? "See my result" : "Next question  →"}</Text></Pressable>
    </> : <>
      <Text style={styles.kicker}>TEST RESULT</Text><Text style={styles.title}>You made progress.</Text><View style={styles.resultCard}><Text style={styles.resultScore}>{score}%</Text><Text style={styles.resultCaption}>{answers.filter(Boolean).length}/{questions.length} correct answers</Text><View style={styles.breakdown}>{["Vocabulary", "Grammar", "Listening"].map((category) => { const categoryIndexes = questions.map((item, itemIndex) => item.category === category ? itemIndex : -1).filter((itemIndex) => itemIndex >= 0); const categoryCorrect = categoryIndexes.filter((itemIndex) => answers[itemIndex]).length; return <View key={category} style={styles.breakdownRow}><Text style={styles.breakdownLabel}>{category}</Text><View style={styles.smallTrack}><View style={[styles.smallFill, { width: `${calculateScore(categoryCorrect, categoryIndexes.length)}%` }]} /></View><Text style={styles.breakdownValue}>{calculateScore(categoryCorrect, categoryIndexes.length)}%</Text></View>; })}</View></View><View style={styles.reviewCard}><Text style={styles.reviewTitle}>{score >= 80 ? "Great work — keep going." : "Your weak points are saved."}</Text><Text style={styles.reviewText}>Ameritalk will bring missed words back into Smart Review.</Text></View><View style={styles.buttonRow}><Pressable onPress={restart} style={styles.secondaryButton}><Text style={styles.secondaryText}>Try again</Text></Pressable><Pressable onPress={() => router.replace("/(tabs)/practice" as never)} style={styles.primaryButton}><Text style={styles.primaryText}>Review mistakes</Text></Pressable></View><Pressable onPress={() => router.replace("/(tabs)/learn" as never)} style={styles.continueButton}><Text style={styles.continueText}>Continue learning  →</Text></Pressable>
    </>}
  </ScrollView></ScreenContainer></>;
}

const styles = StyleSheet.create({ content: { paddingTop: 15, paddingBottom: 34 }, header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }, back: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }, backText: { color: "#101821", fontSize: 23 }, kicker: { color: "#A1483C", fontSize: 10, fontWeight: "900", letterSpacing: 1.5 }, counter: { color: "#7C8791", fontSize: 12 }, progressTrack: { height: 8, borderRadius: 4, backgroundColor: "#E3E7EA", overflow: "hidden", marginBottom: 28 }, progressFill: { height: "100%", borderRadius: 4, backgroundColor: "#A1483C" }, categoryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, category: { color: "#A1483C", fontSize: 9, fontWeight: "900", letterSpacing: 1.3 }, lessonName: { color: "#7C8791", fontSize: 11 }, title: { color: "#101821", fontSize: 29, lineHeight: 35, fontWeight: "900", letterSpacing: -0.7, marginTop: 8, marginBottom: 22 }, listenButton: { backgroundColor: "#101821", borderRadius: 15, height: 48, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 17 }, listenIcon: { color: "#F0A04B", fontSize: 12 }, listenText: { color: "#FFFDF7", fontSize: 12, fontWeight: "800" }, answers: { gap: 9 }, answer: { backgroundColor: "#FFFFFF", borderRadius: 15, padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, answerText: { color: "#101821", fontSize: 13, lineHeight: 18, flex: 1 }, mark: { color: "#101821", fontWeight: "900", fontSize: 17 }, correct: { backgroundColor: "#DDF3E3" }, wrong: { backgroundColor: "#F9DCD7" }, explanation: { backgroundColor: "#F1E4FF", borderRadius: 16, padding: 15, marginTop: 17 }, explanationTitle: { color: "#A1483C", fontSize: 12, fontWeight: "900" }, explanationText: { color: "#57616B", fontSize: 11, lineHeight: 17, marginTop: 5 }, nextButton: { backgroundColor: "#A1483C", height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center", marginTop: 22 }, nextText: { color: "#FFFFFF", fontSize: 13, fontWeight: "900" }, disabled: { opacity: 0.35 }, resultCard: { backgroundColor: "#101821", borderRadius: 23, padding: 21, alignItems: "center", marginTop: 15 }, resultScore: { color: "#F0A04B", fontSize: 57, fontWeight: "900" }, resultCaption: { color: "#B8C0C9", fontSize: 12, marginTop: -3, marginBottom: 22 }, breakdown: { width: "100%", gap: 12 }, breakdownRow: { flexDirection: "row", alignItems: "center", gap: 9 }, breakdownLabel: { color: "#FFFDF7", fontSize: 10, width: 67 }, smallTrack: { flex: 1, height: 7, borderRadius: 4, backgroundColor: "#2A3540", overflow: "hidden" }, smallFill: { height: "100%", backgroundColor: "#F0A04B" }, breakdownValue: { color: "#F0A04B", fontSize: 10, fontWeight: "900", width: 34, textAlign: "right" }, reviewCard: { backgroundColor: "#E4F6E8", borderRadius: 18, padding: 17, marginTop: 14 }, reviewTitle: { color: "#101821", fontSize: 15, fontWeight: "900" }, reviewText: { color: "#57616B", fontSize: 11, lineHeight: 16, marginTop: 4 }, buttonRow: { flexDirection: "row", gap: 9, marginTop: 18 }, secondaryButton: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, height: 47, alignItems: "center", justifyContent: "center" }, secondaryText: { color: "#A1483C", fontSize: 11, fontWeight: "900" }, primaryButton: { flex: 1, backgroundColor: "#A1483C", borderRadius: 14, height: 47, alignItems: "center", justifyContent: "center" }, primaryText: { color: "#FFFFFF", fontSize: 11, fontWeight: "900" }, continueButton: { alignItems: "center", padding: 16 }, continueText: { color: "#A1483C", fontSize: 12, fontWeight: "900" },
});
