import { chapters, type ContentCard, type LessonV2 } from "./content-v2";

// ============================================================
// PRACTICE V2 — Générateur d'exercices depuis les leçons V2
// ============================================================

// ===== Types =====
export type PracticeExercise = {
  id: string;
  question: string;
  choices: string[];
  answer: string;
  // Métadonnées (pour feedback)
  lessonTitle: string;
  chapterTitle: string;
};

export type PronunciationWord = {
  word: string;
  source: string; // D'où vient le mot (pour info)
};

// ===== Utilitaire : mélange un tableau =====
function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ============================================================
// EXTRACTION DE TOUS LES EXEMPLES DES LEÇONS V2
// ============================================================
type ExtractedPair = {
  english: string;
  malagasy: string;
  lessonTitle: string;
  chapterTitle: string;
};

function extractAllPairs(): ExtractedPair[] {
  const pairs: ExtractedPair[] = [];

  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      for (const card of lesson.cards) {
        if (card.examples && card.examples.length > 0) {
          for (const ex of card.examples) {
            // Ignorer les exemples qui contiennent des emojis ❌/✅ (corrections)
            if (ex.english.includes("❌") || ex.english.includes("✅")) continue;
            // Ignorer les lignes trop courtes
            if (ex.english.length < 2) continue;

            pairs.push({
              english: ex.english,
              malagasy: ex.malagasy,
              lessonTitle: lesson.title,
              chapterTitle: chapter.title,
            });
          }
        }
      }
    }
  }

  return pairs;
}

// ============================================================
// GÉNÉRATION D'UN EXERCICE (QCM : EN → FR/MG)
// ============================================================
function buildQuizFromPair(
  pair: ExtractedPair,
  allPairs: ExtractedPair[],
  index: number
): PracticeExercise {
  // 3 distracteurs (autres traductions malagasy)
  const pool = allPairs.filter((p) => p.malagasy !== pair.malagasy);
  const distractors: string[] = [];
  for (const candidate of shuffle(pool)) {
    if (distractors.length >= 3) break;
    if (!distractors.includes(candidate.malagasy)) {
      distractors.push(candidate.malagasy);
    }
  }

  const choices = shuffle([pair.malagasy, ...distractors]);

  return {
    id: `quiz-${index}-${pair.english.slice(0, 20)}`,
    question: `What does "${pair.english}" mean?`,
    choices,
    answer: pair.malagasy,
    lessonTitle: pair.lessonTitle,
    chapterTitle: pair.chapterTitle,
  };
}

// ============================================================
// GÉNÉRATION D'UNE SESSION D'EXERCICES
// ============================================================
export function buildPracticeSession(count = 10): PracticeExercise[] {
  const allPairs = extractAllPairs();
  if (allPairs.length === 0) return [];

  // Prendre `count` paires au hasard
  const selected = shuffle(allPairs).slice(0, Math.min(count, allPairs.length));

  return selected.map((pair, i) => buildQuizFromPair(pair, allPairs, i));
}

// ============================================================
// MOTS POUR LA PRONONCIATION
// ============================================================
// On extrait les mots individuels des phrases (ex: "Good morning!" → ["Good", "morning"])
export function extractPronunciationWords(): PronunciationWord[] {
  const words = new Set<string>();

  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      for (const card of lesson.cards) {
        if (card.examples && card.examples.length > 0) {
          for (const ex of card.examples) {
            // Ignorer les exemples avec emojis
            if (ex.english.includes("❌") || ex.english.includes("✅")) continue;

            // Découper en mots
            const tokens = ex.english
              .replace(/[.,!?;:]/g, " ")
              .split(/\s+/)
              .filter((w) => w.length >= 3 && /^[a-zA-Z'-]+$/.test(w));

            for (const token of tokens) {
              words.add(token);
            }
          }
        }
      }
    }
  }

  // Convertir en tableau et prendre les 200 premiers (limite raisonnable)
  return Array.from(words)
    .slice(0, 200)
    .map((word) => ({
      word,
      source: "AmeriTalk lessons",
    }));
}

// ============================================================
// SESSION DE PRONONCIATION (mots mélangés)
// ============================================================
export function buildPronunciationSession(count = 10): PronunciationWord[] {
  const allWords = extractPronunciationWords();
  if (allWords.length === 0) return [];
  return shuffle(allWords).slice(0, Math.min(count, allWords.length));
}

// ============================================================
// SCORE DE PRONONCIATION (simple, sans API)
// ============================================================
// Calcule un score 0-100 basé sur des métriques simples
export function computeSimpleScore(params: {
  durationMs: number;
  targetWord: string;
}): number {
  const { durationMs, targetWord } = params;

  // Durée idéale : ~80ms par lettre du mot (mot court = rapide, mot long = plus lent)
  const idealMs = Math.max(600, targetWord.length * 120);
  const ratio = durationMs / idealMs;

  // Trop court → pénalité
  if (durationMs < 400) return 20;
  // Trop long → pénalité légère
  if (ratio > 2.5) return 60;
  // Durée dans la bonne plage → bon score
  if (ratio >= 0.7 && ratio <= 1.5) return 90 + Math.floor(Math.random() * 11); // 90-100
  if (ratio >= 0.5 && ratio < 0.7) return 70 + Math.floor(Math.random() * 15); // 70-84
  if (ratio > 1.5 && ratio <= 2.5) return 65 + Math.floor(Math.random() * 15); // 65-79

  return 55;
}

// ============================================================
// HELPERS
// ============================================================
export function getPracticeStats() {
  const allPairs = extractAllPairs();
  const allWords = extractPronunciationWords();
  return {
    totalPairs: allPairs.length,
    totalWords: allWords.length,
  };
}