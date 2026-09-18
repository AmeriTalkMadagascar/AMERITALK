import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { useAppState } from "@/lib/app-state";
import { getPracticeStats } from "@/lib/practice-v2";

// ============================================================
// PRACTICE HUB — 2 modes : Exercise & Pronunciation
// Glassmorphism design, 100% English
// ============================================================

const glass = {
  cardBg: "rgba(255, 255, 255, 0.08)",
  cardBorder: "rgba(255, 255, 255, 0.18)",
  bgTop: "#2A1B4A",
  accentGreen: "#5BE58C",
  accentGold: "#FFD75E",
  accentBlue: "#6EC6FF",
  accentPink: "#FF8FB8",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.75)",
  textMuted: "rgba(255, 255, 255, 0.55)",
} as const;

export default function PracticeScreen() {
  const router = useRouter();
  const { xp, streak, hearts, maxHearts } = useAppState();
  const stats = getPracticeStats();

  return (
    <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "left", "right"]}>
      {/* Background gradient */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={[styles.bgLayer, { backgroundColor: glass.bgTop }]} />
        <View style={[styles.bgBlob, styles.bgBlob1]} />
        <View style={[styles.bgBlob, styles.bgBlob2]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <Text style={styles.headerKicker}>PRACTICE ZONE</Text>
          <Text style={styles.headerTitle}>Train & Speak</Text>
          <Text style={styles.headerSubtitle}>
            Pick a mode and improve your English skills.
          </Text>
        </View>

        {/* ===== STATS ROW ===== */}
        <View style={styles.statsRow}>
          <StatChip icon="local-fire-department" color={glass.accentGold} value={streak} />
          <StatChip icon="diamond" color={glass.accentBlue} value={xp} />
          <StatChip
            icon="favorite"
            color={hearts === 0 ? glass.textMuted : glass.accentPink}
            value={`${hearts}/${maxHearts}`}
          />
        </View>

        {/* ===== EXERCISE CARD ===== */}
        <Pressable
          onPress={() => router.push("/practice-exercise" as never)}
          style={({ pressed }) => [styles.modeCard, pressed && styles.pressed]}
        >
          <View style={[styles.modeIconBubble, { backgroundColor: "rgba(110, 198, 255, 0.2)" }]}>
            <MaterialIcons name="quiz" size={32} color={glass.accentBlue} />
          </View>
          <View style={styles.modeCopy}>
            <Text style={styles.modeKicker}>MODE 1</Text>
            <Text style={styles.modeTitle}>Exercise</Text>
            <Text style={styles.modeDescription}>
              Answer 10 random quiz questions from your lessons.
            </Text>
            <View style={styles.modeBadges}>
              <Badge icon="help-outline" text="QCM" />
              <Badge icon="menu-book" text={`${stats.totalPairs} questions`} />
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={28} color={glass.textMuted} />
        </Pressable>

        {/* ===== PRONUNCIATION CARD ===== */}
        <Pressable
          onPress={() => router.push("/practice-pronounce" as never)}
          style={({ pressed }) => [styles.modeCard, pressed && styles.pressed]}
        >
          <View style={[styles.modeIconBubble, { backgroundColor: "rgba(91, 229, 140, 0.2)" }]}>
            <MaterialIcons name="mic" size={32} color={glass.accentGreen} />
          </View>
          <View style={styles.modeCopy}>
            <Text style={styles.modeKicker}>MODE 2</Text>
            <Text style={styles.modeTitle}>Pronunciation</Text>
            <Text style={styles.modeDescription}>
              Speak the word out loud and get instant feedback.
            </Text>
            <View style={styles.modeBadges}>
              <Badge icon="record-voice-over" text="Voice" />
              <Badge icon="spellcheck" text={`${stats.totalWords} words`} />
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={28} color={glass.textMuted} />
        </Pressable>

        {/* ===== TIP ===== */}
        <View style={[styles.glassCard, styles.tipCard]}>
          <MaterialIcons name="lightbulb-outline" size={20} color={glass.accentGold} />
          <Text style={styles.tipText}>
            10 minutes a day is better than 1 hour a week. Practice makes perfect!
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

// ============================================================
// Composants
// ============================================================
function StatChip({
  icon,
  color,
  value,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  value: number | string;
}) {
  return (
    <View style={styles.statChip}>
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function Badge({ icon, text }: { icon: keyof typeof MaterialIcons.glyphMap; text: string }) {
  return (
    <View style={styles.badge}>
      <MaterialIcons name={icon} size={11} color={glass.textSecondary} />
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

// ============================================================
// Styles
// ============================================================
const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 60 },

  bgLayer: { ...StyleSheet.absoluteFillObject },
  bgBlob: { position: "absolute", borderRadius: 999 },
  bgBlob1: {
    width: 300,
    height: 300,
    top: -100,
    left: -100,
    backgroundColor: "rgba(200, 155, 255, 0.3)",
  },
  bgBlob2: {
    width: 260,
    height: 260,
    bottom: 100,
    right: -80,
    backgroundColor: "rgba(110, 198, 255, 0.25)",
  },

  // Header
  header: { alignItems: "center", marginBottom: 22, marginTop: 8 },
  headerKicker: {
    color: glass.accentGreen,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.6,
  },
  headerTitle: {
    color: glass.textPrimary,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 8,
  },
  headerSubtitle: {
    color: glass.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 24,
  },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: glass.cardBg,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: glass.cardBorder,
  },
  statValue: { color: glass.textPrimary, fontSize: 13, fontWeight: "900" },

  // Mode cards
  modeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: glass.cardBg,
    borderWidth: 1,
    borderColor: glass.cardBorder,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
  },
  modeIconBubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  modeCopy: { flex: 1 },
  modeKicker: {
    color: glass.accentGold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  modeTitle: {
    color: glass.textPrimary,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 4,
  },
  modeDescription: {
    color: glass.textSecondary,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
    lineHeight: 18,
  },
  modeBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: glass.textSecondary,
    fontSize: 10,
    fontWeight: "800",
  },

  // Tip
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
    paddingVertical: 16,
  },
  tipText: {
    color: glass.textSecondary,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    flex: 1,
  },

  // Glass card
  glassCard: {
    backgroundColor: glass.cardBg,
    borderWidth: 1,
    borderColor: glass.cardBorder,
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
  },

  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});