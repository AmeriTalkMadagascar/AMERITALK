import { Stack, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";

// ============================================================
// MODE ENFANTS — Hub d'accueil
// Couleurs vives, gros boutons, emojis partout.
// Pas de score complexe, pas de cœurs : juste apprendre en s'amusant.
// ============================================================

type KidCard = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  colorDark: string;
  route: string;
};

const CARDS: KidCard[] = [
  {
    id: "letters",
    title: "Les lettres",
    subtitle: "Découvre A à Z",
    emoji: "🔤",
    color: "#FFB6C1",
    colorDark: "#E8939E",
    route: "/kids/letters",
  },
  {
    id: "find",
    title: "Trouve la lettre",
    subtitle: "Cherche la bonne",
    emoji: "🔍",
    color: "#FFD966",
    colorDark: "#E5C050",
    route: "/kids/find-letter",
  },
  {
    id: "listen",
    title: "Écoute et trouve",
    subtitle: "Écoute bien !",
    emoji: "👂",
    color: "#A8D8FF",
    colorDark: "#8AB8DD",
    route: "/kids/listen-letter",
  },
];

export default function KidsHomeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer
        edges={["top", "bottom", "left", "right"]}
        className="px-5"
        containerClassName="bg-[#FFF9F0]"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* ===== Bouton retour ===== */}
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={26} color="#8B6B4A" />
          </Pressable>

          {/* ===== Titre ===== */}
          <View style={styles.header}>
            <Text style={styles.bigEmoji}>🎈</Text>
            <Text style={styles.title}>ABC Kids</Text>
            <Text style={styles.subtitle}>
              Apprends l'alphabet anglais en jouant !
            </Text>
          </View>

          {/* ===== Cartes ===== */}
          <View style={styles.cards}>
            {CARDS.map((card) => (
              <Pressable
                key={card.id}
                onPress={() => router.push(card.route as never)}
                style={({ pressed }) => [
                  styles.card,
                  { backgroundColor: card.color, borderBottomColor: card.colorDark },
                  pressed && styles.cardPressed,
                ]}
              >
                <View style={styles.cardEmojiWrap}>
                  <Text style={styles.cardEmoji}>{card.emoji}</Text>
                </View>
                <View style={styles.cardCopy}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={32} color="#FFFFFF" />
              </Pressable>
            ))}
          </View>

          {/* ===== Pied ===== */}
          <View style={styles.footer}>
            <Text style={styles.footerEmoji}>⭐</Text>
            <Text style={styles.footerText}>
              Amuse-toi bien et apprends plein de choses !
            </Text>
          </View>
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
  header: { alignItems: "center", marginTop: 10, marginBottom: 30 },
  bigEmoji: { fontSize: 64, marginBottom: 6 },
  title: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FF6B9D",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: "#8B6B4A",
    marginTop: 8,
    textAlign: "center",
    fontWeight: "700",
  },
  cards: { gap: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 24,
    borderBottomWidth: 6,
  },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  cardEmojiWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardEmoji: { fontSize: 34 },
  cardCopy: { flex: 1 },
  cardTitle: { fontSize: 22, fontWeight: "900", color: "#FFFFFF" },
  cardSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    marginTop: 3,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 40,
    padding: 16,
    backgroundColor: "#FFF1D6",
    borderRadius: 20,
  },
  footerEmoji: { fontSize: 22 },
  footerText: {
    fontSize: 13,
    color: "#8B6B4A",
    fontWeight: "700",
    flex: 1,
  },
});