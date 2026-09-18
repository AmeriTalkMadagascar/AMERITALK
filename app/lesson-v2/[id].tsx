import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { duo } from "@/constants/design";
import { useAppState } from "@/lib/app-state";
import {
  getLessonById,
  getChapterOfLesson,
  type ContentCard,
} from "@/lib/content-v2";
import type { PdfPage } from "@/lib/pdf-content";

// ============================================================
// LEÇON V2 — CARTES DE CONTENU (façon Duolingo)
// Une carte par notion (explication, formule, exemples...).
// Navigation linéaire : carte 1 → carte 2 → ... → fin.
// ============================================================

export default function LessonV2Screen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id ?? "");
  const chapter = lesson ? getChapterOfLesson(lesson.id) : undefined;

  const { markLessonComplete, resetHearts, resetCombo, completedLessons } = useAppState();

  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // Aucune leçon trouvée
  if (!lesson) {
    return (
      <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "bottom", "left", "right"]}>
        <View style={styles.errorWrap}>
          <MaterialIcons name="error-outline" size={48} color={duo.red} />
          <Text style={styles.errorText}>Leçon introuvable</Text>
          <Pressable onPress={() => router.back()} style={styles.primary}>
            <Text style={styles.primaryText}>Retour</Text>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  const sourcePages = lesson.sourcePages ?? [];
  const total = lesson.cards.length + sourcePages.length;
  const current: ContentCard | undefined = lesson.cards[index];
  const currentPdfPage: PdfPage | undefined = index >= lesson.cards.length ? sourcePages[index - lesson.cards.length] : undefined;
  const alreadyDone = completedLessons.includes(lesson.id);

  // ===== Navigation =====
  const goNext = () => {
    if (index >= total - 1) {
      // Fin de la leçon
      if (!alreadyDone) {
        markLessonComplete(lesson.id, [], 25);
      }
      setFinished(true);
      return;
    }
    setIndex((v) => v + 1);
  };

  const goPrev = () => {
    if (index <= 0) return;
    setIndex((v) => v - 1);
  };

  const restart = () => {
    setIndex(0);
    setFinished(false);
  };

  const finishAndGoBack = () => {
    resetHearts();
    resetCombo();
    router.back();
  };

  // ===== Barre de progression =====
  const progressPercent = total > 0 ? Math.min(100, ((index + 1) / total) * 100) : 0;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer
        edges={["top", "bottom", "left", "right"]}
        className="px-5"
        containerClassName="bg-[#131A20]"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* ===== ÉCRAN DE FIN ===== */}
          {finished ? (
            <View style={styles.finishWrap}>
              <View style={styles.finishCard}>
                <Text style={styles.finishKicker}>LEÇON TERMINÉE</Text>
                <View style={styles.finishBadge}>
                  <MaterialIcons name="stars" size={44} color={duo.gold} />
                </View>
                <Text style={styles.finishTitle}>Bravo ! 🎉</Text>
                <Text style={styles.finishText}>
                  Tu as terminé la leçon{" "}
                  <Text style={{ color: duo.green, fontWeight: "900" }}>{lesson.title}</Text>.
                </Text>
                <View style={styles.finishStats}>
                  <View style={styles.finishStat}>
                    <MaterialIcons name="menu-book" size={18} color={duo.purple} />
                    <Text style={styles.finishStatValue}>{total} cartes</Text>
                  </View>
                  <View style={styles.finishStat}>
                    <MaterialIcons name="diamond" size={18} color={duo.blue} />
                    <Text style={styles.finishStatValue}>+25 XP</Text>
                  </View>
                </View>
              </View>
              <Pressable onPress={finishAndGoBack} style={styles.primary}>
                <Text style={styles.primaryText}>RETOUR AU CHAPITRE</Text>
              </Pressable>
              <Pressable onPress={restart} style={styles.secondary}>
                <MaterialIcons name="refresh" size={18} color={duo.muted} />
                <Text style={styles.secondaryText}>Revoir la leçon</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {/* ===== BARRE DU HAUT ===== */}
              <View style={styles.top}>
                <Pressable onPress={() => router.back()} style={styles.closeButton}>
                  <MaterialIcons name="close" size={22} color={duo.muted} />
                </Pressable>
                <View style={styles.progress}>
                  <View
                    style={[styles.progressFill, { width: `${progressPercent}%` }]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {index + 1}/{total}
                </Text>
              </View>

              {/* ===== INFO CHAPITRE ===== */}
              <Text style={styles.chapterKicker}>
                {chapter?.title ?? ""} · {lesson.subtitle}
              </Text>

              <View style={styles.freeNavBox}>
                <Text style={styles.freeNavTitle}>Navigation libre — choisis une étape</Text>
                <View style={styles.freeNavGrid}>
                  {Array.from({ length: total }, (_, step) => (
                    <Pressable
                      key={`${lesson.id}-step-${step}`}
                      onPress={() => { setIndex(step); setFinished(false); }}
                      style={[styles.freeNavStep, step === index && styles.freeNavStepActive]}
                    >
                      <Text style={[styles.freeNavStepText, step === index && styles.freeNavStepTextActive]}>{step + 1}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* ===== CARTE ACTUELLE ===== */}
              {current ? <CardView card={current} /> : currentPdfPage ? <PdfPageView page={currentPdfPage} /> : null}

              {/* ===== BOUTONS NAVIGATION ===== */}
              <View style={styles.bottomArea}>
                <View style={styles.navRow}>
                  {index > 0 ? (
                    <Pressable onPress={goPrev} style={styles.navBack}>
                      <MaterialIcons name="arrow-back" size={20} color="#FFFFFF" />
                    </Pressable>
                  ) : null}

                  <Pressable
                    onPress={goNext}
                    style={({ pressed }) => [
                      styles.primary,
                      styles.primaryFlex,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.primaryText}>
                      {index >= total - 1 ? "TERMINER" : "SUIVANT"}
                    </Text>
                    <MaterialIcons
                      name={index >= total - 1 ? "check" : "arrow-forward"}
                      size={20}
                      color="#0B1116"
                    />
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

// ============================================================
// CARTE — Rendu selon le type
// ============================================================

function CardView({ card }: { card: ContentCard }) {
  return (
    <View style={styles.card}>
      {/* En-tête : badge type + titre anglais */}
      <View style={styles.cardHeader}>
        <View style={[styles.cardBadge, { backgroundColor: badgeColor(card.type) }]}>
          <MaterialIcons name={badgeIcon(card.type)} size={14} color="#FFFFFF" />
          <Text style={styles.cardBadgeText}>{badgeLabel(card.type)}</Text>
        </View>
      </View>

      {/* Titre anglais (ex: GREETINGS) */}
      {card.englishTitle ? (
        <Text style={styles.englishTitle}>{card.englishTitle}</Text>
      ) : null}

      {/* Titre malagasy (ex: Fanazavana) */}
      <Text style={styles.cardTitle}>{card.title}</Text>

      {/* Explication en malagasy */}
      {card.malagasyExplanation ? (
        <View style={styles.explanationBox}>
          <MaterialIcons name="translate" size={18} color={duo.gold} />
          <Text style={styles.explanationText}>{card.malagasyExplanation}</Text>
        </View>
      ) : null}

      {card.content ? (
        <View style={styles.sourceBox}>
          <Text style={styles.sourceText}>{card.content}</Text>
        </View>
      ) : null}

      {/* Formule */}
      {card.formula ? (
        <View style={styles.formulaBox}>
          <MaterialIcons name="functions" size={18} color={duo.blue} />
          <Text style={styles.formulaText}>{card.formula}</Text>
        </View>
      ) : null}

      {/* Exemples */}
      {card.examples && card.examples.length > 0 ? (
        <View style={styles.examplesBox}>
          {card.examples.map((ex, i) => (
            <View key={`${card.id}-ex-${i}`} style={styles.exampleRow}>
              <View style={styles.exampleEn}>
                <Text style={styles.exampleEnText}>{ex.english}</Text>
              </View>
              <View style={styles.exampleMg}>
                <Text style={styles.exampleMgText}>{ex.malagasy}</Text>
              </View>
              {ex.example ? <Text style={styles.exampleSourceText}>{ex.example}</Text> : null}
            </View>
          ))}
        </View>
      ) : null}

      {card.sourceExamples && card.sourceExamples.length > 0 ? (
        <View style={styles.sourceExamplesBox}>
          {card.sourceExamples.map((example, i) => (
            <Text key={`${card.id}-source-${i}`} style={styles.exampleSourceText}>{example}</Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function PdfPageView({ page }: { page: PdfPage }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.cardBadge, { backgroundColor: duo.orange }]}>
          <MaterialIcons name="picture-as-pdf" size={14} color="#FFFFFF" />
          <Text style={styles.cardBadgeText}>PAGE DU SUPPORT PDF</Text>
        </View>
        <Text style={styles.pdfPageNumber}>Page {page.page}</Text>
      </View>
      <Text style={styles.pdfText}>{page.text}</Text>
    </View>
  );
}

// ============================================================
// Helpers — Apparence des cartes
// ============================================================

function badgeColor(type: ContentCard["type"]): string {
  switch (type) {
    case "explanation":
      return duo.purple;
    case "formula":
      return duo.blue;
    case "examples":
      return duo.green;
    case "vocabulary":
      return duo.orange;
    case "note":
      return duo.gold;
    default:
      return duo.muted;
  }
}

function badgeIcon(type: ContentCard["type"]): keyof typeof MaterialIcons.glyphMap {
  switch (type) {
    case "explanation":
      return "menu-book";
    case "formula":
      return "functions";
    case "examples":
      return "format-list-bulleted";
    case "vocabulary":
      return "spellcheck";
    case "note":
      return "lightbulb-outline";
    default:
      return "info";
  }
}

function badgeLabel(type: ContentCard["type"]): string {
  switch (type) {
    case "explanation":
      return "FANAZAVANA";
    case "formula":
      return "FORMULE";
    case "examples":
      return "OHATRA";
    case "vocabulary":
      return "VOCABULAIRE";
    case "note":
      return "NOTE";
    default:
      return "INFO";
  }
}

// ============================================================
// Styles
// ============================================================

const styles = StyleSheet.create({
  content: { paddingTop: 14, paddingBottom: 40, flexGrow: 1 },

  // Barre du haut
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  closeButton: { padding: 4 },
  progress: {
    height: 14,
    flex: 1,
    backgroundColor: duo.surface,
    borderRadius: 7,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: duo.blue,
    borderRadius: 7,
  },
  progressText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    minWidth: 40,
    textAlign: "right",
  },

  // Info chapitre
  chapterKicker: {
    color: duo.purple,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginBottom: 16,
    textTransform: "uppercase",
  },
  freeNavBox: { backgroundColor: "#18232B", borderRadius: 14, padding: 12, marginBottom: 14, borderWidth: 1, borderColor: "#33434D" },
  freeNavTitle: { color: "#AFC4CE", fontSize: 10, fontWeight: "800", marginBottom: 9 },
  freeNavGrid: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  freeNavStep: { width: 32, height: 30, borderRadius: 9, backgroundColor: "#25343D", alignItems: "center", justifyContent: "center" },
  freeNavStepActive: { backgroundColor: duo.gold },
  freeNavStepText: { color: "#D3DBE0", fontSize: 11, fontWeight: "900" },
  freeNavStepTextActive: { color: "#0B1116" },

  // Carte
  card: {
    backgroundColor: duo.surface,
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  cardBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cardBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  pdfPageNumber: { color: duo.muted, fontSize: 11, fontWeight: "800" },
  pdfText: { color: "#E8EEF1", fontSize: 13, lineHeight: 20, fontFamily: "monospace" },

  englishTitle: {
    color: duo.blue,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18,
    lineHeight: 30,
  },

  // Explication
  explanationBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: duo.bg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: duo.gold,
  },
  explanationText: {
    color: "#D3DBE0",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "600",
    flex: 1,
  },
  sourceBox: {
    backgroundColor: "#17232D",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  sourceText: { color: "#D3DBE0", fontSize: 13, lineHeight: 20 },

  // Formule
  formulaBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#0F1A22",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: duo.blue,
  },
  formulaText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: "monospace",
    flex: 1,
  },

  // Exemples
  examplesBox: { gap: 10 },
  exampleRow: {
    backgroundColor: duo.bg,
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: duo.green,
  },
  exampleEn: { marginBottom: 6 },
  exampleEnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    lineHeight: 20,
  },
  exampleMg: {},
  exampleMgText: {
    color: duo.muted,
    fontSize: 13,
    fontWeight: "700",
    fontStyle: "italic",
    lineHeight: 18,
  },
  sourceExamplesBox: { marginTop: 12, gap: 8 },
  exampleSourceText: { color: "#AFC4CE", fontSize: 13, lineHeight: 19, fontStyle: "italic" },

  // Navigation bas
  bottomArea: { marginTop: "auto" },
  navRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  navBack: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: duo.surface,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
    borderBottomColor: duo.locked,
  },

  // Boutons
  primary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: duo.green,
    borderRadius: 16,
    height: 56,
    borderBottomWidth: 4,
    borderBottomColor: "#3D9401",
  },
  primaryFlex: { flex: 1 },
  primaryText: {
    color: "#0B1116",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  secondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    marginTop: 8,
  },
  secondaryText: { color: duo.muted, fontSize: 13, fontWeight: "800" },

  // Fin de leçon
  finishWrap: { flex: 1, justifyContent: "center" },
  finishCard: {
    backgroundColor: duo.surface,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    marginBottom: 20,
  },
  finishKicker: {
    color: duo.gold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  finishBadge: {
    marginTop: 14,
    padding: 14,
    backgroundColor: duo.bg,
    borderRadius: 999,
  },
  finishTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 10,
  },
  finishText: {
    color: duo.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
  },
  finishStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: duo.locked,
  },
  finishStat: { alignItems: "center", gap: 4 },
  finishStatValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  // Erreur
  errorWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 24,
  },
  errorText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
});
