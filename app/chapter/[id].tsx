import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { duo } from "@/constants/design";
import { useAppState } from "@/lib/app-state";
import { getChapter } from "@/lib/content-v2";

// ============================================================
// CHAPITRE — PARCOURS VERTICAL
// Affiche les leçons d'un chapitre en chemin vertical (façon Duolingo).
// Chaque bulle ouvre la leçon correspondante.
// ============================================================

// Décalage horizontal de chaque bulle (zigzag fluide)
function getOffset(index: number): number {
  return Math.sin(index * 0.7) * 68;
}

export default function ChapterScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const chapter = getChapter(id ?? "ch1");

  const { completedLessons, activatedPremiumLessons } = useAppState();

  if (!chapter) {
    return (
      <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "bottom", "left", "right"]}>
        <View style={styles.errorWrap}>
          <MaterialIcons name="error-outline" size={48} color={duo.red} />
          <Text style={styles.errorText}>Chapitre introuvable</Text>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Retour</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  // Index de la prochaine leçon à faire
  const nextIndex = chapter.lessons.findIndex(
    (lesson) => !completedLessons.includes(lesson.id)
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer
        containerClassName="bg-[#131A20]"
        edges={["top", "bottom", "left", "right"]}
      >
        {/* ===== Header ===== */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={22} color={duo.muted} />
          </Pressable>
          <View style={styles.headerCopy}>
            <Text style={styles.headerTitle}>{chapter.title}</Text>
            <Text style={styles.headerSubtitle}>{chapter.subtitle}</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{chapter.level}</Text>
          </View>
        </View>

        {/* ===== Bannière du chapitre ===== */}
        <View style={[styles.chapterBanner, { backgroundColor: chapter.color }]}>
          <Text style={styles.chapterBannerEmoji}>{chapter.emoji}</Text>
          <View style={styles.chapterBannerCopy}>
            <Text style={styles.chapterBannerTitle}>
              {chapter.lessons.length} leçon{chapter.lessons.length > 1 ? "s" : ""} à découvrir
            </Text>
            <Text style={styles.chapterBannerText}>
              {completedLessons.filter((id) => chapter.lessons.some((l) => l.id === id)).length} terminée
              {completedLessons.filter((id) => chapter.lessons.some((l) => l.id === id)).length > 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {/* ===== Chemin vertical ===== */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pathContent}
        >
          <View style={styles.path}>
            {chapter.lessons.map((lesson, index) => {
              const done = completedLessons.includes(lesson.id);
              const isPremium = lesson.id.startsWith("premium-");
              const unlocked = isPremium
                ? activatedPremiumLessons.includes(lesson.id)
                : index === 0 || completedLessons.includes(chapter.lessons[index - 1]?.id);
              const isCurrent = index === nextIndex;
              const offset = getOffset(index);

              // Type de bulle selon la position
              const node = getNodeStyle(index, chapter.lessons.length, done, unlocked);

              return (
                <View
                  key={lesson.id}
                  style={[styles.nodeWrap, { transform: [{ translateX: offset }] }]}
                >
                  {isCurrent ? <StartTooltip /> : null}
                  <LessonBubble
                    color={node.color}
                    icon={node.icon}
                    unlocked={unlocked || done}
                    pulsing={isCurrent}
                    perfect={done}
                    onPress={() => {
                      if (!unlocked) return;
                      router.push(`/lesson-v2/${lesson.id}` as never);
                    }}
                  />
                  <Text
                    style={[styles.nodeLabel, !unlocked && styles.nodeLabelMuted]}
                    numberOfLines={2}
                  >
                    {lesson.title}
                  </Text>
                  <Text style={styles.nodeSub}>{lesson.subtitle}</Text>
                </View>
              );
            })}
          </View>

          {/* ===== Message de fin ===== */}
          <View style={styles.endMessage}>
            <MaterialIcons name="celebration" size={28} color={duo.gold} />
            <Text style={styles.endTitle}>
              {chapter.lessons.every((l) => completedLessons.includes(l.id))
                ? "Bravo, chapitre terminé !"
                : "Continue ton parcours !"}
            </Text>
            <Text style={styles.endText}>
              {chapter.lessons.every((l) => completedLessons.includes(l.id))
                ? "Tu peux passer au chapitre suivant."
                : `${chapter.lessons.filter((l) => !completedLessons.includes(l.id)).length} leçon(s) restante(s).`}
            </Text>
          </View>
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

// ============================================================
// Helpers
// ============================================================

function getNodeStyle(
  index: number,
  total: number,
  done: boolean,
  unlocked: boolean
): { icon: keyof typeof MaterialIcons.glyphMap; color: string } {
  if (done) {
    return { icon: "check", color: duo.gold };
  }
  if (!unlocked) {
    return { icon: "lock", color: duo.locked };
  }
  // Tous les 5 nœuds : coffre (récompense)
  if ((index + 1) % 5 === 0) {
    return { icon: "card-giftcard", color: duo.purple };
  }
  // Dernier nœud : trophée
  if (index === total - 1 && total > 2) {
    return { icon: "emoji-events", color: duo.purple };
  }
  // Tous les 3 nœuds : haltères (renforcement)
  if ((index + 1) % 3 === 0) {
    return { icon: "fitness-center", color: duo.green };
  }
  // Nœud standard : étoile bleue
  return { icon: "star", color: duo.blue };
}

function shade(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - 30);
  const g = Math.max(0, ((n >> 8) & 0xff) - 30);
  const b = Math.max(0, (n & 0xff) - 30);
  return `rgb(${r},${g},${b})`;
}

// ============================================================
// Composants
// ============================================================

function StartTooltip() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  return (
    <Animated.View style={[styles.startBadge, { transform: [{ scale }] }]}>
      <Text style={styles.startBadgeText}>COMMENCER</Text>
      <View style={styles.startBadgeArrow} />
    </Animated.View>
  );
}

function LessonBubble({
  color,
  icon,
  unlocked,
  pulsing,
  perfect,
  onPress,
}: {
  color: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  unlocked: boolean;
  pulsing: boolean;
  perfect: boolean;
  onPress: () => void;
}) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!pulsing) return;
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulsing, pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });
  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.35] });

  return (
    <View style={styles.bubbleWrap}>
      {pulsing ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.bubbleRing,
            {
              backgroundColor: color,
              opacity: ringOpacity,
              transform: [{ scale: ringScale }],
            },
          ]}
        />
      ) : null}
      {perfect ? (
        <View style={styles.crownBadge}>
          <MaterialIcons name="workspace-premium" size={16} color="#FFFFFF" />
        </View>
      ) : null}
      <Animated.View style={pulsing ? { transform: [{ scale }] } : undefined}>
        <Pressable
          onPress={onPress}
          disabled={!unlocked}
          style={({ pressed }) => [
            styles.bubble,
            { backgroundColor: color, borderColor: shade(color) },
            pressed && unlocked && styles.pressed,
          ]}
        >
          <MaterialIcons
            name={icon}
            size={30}
            color={unlocked ? "#FFFFFF" : duo.lockedIcon}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

