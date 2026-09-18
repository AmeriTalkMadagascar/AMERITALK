import type { Lesson, Sentence, Level } from "./content";
import { MAX_STAGE, type MemoryState } from "./srs";

/**
 * Moteur de session d'apprentissage — VERSION DUOLINGO.
 *
 * RÈGLE D'OR N°1 : on n'apprend JAMAIS un mot isolé. Chaque exercice porte
 * sur une PHRASE COMPLÈTE, comme dans Duolingo.
 *
 * RÈGLE D'OR N°2 : AUCUN AUTO-PLAY. L'utilisateur clique TOUJOURS sur 🔊
 * pour écouter. Sauf dans `listen` et `speak` où le clic est le but même
 * de l'exercice.
 *
 * Cycle pédagogique :
 *   EXPOSITION → PRATIQUE → RAPPEL ACTIF → ERREUR → FEEDBACK → RÉPÉTITION
 *   → RÉVISION ESPACÉE → ADAPTATION → AUTOMATISATION → CONTEXTE RÉEL
 */

export type ExerciseKind =
  | "expose"    // EXPOSITION : on découvre la phrase (audio manuel, sens, mot clé)
  | "translate" // TRADUCTION : EN → FR, choix multiples
  | "build"     // CONSTRUCTION : reconstruire la phrase mot à mot
  | "listen"    // ÉCOUTE : audio seul (l'utilisateur clique) → choisir la phrase
  | "recall"    // RAPPEL : FR → EN, choix multiples
  | "speak";    // PRONONCIATION : répéter la phrase (cliquer pour écouter le modèle)

export type Exercise =
  | { id: string; kind: "expose"; sentence: Sentence }
  | { id: string; kind: "translate"; sentence: Sentence; prompt: string; answer: string; choices: string[] }
  | { id: string; kind: "build"; sentence: Sentence; prompt: string; answer: string; tokens: string[] }
  | { id: string; kind: "listen"; sentence: Sentence; prompt: string; answer: string; choices: string[] }
  | { id: string; kind: "recall"; sentence: Sentence; prompt: string; answer: string; choices: string[] }
  | { id: string; kind: "speak"; sentence: Sentence; prompt: string };

/** Nombre de phrases nouvelles avant de pratiquer. */
export const BATCH_SIZE = 2;

/** Utilitaire : est-ce que cet exercice a besoin que l'utilisateur clique sur 🔊 ? */
export function requiresAudioClick(kind: ExerciseKind): boolean {
  // Sur listen et speak, l'écoute EST le cœur de l'exercice.
  // Sur les autres, l'audio est facultatif (l'utilisateur peut cliquer s'il veut).
  return kind === "listen" || kind === "speak";
}

// ===== Utilitaires =====
function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildChoices(correct: string, pool: string[], count = 3): string[] {
  const distractors: string[] = [];
  for (const candidate of shuffle(pool)) {
    if (distractors.length >= count) break;
    if (candidate !== correct && !distractors.includes(candidate)) distractors.push(candidate);
  }
  return shuffle([correct, ...distractors]);
}

// ===== Générateurs d'exercices (sur PHRASES) =====

function makeTranslate(sentence: Sentence, lesson: Lesson, seq: number): Exercise {
  const otherFr = lesson.sentences.filter((s) => s.id !== sentence.id).map((s) => s.french);
  return {
    id: `${sentence.id}-translate-${seq}`,
    kind: "translate",
    sentence,
    prompt: "Traduis cette phrase",
    answer: sentence.french,
    choices: buildChoices(sentence.french, otherFr),
  };
}

function makeListen(sentence: Sentence, lesson: Lesson, seq: number): Exercise {
  const otherEn = lesson.sentences.filter((s) => s.id !== sentence.id).map((s) => s.english);
  return {
    id: `${sentence.id}-listen-${seq}`,
    kind: "listen",
    sentence,
    prompt: "Écoute et choisis ce que tu entends",
    answer: sentence.english,
    choices: buildChoices(sentence.english, otherEn),
  };
}

function makeRecall(sentence: Sentence, lesson: Lesson, seq: number): Exercise {
  const otherEn = lesson.sentences.filter((s) => s.id !== sentence.id).map((s) => s.english);
  return {
    id: `${sentence.id}-recall-${seq}`,
    kind: "recall",
    sentence,
    prompt: "Comment dit-on cette phrase en anglais ?",
    answer: sentence.english,
    choices: buildChoices(sentence.english, otherEn),
  };
}

function makeBuild(sentence: Sentence, seq: number): Exercise {
  return {
    id: `${sentence.id}-build-${seq}`,
    kind: "build",
    sentence,
    prompt: sentence.french,
    answer: sentence.english,
    tokens: shuffle(sentence.tokens),
  };
}

function makeSpeak(sentence: Sentence, seq: number): Exercise {
  return {
    id: `${sentence.id}-speak-${seq}`,
    kind: "speak",
    sentence,
    prompt: "Répète après le professeur",
  };
}

