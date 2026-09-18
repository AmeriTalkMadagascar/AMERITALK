/**
 * Répétition espacée + suivi de maîtrise par mot.
 *
 * Chaque mot possède un "état de mémoire" qui avance quand l'utilisateur
 * réussit et recule quand il se trompe. C'est ce qui pilote à la fois
 * la RÉVISION ESPACÉE (quand revoir le mot) et l'ADAPTATION DE LA DIFFICULTÉ
 * (quel type d'exercice proposer).
 */

export type MemoryState = {
  /** 0 = jamais vu, 1 = exposé, 2 = reconnu, 3 = rappelé, 4 = produit, 5 = automatisé */
  stage: number;
  /** Bonnes réponses consécutives depuis la dernière erreur. */
  streak: number;
  /** Nombre total d'erreurs sur ce mot (sert à repérer les points faibles). */
  lapses: number;
  /** Date ISO (AAAA-MM-JJ) de la prochaine révision. */
  dueAt: string;
  /** Intervalle actuel en jours. */
  interval: number;
};

export const MAX_STAGE = 5;

/**
 * Intervalles de révision espacée (en jours) par palier de maîtrise.
 * Courbe classique d'espacement croissant : 0 → 1 → 3 → 7 → 16 → 35.
 */
const INTERVALS = [0, 1, 3, 7, 16, 35];

export const todayKey = () => new Date().toISOString().slice(0, 10);

export function addDays(date: string, days: number) {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function newMemoryState(): MemoryState {
  return { stage: 0, streak: 0, lapses: 0, dueAt: todayKey(), interval: 0 };
}

/**
 * Met à jour l'état mémoire après une réponse.
 * Réussite → on monte d'un palier et l'intervalle s'allonge.
 * Erreur → on redescend (mais jamais en dessous du palier 1, le mot reste "vu")
 * et il est à revoir dès aujourd'hui.
 */
export function reviewWord(state: MemoryState | undefined, correct: boolean, today = todayKey()): MemoryState {
  const current = state ?? newMemoryState();
  if (correct) {
    const stage = Math.min(MAX_STAGE, current.stage + 1);
    const interval = INTERVALS[stage] ?? INTERVALS[INTERVALS.length - 1];
    return { stage, streak: current.streak + 1, lapses: current.lapses, interval, dueAt: addDays(today, interval) };
  }
  const stage = Math.max(1, current.stage - 1);
  return { stage, streak: 0, lapses: current.lapses + 1, interval: 0, dueAt: today };
}

/** Marque un mot comme simplement exposé (vu, pas encore testé). */
export function exposeWord(state: MemoryState | undefined, today = todayKey()): MemoryState {
  const current = state ?? newMemoryState();
  if (current.stage > 0) return current;
  return { ...current, stage: 1, interval: 0, dueAt: today };
}

/** Mots dont la révision est due aujourd'hui, les plus en retard d'abord. */
export function dueWordIds(memory: Record<string, MemoryState>, today = todayKey(), limit = 12) {
  return Object.entries(memory)
    .filter(([, state]) => state.dueAt <= today && state.stage > 0)
    .sort((a, b) => a[1].dueAt.localeCompare(b[1].dueAt) || a[1].stage - b[1].stage)
    .slice(0, limit)
    .map(([wordId]) => wordId);
}

/** Mots les plus fragiles (beaucoup d'erreurs, palier bas) : le "point faible" à retravailler. */
export function weakestWordIds(memory: Record<string, MemoryState>, limit = 5) {
  return Object.entries(memory)
    .filter(([, state]) => state.lapses > 0)
    .sort((a, b) => b[1].lapses - a[1].lapses || a[1].stage - b[1].stage)
    .slice(0, limit)
    .map(([wordId]) => wordId);
}

/** Pourcentage de maîtrise d'un ensemble de mots (sert aux barres de progression). */
export function masteryPercent(memory: Record<string, MemoryState>, wordIds: string[]) {
  if (!wordIds.length) return 0;
  const total = wordIds.reduce((sum, wordId) => sum + Math.min(MAX_STAGE, memory[wordId]?.stage ?? 0), 0);
  return Math.round((total / (wordIds.length * MAX_STAGE)) * 100);
}