// ============================================================
// Styles
// ============================================================

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: duo.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCopy: { flex: 1 },
  headerTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900" },
  headerSubtitle: { color: duo.muted, fontSize: 12, fontWeight: "700", marginTop: 2 },
  headerBadge: {
    backgroundColor: duo.surface,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerBadgeText: { color: duo.blue, fontSize: 11, fontWeight: "900" },

  // Bannière
  chapterBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 18,
    marginBottom: 14,
    borderRadius: 16,
    padding: 14,
  },
  chapterBannerEmoji: { fontSize: 32 },
  chapterBannerCopy: { flex: 1 },
  chapterBannerTitle: { color: "#0B1116", fontSize: 14, fontWeight: "900" },
  chapterBannerText: { color: "rgba(0,0,0,0.6)", fontSize: 11, fontWeight: "700", marginTop: 3 },

  // Chemin
  pathContent: { paddingBottom: 60, alignItems: "center" },
  path: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  nodeWrap: {
    alignItems: "center",
    marginBottom: 36,
    width: 130,
  },
  bubbleWrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bubbleRing: {
    position: "absolute",
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  bubble: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
  },
  crownBadge: {
    position: "absolute",
    top: -10,
    right: -6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: duo.gold,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    zIndex: 2,
  },
  nodeLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    marginTop: 10,
    maxWidth: 130,
    textAlign: "center",
  },
  nodeSub: {
    color: duo.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
    textAlign: "center",
  },
  nodeLabelMuted: { color: duo.muted },

  // Tooltip
  startBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
    alignItems: "center",
  },
  startBadgeText: { color: duo.green, fontSize: 10, fontWeight: "900", letterSpacing: 0.5 },
  startBadgeArrow: {
    position: "absolute",
    bottom: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFFFFF",
  },

  // Fin
  endMessage: {
    alignItems: "center",
    gap: 6,
    marginTop: 20,
    padding: 24,
    backgroundColor: duo.surface,
    borderRadius: 20,
    marginHorizontal: 18,
    width: "88%",
    maxWidth: 400,
  },
  endTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", textAlign: "center" },
  endText: {
    color: duo.muted,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 4,
  },

  // Erreur
  errorWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  errorText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  backButtonText: { color: duo.green, fontSize: 14, fontWeight: "900" },

  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
});
