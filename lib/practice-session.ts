import type { Level, Sentence } from "./content";
import { allSentences, lessons } from "./content";

// ===== Types d'exercices de pratique (miroir de lesson-engine) =====
export type PracticeExercise =
  | { kind: "translate"; sentence: Sentence; prompt: string; answer: string; choices: string[] }
  | { kind: "build"; sentence: Sentence; prompt: string; answer: string; tokens: string[] }
  | { kind: "listen"; sentence: Sentence; prompt: string; answer: string; choices: string[] }
  | { kind: "recall"; sentence: Sentence; prompt: string; answer: string; choices: string[] }
  | { kind: "speak"; sentence: Sentence; prompt: string };

export type SessionOptions = {
  sentenceIds?: string[];       // cibler des phrases précises (erreurs)
  level?: Level | "All";        // filtrer par niveau
  count?: number;               // nombre d'exercices (défaut 10)
  includePronunciation?: boolean; // inclure speak
};

// ===== Utilitaires =====
const shuffle = <T,>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

function buildChoices(correct: string, pool: string[], count = 3): string[] {
  const distractors: string[] = [];
  for (const candidate of shuffle(pool)) {
    if (distractors.length >= count) break;
    if (candidate !== correct && !distractors.includes(candidate)) distractors.push(candidate);
  }
  return shuffle([correct, ...distractors]);
}

// ===== Générateurs d'exercices (sur PHRASES) =====

function makeTranslate(sentence: Sentence, pool: Sentence[], seq: number): PracticeExercise {
  const otherFr = pool.filter((s) => s.id !== sentence.id).map((s) => s.french);
  return {
    kind: "translate",
    sentence,
    prompt: "Traduis cette phrase",
    answer: sentence.french,
    choices: buildChoices(sentence.french, otherFr),
  };
}

function makeBuild(sentence: Sentence): PracticeExercise {
  return {
    kind: "build",
    sentence,
    prompt: sentence.french,
    answer: sentence.english,
    tokens: shuffle(sentence.tokens),
  };
}

function makeListen(sentence: Sentence, pool: Sentence[]): PracticeExercise {
  const otherEn = pool.filter((s) => s.id !== sentence.id).map((s) => s.english);
  return {
    kind: "listen",
    sentence,
    prompt: "Écoute et choisis ce que tu entends",
    answer: sentence.english,
    choices: buildChoices(sentence.english, otherEn),
  };
}

function makeRecall(sentence: Sentence, pool: Sentence[]): PracticeExercise {
  const otherEn = pool.filter((s) => s.id !== sentence.id).map((s) => s.english);
  return {
    kind: "recall",
    sentence,
    prompt: "Comment dit-on cette phrase en anglais ?",
    answer: sentence.english,
    choices: buildChoices(sentence.english, otherEn),
  };
}

function makeSpeak(sentence: Sentence): PracticeExercise {
  return {
    kind: "speak",
    sentence,
    prompt: "Répète après le professeur",
  };
}

// ===== Générateur de session =====
export function buildPracticeSession(options: SessionOptions = {}): PracticeExercise[] {
  const { sentenceIds, level = "All", count = 10, includePronunciation = true } = options;

  // 1. Choisir le pool de phrases
  let pool: Sentence[];
  if (sentenceIds && sentenceIds.length > 0) {
    pool = allSentences.filter((s) => sentenceIds.includes(s.id));
  } else if (level !== "All") {
    pool = lessons
      .filter((lesson) => lesson.level === level)
      .flatMap((lesson) => lesson.sentences);
  } else {
    pool = allSentences;
  }

  if (pool.length === 0) pool = allSentences;

  // 2. Sélectionner assez de phrases (avec répétition si pool trop petit)
  const targetCount = Math.max(3, count);
  const selected: Sentence[] = [];
  while (selected.length < targetCount) {
    selected.push(...shuffle(pool));
  }
  const sentences = selected.slice(0, targetCount);

  // 3. Types d'exercices en rotation
  const types: PracticeExercise["kind"][] = includePronunciation
    ? ["translate", "build", "listen", "recall", "speak"]
    : ["translate", "build", "listen", "recall"];

  // 4. Générer un exercice par phrase
  const exercises: PracticeExercise[] = sentences.map((sentence, index) => {
    const type = types[index % types.length];
    switch (type) {
      case "translate":
        return makeTranslate(sentence, pool, index);
      case "build":
        return makeBuild(sentence);
      case "listen":
        return makeListen(sentence, pool);
      case "recall":
        return makeRecall(sentence, pool);
      case "speak":
      default:
        return makeSpeak(sentence);
    }
  });

  // 5. Mélanger sauf le premier (démarrage doux)
  const [first, ...rest] = exercises;
  return [first, ...shuffle(rest)];
}

// ===== Helpers =====
export function getLevelLabel(level: Level | "All"): string {
  switch (level) {
    case "Beginner":
      return "Débutant";
    case "Intermediate":
      return "Intermédiaire";
    case "Advanced":
      return "Avancé";
    default:
      return "Tous niveaux";
  }
}