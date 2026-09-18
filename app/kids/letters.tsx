import { Stack, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { speakNatural } from "@/lib/speech";

// ============================================================
// ALPHABET — A à Z avec mots, emojis et prononciation
// ============================================================

type LetterData = {
  letter: string;
  word: string;
  emoji: string;
  color: string;
  colorDark: string;
};

const ALPHABET: LetterData[] = [
  { letter: "A", word: "Apple", emoji: "🍎", color: "#FF6B9D", colorDark: "#E05285" },
  { letter: "B", word: "Ball", emoji: "⚽", color: "#FFD966", colorDark: "#E5C050" },
  { letter: "C", word: "Cat", emoji: "🐱", color: "#A8D8FF", colorDark: "#8AB8DD" },
  { letter: "D", word: "Dog", emoji: "🐶", color: "#B5E8B5", colorDark: "#96C996" },
  { letter: "E", word: "Elephant", emoji: "🐘", color: "#C9B5FF", colorDark: "#A896DD" },
  { letter: "F", word: "Fish", emoji: "🐟", color: "#FFB6C1", colorDark: "#E8939E" },
  { letter: "G", word: "Giraffe", emoji: "🦒", color: "#FFE5A8", colorDark: "#E5CC8A" },
  { letter: "H", word: "Horse", emoji: "🐴", color: "#B5D8FF", colorDark: "#96B8DD" },
  { letter: "I", word: "Ice cream", emoji: "🍦", color: "#FFC9E5", colorDark: "#E5A8CC" },
  { letter: "J", word: "Juice", emoji: "🧃", color: "#FFD9A8", colorDark: "#E5C08A" },
  { letter: "K", word: "Kite", emoji: "🪁", color: "#B5FFD9", colorDark: "#96E5C0" },
  { letter: "L", word: "Lion", emoji: "🦁", color: "#FFE5B5", colorDark: "#E5CC96" },
  { letter: "M", word: "Moon", emoji: "🌙", color: "#C9D4FF", colorDark: "#A8B5DD" },
  { letter: "N", word: "Nest", emoji: "🪺", color: "#FFD9C9", colorDark: "#E5B8A8" },
  { letter: "O", word: "Orange", emoji: "🍊", color: "#FFC9A8", colorDark: "#E5A88A" },
  { letter: "P", word: "Pizza", emoji: "🍕", color: "#FFB5B5", colorDark: "#E59696" },
  { letter: "Q", word: "Queen", emoji: "👸", color: "#E5B5FF", colorDark: "#CC96E5" },
  { letter: "R", word: "Rainbow", emoji: "🌈", color: "#B5E8FF", colorDark: "#96C9E5" },
  { letter: "S", word: "Sun", emoji: "☀️", color: "#FFE59E", colorDark: "#E5CC80" },
  { letter: "T", word: "Tiger", emoji: "🐯", color: "#FFCC99", colorDark: "#E5B080" },
  { letter: "U", word: "Umbrella", emoji: "☂️", color: "#C9B5FF", colorDark: "#A896DD" },
  { letter: "V", word: "Violin", emoji: "🎻", color: "#FFD9D9", colorDark: "#E5B5B5" },
  { letter: "W", word: "Watermelon", emoji: "🍉", color: "#B5FFB5", colorDark: "#96E596" },
  { letter: "X", word: "Xylophone", emoji: "🎵", color: "#FFC9E5", colorDark: "#E5A8CC" },
  { letter: "Y", word: "Yo-yo", emoji: "🪀", color: "#FFE5C9", colorDark: "#E5CCB0" },
  { letter: "Z", word: "Zebra", emoji: "🦓", color: "#C9D4E5", colorDark: "#A8B5CC" },
];

export default function LettersScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<LetterData | null>(null);

  const playLetter = (data: LetterData) => {
    setSelected(data);
    // 🔊 Pas d'auto-play. Mais ici, le clic EST le déclencheur.
    // L'utilisateur clique sur la lettre → on prononce.
    void speakNatural(`${data.letter} for ${data.word}`);
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
          {/* ===== Retour ===== */}
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={26} color="#8B6B4A" />
          </Pressable>

          {/* ===== Titre ===== */}
          <Text style={styles.title}>🔤 Les lettres</Text>
          <Text style={styles.subtitle}>
            Touche une lettre pour écouter sa prononciation !
          </Text>

          {/* ===== Carte sélectionnée (grande) ===== */}
          {selected ? (
            <View
              style={[
                styles.selectedCard,
                { backgroundColor: selected.color, borderBottomColor: selected.colorDark },
              ]}
            >
              <Text style={styles.selectedEmoji}>{selected.emoji}</Text>
              <Text style={styles.selectedLetter}>{selected.letter}</Text>
              <Text style={styles.selectedWord}>
                {selected.letter} for {selected.word}
              </Text>
              <Pressable
                onPress={() => void speakNatural(`${selected.letter} for ${selected.word}`)}
                style={styles.selectedSpeaker}
              >
                <MaterialIcons name="volume-up" size={28} color="#FFFFFF" />
                <Text style={styles.selectedSpeakerText}>Écouter encore</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.hintCard}>
              <Text style={styles.hintEmoji}>👆</Text>
              <Text style={styles.hintText}>
                Touche une lettre ci-dessous pour commencer !
              </Text>
            </View>
          )}

          {/* ===== Grille de lettres ===== */}
          <View style={styles.grid}>
            {ALPHABET.map((data) => (
              <Pressable
                key={data.letter}
                onPress={() => playLetter(data)}
                style={({ pressed }) => [
                  styles.letterTile,
                  { backgroundColor: data.color, borderBottomColor: data.colorDark },
                  pressed && styles.letterTilePressed,
                  selected?.letter === data.letter && styles.letterTileActive,
                ]}
              >
                <Text style={styles.letterText}>{data.letter}</Text>
                <Text style={styles.letterEmoji}>{data.emoji}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.footer}>
            🎈 Continue à explorer toutes les lettres !
          </Text>
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
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FF6B9D",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#8B6B4A",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 20,
  },

  // Carte sélectionnée
  selectedCard: {
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 8,
  },
  selectedEmoji: { fontSize: 72, marginBottom: 8 },
  selectedLetter: {
    fontSize: 96,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 100,
  },
  selectedWord: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 4,
    marginBottom: 16,
    textAlign: "center",
  },
  selectedSpeaker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  selectedSpeakerText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  // Hint card (aucune sélection)
  hintCard: {
    backgroundColor: "#FFF1D6",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 3,
    borderColor: "#FFD966",
    borderStyle: "dashed",
  },
  hintEmoji: { fontSize: 48, marginBottom: 8 },
  hintText: {
    fontSize: 15,
    color: "#8B6B4A",
    fontWeight: "800",
    textAlign: "center",
  },

  // Grille
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  letterTile: {
    width: 84,
    height: 84,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
  },
  letterTilePressed: { opacity: 0.9, transform: [{ scale: 0.95 }] },
  letterTileActive: {
    transform: [{ scale: 1.1 }],
  },
  letterText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 38,
  },
  letterEmoji: { fontSize: 20, marginTop: 2 },

  footer: {
    fontSize: 13,
    color: "#8B6B4A",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 30,
    padding: 14,
    backgroundColor: "#FFF1D6",
    borderRadius: 20,
  },
});