import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { duo } from "@/constants/design";
import { useAppState } from "@/lib/app-state";
import { chapters } from "@/lib/content-v2";
import { openWhatsAppForLesson, PREMIUM_LESSONS } from "@/lib/premium";

// ============================================================
// LEARN — HUB DE CHAPITRES
// Affiche la liste des chapitres (Level A, Niv 2, Niv 3...).
// Chaque chapitre ouvre son propre parcours vertical.
// ============================================================

export default function LearnScreen() {
  const router = useRouter();
  const {
    xp,
    streak,
    hearts,
    maxHearts,
    combo,
    completedLessons,
    learnedWords,
    activatePremiumCode,
    activatedPremiumLessons,
  } = useAppState();
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [activationCode, setActivationCode] = React.useState("");
  const [activationMessage, setActivationMessage] = React.useState("");

  const activateCode = () => {
    const lessonId = activatePremiumCode(customerPhone, activationCode);
    setActivationMessage(lessonId ? "Leçon activée avec succès. Tu peux maintenant l'ouvrir." : "Code ou numéro WhatsApp incorrect.");
  };

  return (
    <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "left", "right"]}>
      {/* ===== Barre de stats ===== */}
      <View style={styles.statsBar}>
        <StatPill icon="local-fire-department" color={duo.orange} value={streak} />
        <StatPill icon="diamond" color={duo.blue} value={xp} />
        <StatPill
          icon="favorite"
          color={hearts === 0 ? duo.muted : duo.red}
          value={hearts === maxHearts ? `${hearts}` : `${hearts}/${maxHearts}`}
        />
        {combo > 0 ? (
          <View style={styles.comboPill}>
            <MaterialIcons name="bolt" size={14} color={duo.gold} />
            <Text style={styles.comboText}>x{combo}</Text>
          </View>
        ) : null}
        <Pressable onPress={() => router.push("/admin" as never)} style={styles.adminButton}>
          <MaterialIcons name="admin-panel-settings" size={17} color={duo.gold} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* ===== Mascotte + badge de série ===== */}
        <View style={styles.mascotRow}>
          <View style={styles.mascotCircle}>
            <MaterialIcons name="emoji-emotions" size={38} color={duo.green} />
          </View>
          <View style={styles.streakBadge}>
            <MaterialIcons name="local-fire-department" size={16} color="#FFFFFF" />
            <Text style={styles.streakBadgeText}>{streak}j</Text>
          </View>
        </View>

        {/* ===== Bannière ===== */}
        <View style={styles.banner}>
          <Text style={styles.bannerKicker}>APPRENDS L'ANGLAIS</Text>
          <Text style={styles.bannerTitle}>
            Choisis ton chapitre et commence ton parcours.
          </Text>
          <View style={styles.bannerStats}>
            <View style={styles.bannerStat}>
              <MaterialIcons name="menu-book" size={14} color="#0B1116" />
              <Text style={styles.bannerStatText}>{chapters.length} chapitres</Text>
            </View>
            <View style={styles.bannerStat}>
              <MaterialIcons name="check-circle" size={14} color="#0B1116" />
              <Text style={styles.bannerStatText}>
                {completedLessons.length} leçons terminées
              </Text>
            </View>
          </View>
        </View>

        {/* ===== Titre section ===== */}
        <Text style={styles.sectionTitle}>📚 Tes chapitres</Text>

        {/* ===== Liste des chapitres ===== */}
        <View style={styles.chapterList}>
          {chapters.map((chapter, index) => {
            const unlocked = index === 0 || isChapterUnlocked(chapters, index, completedLessons);
            const totalLessons = chapter.lessons.length;
            const doneCount = chapter.lessons.filter((l) =>
              completedLessons.includes(l.id)
            ).length;
            const progressPercent =
              totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0;

            return (
              <Pressable
                key={chapter.id}
                disabled={!unlocked}
                onPress={() => router.push(`/chapter/${chapter.id}` as never)}
                style={({ pressed }) => [
                  styles.chapterCard,
                  !unlocked && styles.chapterCardLocked,
                  pressed && unlocked && styles.pressed,
                ]}
              >
                {/* En-tête de la carte */}
                <View style={styles.chapterTop}>
                  <View style={styles.chapterEmojiWrap}>
                    <Text style={styles.chapterEmoji}>{chapter.emoji}</Text>
                  </View>
                  <View style={styles.chapterCopy}>
                    <Text style={styles.chapterTitle}>{chapter.title}</Text>
                    <Text style={styles.chapterSubtitle}>{chapter.subtitle}</Text>
                  </View>
                  {!unlocked ? (
                    <View style={styles.lockIcon}>
                      <MaterialIcons name="lock" size={20} color={duo.muted} />
                    </View>
                  ) : (
                    <MaterialIcons name="chevron-right" size={26} color={duo.muted} />
                  )}
                </View>

                {/* Badges */}
                <View style={styles.chapterBadges}>
                  <View style={styles.badge}>
                    <MaterialIcons name="signal-cellular-alt" size={12} color={duo.blue} />
                    <Text style={styles.badgeText}>{chapter.level}</Text>
                  </View>
                  <View style={styles.badge}>
                    <MaterialIcons name="menu-book" size={12} color={duo.purple} />
                    <Text style={styles.badgeText}>
                      {totalLessons} leçon{totalLessons > 1 ? "s" : ""}
                    </Text>
                  </View>
                  {doneCount > 0 ? (
                    <View style={[styles.badge, styles.badgeSuccess]}>
                      <MaterialIcons name="check" size={12} color={duo.green} />
                      <Text style={[styles.badgeText, { color: duo.green }]}>
                        {doneCount}/{totalLessons}
                      </Text>
                    </View>
                  ) : null}
                </View>

                {/* Barre de progression */}
                {unlocked && totalLessons > 0 ? (
                  <View style={styles.progressBlock}>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${Math.max(2, progressPercent)}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>{progressPercent}%</Text>
                  </View>
                ) : null}

                {/* Message verrouillé */}
                {!unlocked ? (
                  <Text style={styles.lockedText}>
                    Termine le chapitre précédent pour débloquer.
                  </Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>

        <View style={styles.premiumHeader}>
          <View style={styles.premiumHeaderIcon}>
            <MaterialIcons name="workspace-premium" size={20} color={duo.gold} />
          </View>
          <View style={styles.premiumHeaderCopy}>
            <Text style={styles.premiumTitle}>Leçons premium</Text>
            <Text style={styles.premiumSubtitle}>Une leçon exclusive à débloquer pour chacun des 3 chapitres.</Text>
          </View>
        </View>

        <View style={styles.activationClientCard}>
          <View style={styles.activationClientHeader}>
            <MaterialIcons name="vpn-key" size={20} color={duo.green} />
            <View style={styles.premiumHeaderCopy}>
              <Text style={styles.premiumTitle}>Tu as déjà payé ?</Text>
              <Text style={styles.premiumSubtitle}>Entre ton numéro WhatsApp et le code reçu après validation.</Text>
            </View>
          </View>
          <TextInput
            value={customerPhone}
            onChangeText={setCustomerPhone}
            placeholder="Numéro WhatsApp"
            placeholderTextColor="#7F8B92"
            keyboardType="phone-pad"
            style={styles.activationInput}
          />
          <TextInput
            value={activationCode}
            onChangeText={setActivationCode}
            placeholder="Code : ATK-C2-XXXXXX"
            placeholderTextColor="#7F8B92"
            autoCapitalize="characters"
            style={styles.activationInput}
          />
          <Pressable onPress={activateCode} style={styles.activationButton}>
            <MaterialIcons name="lock-open" size={17} color="#FFFFFF" />
            <Text style={styles.unlockButtonText}>Activer ma leçon</Text>
          </Pressable>
          {activationMessage ? <Text style={styles.activationMessage}>{activationMessage}</Text> : null}
        </View>

        <View style={styles.premiumList}>
          {PREMIUM_LESSONS.map((lesson) => (
            <View key={lesson.id} style={styles.premiumCard}>
              <View style={[styles.premiumLessonIcon, { backgroundColor: lesson.color }]}>
                <MaterialIcons name={activatedPremiumLessons.includes(lesson.id) ? "lock-open" : "lock"} size={24} color="#0B1116" />
              </View>
              <View style={styles.premiumLessonCopy}>
                <Text style={styles.premiumChapter}>{lesson.chapterTitle.toUpperCase()}</Text>
                <Text style={styles.premiumLessonTitle}>{lesson.title}</Text>
                <Text style={styles.premiumLessonSubtitle}>{lesson.subtitle}</Text>
                <View style={styles.premiumMetaRow}>
                  <Text style={styles.premiumMeta}>{lesson.duration}</Text>
                  <Text style={styles.premiumPrice}>{lesson.priceLabel}</Text>
                </View>
              </View>
              <Pressable
                onPress={() => activatedPremiumLessons.includes(lesson.id)
                  ? router.push(`/lesson-v2/${lesson.id}` as never)
                  : void openWhatsAppForLesson(lesson)}
                style={({ pressed }) => [styles.unlockButton, pressed && styles.pressed]}
              >
                <MaterialIcons name={activatedPremiumLessons.includes(lesson.id) ? "play-arrow" : "chat"} size={15} color="#FFFFFF" />
                <Text style={styles.unlockButtonText}>{activatedPremiumLessons.includes(lesson.id) ? "Ouvrir" : "Débloquer"}</Text>
              </Pressable>
            </View>
          ))}
        </View>

        {/* ===== Footer ===== */}
        <View style={styles.tip}>
          <MaterialIcons name="lightbulb-outline" size={18} color={duo.gold} />
          <Text style={styles.tipText}>
            Chaque chapitre contient plusieurs leçons avec des explications en malagasy et des
            exemples en anglais.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

// ============================================================
// Helpers
// ============================================================

// Un chapitre est débloqué si le chapitre précédent est terminé (toutes les leçons)
function isChapterUnlocked(
  allChapters: typeof chapters,
  index: number,
  completedLessons: string[]
): boolean {
  if (index === 0) return true;
  const prev = allChapters[index - 1];
  if (!prev) return false;
  return prev.lessons.every((l) => completedLessons.includes(l.id));
}

// ============================================================
// Composants
// ============================================================

function StatPill({
  icon,
  color,
  value,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  value: number | string;
}) {
  return (
    <View style={styles.statPill}>
      <MaterialIcons name={icon} size={18} color={color} />
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

// ============================================================
// Styles
// ============================================================

const styles = StyleSheet.create({
  // Barre de stats
  statsBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 4,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: duo.surface,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  statValue: { color: "#FFFFFF", fontWeight: "900", fontSize: 13 },
  adminButton: {
    marginLeft: "auto",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: duo.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: duo.gold,
  },
  comboPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: duo.surface,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: duo.gold,
  },
  comboText: { color: duo.gold, fontWeight: "900", fontSize: 12 },

  // Contenu
  content: {
    paddingHorizontal: 18,
    paddingBottom: 60,
  },

  // Mascotte
  mascotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 12,
    gap: 8,
  },
  mascotCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: duo.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: duo.green,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: duo.orange,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  streakBadgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },

  // Bannière
  banner: {
    backgroundColor: duo.green,
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },
  bannerKicker: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  bannerTitle: {
    color: "#0B1116",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 6,
    lineHeight: 22,
  },
  bannerStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
  },
  bannerStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.12)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  bannerStatText: { color: "#0B1116", fontSize: 11, fontWeight: "900" },

  // Section
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14,
  },

  // Chapitres
  chapterList: { gap: 14, marginBottom: 22 },
  chapterCard: {
    backgroundColor: duo.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 2,
    borderColor: duo.locked,
  },
  chapterCardLocked: {
    opacity: 0.55,
    backgroundColor: "#1A242C",
  },
  chapterTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  chapterEmojiWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: duo.bg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: duo.gold,
  },
  chapterEmoji: { fontSize: 28 },
  chapterCopy: { flex: 1 },
  chapterTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  chapterSubtitle: { color: duo.muted, fontSize: 12, fontWeight: "700", marginTop: 3 },
  lockIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: duo.locked,
    alignItems: "center",
    justifyContent: "center",
  },

  // Badges
  chapterBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: duo.bg,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeSuccess: {
    backgroundColor: duo.greenSoft,
  },
  badgeText: { color: duo.muted, fontSize: 11, fontWeight: "900" },

  // Progression
  progressBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressTrack: {
    flex: 1,
    height: 10,
    backgroundColor: duo.locked,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: duo.green,
    borderRadius: 5,
  },
  progressText: {
    color: duo.muted,
    fontSize: 12,
    fontWeight: "900",
    minWidth: 38,
    textAlign: "right",
  },

  // Message verrouillé
  lockedText: {
    color: duo.muted,
    fontSize: 11,
    fontWeight: "700",
    fontStyle: "italic",
    textAlign: "center",
  },

  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
    marginBottom: 12,
  },
  premiumHeaderIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: duo.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: duo.gold,
  },
  premiumHeaderCopy: { flex: 1 },
  premiumTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  premiumSubtitle: { color: duo.muted, fontSize: 11, lineHeight: 15, marginTop: 2 },
  activationClientCard: { backgroundColor: "#19382B", borderRadius: 16, padding: 14, marginBottom: 14, borderWidth: 1, borderColor: duo.green },
  activationClientHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  activationInput: { backgroundColor: "#13251D", borderRadius: 11, borderWidth: 1, borderColor: "#3C6B50", color: "#FFFFFF", paddingHorizontal: 12, paddingVertical: 11, fontSize: 12, marginBottom: 8 },
  activationButton: { backgroundColor: duo.green, borderRadius: 11, minHeight: 42, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7 },
  activationMessage: { color: "#D9F6E5", fontSize: 11, fontWeight: "800", textAlign: "center", marginTop: 9 },
  premiumList: { gap: 10, marginBottom: 22 },
  premiumCard: {
    backgroundColor: "#18232B",
    borderRadius: 18,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#3B4850",
  },
  premiumLessonIcon: {
    width: 48,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  premiumLessonCopy: { flex: 1, minWidth: 0 },
  premiumChapter: { color: duo.gold, fontSize: 8, fontWeight: "900", letterSpacing: 1.1 },
  premiumLessonTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", marginTop: 3 },
  premiumLessonSubtitle: { color: "#AAB6BD", fontSize: 10, lineHeight: 14, marginTop: 2 },
  premiumMetaRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 5 },
  premiumMeta: { color: duo.muted, fontSize: 9, fontWeight: "800" },
  premiumPrice: { color: duo.gold, fontSize: 10, fontWeight: "900" },
  unlockButton: {
    backgroundColor: "#25D366",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  unlockButtonText: { color: "#FFFFFF", fontSize: 9, fontWeight: "900" },

  // Astuce
  tip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: duo.surface,
    borderRadius: 16,
    padding: 14,
  },
  tipText: { color: "#D3DBE0", fontSize: 11, lineHeight: 16, flex: 1 },

  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});