/**
 * PLAN par phrase : choisit les types d'exercices selon la maîtrise.
 * Le type `speak` n'apparaît que si l'utilisateur a déjà bien avancé (stage ≥ 4),
 * pour ne pas surcharger les débutants.
 */
function planForSentence(sentence: Sentence, state: MemoryState | undefined): ExerciseKind[] {
  const stage = state?.stage ?? 0;
  const fragile = (state?.lapses ?? 0) >= 2;

  if (stage === 0) return ["expose", "translate", "build"];
  if (fragile || stage === 1) return ["expose", "translate", "build"];
  if (stage === 2) return ["translate", "recall"];
  if (stage === 3) return ["build", "listen"];
  if (stage === 4) return ["listen", "recall"];
  return ["listen", "speak"];
}

/**
 * Construit la file d'exercices d'une session.
 */
export function buildSession(
  lesson: Lesson,
  memory: Record<string, MemoryState>,
  reviewSentences: Sentence[] = []
): Exercise[] {
  const queue: Exercise[] = [];
  let seq = 0;

  // 1. RÉVISION ESPACÉE : on commence par réactiver les phrases dues (max 3).
  reviewSentences.slice(0, 3).forEach((sentence) => {
    seq += 1;
    const stage = memory[sentence.id]?.stage ?? 0;
    if (stage >= 3) queue.push(makeListen(sentence, lesson, seq));
    else queue.push(makeTranslate(sentence, lesson, seq));
  });

  // 2. MICRO-LOTS : 2 phrases nouvelles → exposition + pratique immédiate.
  for (let start = 0; start < lesson.sentences.length; start += BATCH_SIZE) {
    const batch = lesson.sentences.slice(start, start + BATCH_SIZE);
    const plans = batch.map((sentence) => ({
      sentence,
      kinds: planForSentence(sentence, memory[sentence.id]),
    }));

    // EXPOSITION du lot entier d'abord.
    plans.forEach(({ sentence, kinds }) => {
      if (kinds[0] === "expose") {
        seq += 1;
        queue.push({ id: `${sentence.id}-expose-${seq}`, kind: "expose", sentence });
      }
    });

    // PRATIQUE entrelacée : on alterne entre les phrases du lot.
    const maxSteps = Math.max(
      ...plans.map(({ kinds }) => kinds.filter((k) => k !== "expose").length)
    );
    for (let step = 0; step < maxSteps; step += 1) {
      plans.forEach(({ sentence, kinds }) => {
        const quizKinds = kinds.filter(
          (k) => k !== "expose"
        ) as ("translate" | "build" | "listen" | "recall" | "speak")[];
        const kind = quizKinds[step];
        if (!kind) return;
        seq += 1;
        switch (kind) {
          case "translate":
            queue.push(makeTranslate(sentence, lesson, seq));
            break;
          case "build":
            queue.push(makeBuild(sentence, seq));
            break;
          case "listen":
            queue.push(makeListen(sentence, lesson, seq));
            break;
          case "recall":
            queue.push(makeRecall(sentence, lesson, seq));
            break;
          case "speak":
            queue.push(makeSpeak(sentence, seq));
            break;
        }
      });
    }
  }

  return queue;
}

/**
 * RÉPÉTITION APRÈS ERREUR : l'exercice raté revient un peu plus loin.
 */
export function requeueAfterMistake(
  queue: Exercise[],
  currentIndex: number,
  exercise: Exercise,
  gap = 3
): Exercise[] {
  const next = [...queue];
  const target = Math.min(next.length, currentIndex + gap + 1);
  next.splice(target, 0, { ...exercise, id: `${exercise.id}-retry` });
  return next;
}

/**
 * Message de feedback immédiat, adapté au résultat et au palier.
 */
export function feedbackMessage(correct: boolean, answer: string, state?: MemoryState) {
  if (!correct)
    return {
      title: "Pas encore",
      detail: `La bonne réponse est « ${answer} ». Tu la reverras dans un instant.`,
    };
  const stage = state?.stage ?? 0;
  if (stage >= MAX_STAGE - 1)
    return { title: "Automatique !", detail: "Cette phrase est acquise, elle reviendra plus rarement." };
  if (stage >= 3)
    return { title: "Bien joué", detail: "Tu commences à la produire sans hésiter." };
  return { title: "Correct", detail: "Continue, la répétition va l'ancrer." };
}

// ===== Helpers d'affichage =====
export function getSentenceById(lesson: Lesson, sentenceId: string): Sentence | undefined {
  return lesson.sentences.find((s) => s.id === sentenceId);
}

export function getLessonLevelLabel(level: Level): string {
  switch (level) {
    case "Beginner":
      return "Débutant";
    case "Intermediate":
      return "Intermédiaire";
    case "Advanced":
      return "Avancé";
  }
}