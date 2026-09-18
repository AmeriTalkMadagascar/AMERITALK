import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { PremiumModal } from "@/components/premium-modal";
import { duo } from "@/constants/design";
import { getAcademicTrack } from "@/lib/academic";
import { PREMIUM_PACKS, type PremiumPack } from "@/lib/premium";

// ============================================================
// ÉCRAN PROGRAMME ACADÉMIQUE (BEPC / Bac / Université)
// Affiche un aperçu des modules + un gros bouton "Débloquer".
// Le contenu réel est verrouillé derrière un achat WhatsApp.
// ============================================================

export default function AcademicProgramScreen() {
  const router = useRouter();
  const { program } = useLocalSearchParams<{ program: string }>();
  const track = getAcademicTrack(program ?? "bepc");
  const pack = PREMIUM_PACKS[track.id];

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer
        edges={["top", "bottom", "left", "right"]}
        className="px-5"
        containerClassName="bg-[#131A20]"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* ===== Retour ===== */}
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={22} color={duo.muted} />
          </Pressable>

          {/* ===== Hero ===== */}
          <View style={styles.hero}>
            <View style={styles.heroTop}>
              <Text style={styles.heroEmoji}>{pack.emoji}</Text>
              <View style={styles.lockBadge}>
                <MaterialIcons name="lock" size={14} color={duo.gold} />
                <Text style={styles.lockText}>PREMIUM</Text>
              </View>
            </View>
            <Text style={styles.heroTitle}>{track.label}</Text>
            <Text style={styles.heroShort}>{track.shortLabel} · {track.level}</Text>
            <Text style={styles.heroDescription}>{track.description}</Text>

            {/* Prix */}
            <View style={styles.priceBlock}>
              <Text style={styles.priceKicker}>PACK COMPLET</Text>
              <Text style={styles.priceValue}>{pack.priceLabel}</Text>
              <Text style={styles.priceNote}>Paiement unique · Accès à vie</Text>
            </View>
          </View>

          {/* ===== Bouton principal "Débloquer" ===== */}
          <Pressable
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [styles.unlockButton, pressed && styles.pressed]}
          >
            <MaterialIcons name="lock-open" size={22} color="#0B1116" />
            <Text style={styles.unlockText}>Débloquer pour {pack.priceLabel}</Text>
          </Pressable>

          {/* ===== Aperçu des modules ===== */}
          <Text style={styles.sectionTitle}>Aperçu du programme</Text>
          <View style={styles.modules}>
            {track.modules.map((module, index) => (
              <View key={module.title} style={styles.moduleCard}>
                <View style={[styles.moduleIcon, { backgroundColor: module.color }]}>
                  <Text style={styles.moduleIconText}>{module.icon}</Text>
                </View>
                <View style={styles.moduleCopy}>
                  <Text style={styles.moduleTitle}>
                    Module {index + 1} · {module.title}
                  </Text>
                  <Text style={styles.moduleSubtitle}>{module.subtitle}</Text>
                  <View style={styles.moduleLessons}>
                    {module.lessons.map((lesson) => (
                      <View key={lesson} style={styles.lessonChip}>
                        <MaterialIcons name="lock" size={10} color={duo.muted} />
                        <Text style={styles.lessonText}>{lesson}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* ===== Ce que tu obtiens ===== */}
          <Text style={styles.sectionTitle}>Ce que tu obtiens</Text>
          <View style={styles.features}>
            {pack.features.map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <MaterialIcons name="check-circle" size={18} color={duo.green} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* ===== Bouton secondaire (bas) ===== */}
          <Pressable
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [styles.unlockButton, styles.unlockButtonSecondary, pressed && styles.pressed]}
          >
            <MaterialIcons name="chat" size={20} color="#FFFFFF" />
            <Text style={styles.unlockTextSecondary}>Acheter sur WhatsApp</Text>
          </Pressable>

          {/* ===== Note ===== */}
          <Text style={styles.footnote}>
            Une fois le paiement effectué, tu recevras ton accès par WhatsApp.
          </Text>
        </ScrollView>
      </ScreenContainer>

      {/* ===== Modal Premium ===== */}
      <PremiumModal
        visible={modalVisible}
        pack={pack}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 14, paddingBottom: 40 },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: duo.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  // Hero
  hero: {
    backgroundColor: duo.surface,
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  heroEmoji: { fontSize: 48 },
  lockBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,200,0,0.15)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: duo.gold,
  },
  lockText: { color: duo.gold, fontSize: 10, fontWeight: "900", letterSpacing: 1 },

  heroTitle: { color: "#FFFFFF", fontSize: 30, fontWeight: "900" },
  heroShort: {
    color: duo.blue,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 6,
    letterSpacing: 0.5,
  },
  heroDescription: {
    color: duo.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    fontWeight: "600",
  },

  priceBlock: {
    backgroundColor: duo.bg,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginTop: 18,
    borderWidth: 2,
    borderColor: duo.gold,
  },
  priceKicker: {
    color: duo.gold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  priceValue: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", marginTop: 4 },
  priceNote: { color: duo.muted, fontSize: 10, fontWeight: "700", marginTop: 6 },

  // Bouton unlock
  unlockButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: duo.green,
    borderRadius: 16,
    height: 58,
    marginBottom: 26,
    borderBottomWidth: 4,
    borderBottomColor: "#3D9401",
  },
  unlockButtonSecondary: {
    backgroundColor: "#25D366",
    borderBottomColor: "#1AA850",
    marginTop: 8,
  },
  unlockText: { color: "#0B1116", fontSize: 15, fontWeight: "900", letterSpacing: 0.5 },
  unlockTextSecondary: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", letterSpacing: 0.5 },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },

  // Section
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12,
    marginTop: 6,
  },

  // Modules
  modules: { gap: 12, marginBottom: 24 },
  moduleCard: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: duo.surface,
    borderRadius: 16,
    padding: 14,
  },
  moduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleIconText: { fontSize: 22 },
  moduleCopy: { flex: 1 },
  moduleTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  moduleSubtitle: { color: duo.muted, fontSize: 11, marginTop: 3, fontWeight: "600" },
  moduleLessons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  lessonChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: duo.locked,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lessonText: { color: duo.muted, fontSize: 10, fontWeight: "700" },

  // Features
  features: { gap: 10, marginBottom: 26 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { color: "#D3DBE0", fontSize: 13, fontWeight: "700", flex: 1 },

  footnote: {
    color: duo.muted,
    fontSize: 11,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 12,
  },
});