import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dueWordIds, exposeWord, masteryPercent, reviewWord, weakestWordIds, type MemoryState } from "./srs";
import { findPremiumLessonFromCode } from "./premium";

const STORAGE_KEY = "ameritalk-progress-v3";
const LEGACY_STORAGE_KEY = "ameritalk-progress-v2";

// ---- Constantes du système de cœurs (façon Duolingo) ----
const MAX_HEARTS = 5;
const HEART_REFILL_MINUTES = 30; // 1 cœur toutes les 30 min

type Progress = {
  userProfile: { firstName: string; lastName: string } | null;
  registeredUsers: { firstName: string; lastName: string; registeredAt: string }[];
  completedLessons: string[];
  learnedWords: string[];
  favoriteWords: string[];
  mistakes: string[];
  reviewDueAt: Record<string, string>;
  memory: Record<string, MemoryState>;
  practiceDates: string[];
  xp: number;
  streak: number;
  dailyGoal: number;
  reminderEnabled: boolean;
  dailyActivities: number;
  lastPracticeDate: string;
  testScores: number[];
  pronunciationScores: number[];
  // ---- Nouveaux champs Duolingo ----
  hearts: number;
  maxHearts: number;
  lastHeartRefill: string; // ISO timestamp du dernier refill
  combo: number;            // combo actuel (remis à 0 à chaque erreur)
  bestCombo: number;        // meilleur combo jamais atteint
  authorizedPremiumLessons: Record<string, string[]>;
  activatedPremiumLessons: string[];
};

const initialProgress: Progress = {
  userProfile: null,
  registeredUsers: [],
  completedLessons: [],
  learnedWords: [],
  favoriteWords: [],
  mistakes: [],
  reviewDueAt: {},
  memory: {},
  practiceDates: [],
  xp: 0,
  streak: 1,
  dailyGoal: 5,
  reminderEnabled: false,
  dailyActivities: 0,
  lastPracticeDate: "",
  testScores: [],
  pronunciationScores: [],
  hearts: MAX_HEARTS,
  maxHearts: MAX_HEARTS,
  lastHeartRefill: new Date().toISOString(),
  combo: 0,
  bestCombo: 0,
  authorizedPremiumLessons: {},
  activatedPremiumLessons: [],
};

type AppStateValue = Progress & {
  hydrated: boolean;
  averageTestScore: number;
  averagePronunciationScore: number;
  dueReviewCount: number;
  dueWords: string[];
  weakWords: string[];
  // Indique si le joueur peut lancer une leçon (assez de cœurs)
  canPlay: boolean;
  // Temps restant avant le prochain cœur (en minutes), 0 si plein
  minutesUntilNextHeart: number;
  masteryOf: (wordIds: string[]) => number;
  recordAnswer: (wordId: string, correct: boolean) => void;
  exposeWordToUser: (wordId: string) => void;
  toggleFavorite: (wordId: string) => void;
  markWordLearned: (wordId: string) => void;
  markLessonComplete: (lessonId: string, wordIds: string[], xpReward?: number) => void;
  addMistake: (wordId: string) => void;
  recordPractice: (score: number, wordId?: string) => void;
  recordPronunciation: (score: number, wordId?: string) => void;
  recordTest: (score: number) => void;
  setReminderEnabled: (enabled: boolean) => void;
  // ---- Nouvelles méthodes Duolingo ----
  loseHeart: () => void;
  gainHeart: () => void;
  resetHearts: () => void;
  incrementCombo: () => void;
  resetCombo: () => void;
  refillHeartsIfNeeded: () => void;
  authorizePremiumLesson: (phone: string, lessonId: string) => void;
  revokePremiumLesson: (phone: string, lessonId: string) => void;
  activatePremiumCode: (phone: string, code: string) => string | null;
  registerUser: (firstName: string, lastName: string) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);
const todayKey = () => new Date().toISOString().slice(0, 10);
const addDays = (date: string, days: number) => {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
};

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [hydrated, setHydrated] = useState(false);

  // ---- Hydratation depuis AsyncStorage ----
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(async (value) => {
        const legacy = value ? null : await AsyncStorage.getItem(LEGACY_STORAGE_KEY);
        const source = value || legacy;
        if (source) {
          const saved = { ...initialProgress, ...JSON.parse(source) } as Progress;
          if (saved.lastPracticeDate !== todayKey()) saved.dailyActivities = 0;
          setProgress(saved);
        }
      })
      .catch(() => undefined)
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress)).catch(() => undefined);
  }, [progress, hydrated]);

  // ---- Auto-refill des cœurs (toutes les 30 min) ----
  useEffect(() => {
    if (!hydrated) return;
    const refill = () => {
      setProgress((current) => {
        if (current.hearts >= current.maxHearts) return current;
        const now = Date.now();
        const last = new Date(current.lastHeartRefill).getTime();
        const elapsed = now - last;
        const gained = Math.floor(elapsed / (HEART_REFILL_MINUTES * 60 * 1000));
        if (gained <= 0) return current;
        const newHearts = Math.min(current.maxHearts, current.hearts + gained);
        const newRefillTime = new Date(last + gained * HEART_REFILL_MINUTES * 60 * 1000).toISOString();
        return { ...current, hearts: newHearts, lastHeartRefill: newRefillTime };
      });
    };
    refill();
    const interval = setInterval(refill, 60 * 1000); // check toutes les minutes
    return () => clearInterval(interval);
  }, [hydrated]);

  const value = useMemo<AppStateValue>(() => {
    const average = (values: number[]) =>
      values.length ? Math.round(values.reduce((sum, score) => sum + score, 0) / values.length) : 0;

    const markActivity = (current: Progress, score: number) => {
      const today = todayKey();
      const practicedYesterday = current.lastPracticeDate === addDays(today, -1);
      const newDates = Array.from(new Set([...current.practiceDates, today])).slice(-30);
      return {
        ...current,
        dailyActivities: current.lastPracticeDate === today ? current.dailyActivities + 1 : 1,
        lastPracticeDate: today,
        practiceDates: newDates,
        streak: current.lastPracticeDate === today ? current.streak : practicedYesterday ? current.streak + 1 : 1,
        xp: current.xp + Math.max(2, Math.round(score / 10)),
      };
    };

    const dueReviewCount = Object.values(progress.reviewDueAt).filter((date) => date <= todayKey()).length;

    // Calcul du temps avant le prochain cœur
    const minutesUntilNextHeart = (() => {
      if (progress.hearts >= progress.maxHearts) return 0;
      const last = new Date(progress.lastHeartRefill).getTime();
      const elapsed = Date.now() - last;
      const remaining = HEART_REFILL_MINUTES * 60 * 1000 - (elapsed % (HEART_REFILL_MINUTES * 60 * 1000));
      return Math.max(0, Math.ceil(remaining / 60000));
    })();

    return {
      ...progress,
      hydrated,
      averageTestScore: average(progress.testScores),
      averagePronunciationScore: average(progress.pronunciationScores),
      dueReviewCount,
      dueWords: dueWordIds(progress.memory),
      weakWords: weakestWordIds(progress.memory),
      canPlay: progress.hearts > 0,
      minutesUntilNextHeart,

      masteryOf: (wordIds) => masteryPercent(progress.memory, wordIds),

      recordAnswer: (wordId, correct) =>
        setProgress((current) => {
          const next = reviewWord(current.memory[wordId], correct);
          return {
            ...markActivity(current, correct ? 100 : 0),
            memory: { ...current.memory, [wordId]: next },
            reviewDueAt: { ...current.reviewDueAt, [wordId]: next.dueAt },
            learnedWords: current.learnedWords.includes(wordId)
              ? current.learnedWords
              : [...current.learnedWords, wordId],
            mistakes: correct
              ? current.mistakes.filter((id) => id !== wordId || next.stage < 3)
              : Array.from(new Set([...current.mistakes, wordId])),
            // ⚡ Combo : +1 si correct, remis à 0 si erreur
            combo: correct ? current.combo + 1 : 0,
            bestCombo: correct ? Math.max(current.bestCombo, current.combo + 1) : current.bestCombo,
          };
        }),

      exposeWordToUser: (wordId) =>
        setProgress((current) => {
          const next = exposeWord(current.memory[wordId]);
          if (current.memory[wordId]?.stage === next.stage) return current;
          return {
            ...current,
            memory: { ...current.memory, [wordId]: next },
            learnedWords: current.learnedWords.includes(wordId)
              ? current.learnedWords
              : [...current.learnedWords, wordId],
          };
        }),

      toggleFavorite: (wordId) =>
        setProgress((current) => ({
          ...current,
          favoriteWords: current.favoriteWords.includes(wordId)
            ? current.favoriteWords.filter((id) => id !== wordId)
            : [...current.favoriteWords, wordId],
        })),

      markWordLearned: (wordId) =>
        setProgress((current) =>
          current.learnedWords.includes(wordId)
            ? current
            : {
                ...current,
                learnedWords: [...current.learnedWords, wordId],
                reviewDueAt: { ...current.reviewDueAt, [wordId]: addDays(todayKey(), 3) },
                xp: current.xp + 5,
              }
        ),

      markLessonComplete: (lessonId, wordIds, xpReward = 25) =>
        setProgress((current) =>
          current.completedLessons.includes(lessonId)
            ? current
            : {
                ...current,
                completedLessons: [...current.completedLessons, lessonId],
                learnedWords: Array.from(new Set([...current.learnedWords, ...wordIds])),
                reviewDueAt: {
                  ...current.reviewDueAt,
                  ...Object.fromEntries(wordIds.map((wordId) => [wordId, addDays(todayKey(), 3)])),
                },
                xp: current.xp + xpReward,
                streak: Math.max(1, current.streak),
              }
        ),

      addMistake: (wordId) =>
        setProgress((current) => ({
          ...current,
          mistakes: Array.from(new Set([...current.mistakes, wordId])),
          reviewDueAt: { ...current.reviewDueAt, [wordId]: todayKey() },
        })),

      recordPractice: (score, wordId) =>
        setProgress((current) => ({
          ...markActivity(current, score),
          pronunciationScores: current.pronunciationScores,
          mistakes:
            wordId && score < 70
              ? Array.from(new Set([...current.mistakes, wordId]))
              : current.mistakes,
        })),

      recordPronunciation: (score, wordId) =>
        setProgress((current) => ({
          ...markActivity(current, score),
          pronunciationScores: [...current.pronunciationScores, score].slice(-20),
          mistakes:
            wordId && score < 70
              ? Array.from(new Set([...current.mistakes, wordId]))
              : current.mistakes,
        })),

      recordTest: (score) =>
        setProgress((current) => ({
          ...markActivity(current, score),
          testScores: [...current.testScores, score].slice(-20),
        })),

      setReminderEnabled: (enabled) =>
        setProgress((current) => ({ ...current, reminderEnabled: enabled })),

      // ---- Nouvelles méthodes Duolingo ----
      loseHeart: () =>
        setProgress((current) => ({
          ...current,
          hearts: Math.max(0, current.hearts - 1),
          lastHeartRefill:
            current.hearts === current.maxHearts ? new Date().toISOString() : current.lastHeartRefill,
          combo: 0, // perdre un cœur casse le combo
        })),

      gainHeart: () =>
        setProgress((current) => ({
          ...current,
          hearts: Math.min(current.maxHearts, current.hearts + 1),
        })),

      resetHearts: () =>
        setProgress((current) => ({
          ...current,
          hearts: current.maxHearts,
          lastHeartRefill: new Date().toISOString(),
        })),

      incrementCombo: () =>
        setProgress((current) => {
          const newCombo = current.combo + 1;
          return {
            ...current,
            combo: newCombo,
            bestCombo: Math.max(current.bestCombo, newCombo),
          };
        }),

      resetCombo: () => setProgress((current) => ({ ...current, combo: 0 })),

      refillHeartsIfNeeded: () =>
        setProgress((current) => {
          if (current.hearts >= current.maxHearts) return current;
          const last = new Date(current.lastHeartRefill).getTime();
          const elapsed = Date.now() - last;
          const gained = Math.floor(elapsed / (HEART_REFILL_MINUTES * 60 * 1000));
          if (gained <= 0) return current;
          return {
            ...current,
            hearts: Math.min(current.maxHearts, current.hearts + gained),
            lastHeartRefill: new Date(last + gained * HEART_REFILL_MINUTES * 60 * 1000).toISOString(),
          };
        }),

      authorizePremiumLesson: (phone, lessonId) =>
        setProgress((current) => ({
          ...current,
          authorizedPremiumLessons: {
            ...current.authorizedPremiumLessons,
            [phone]: Array.from(new Set([...(current.authorizedPremiumLessons[phone] ?? []), lessonId])),
          },
        })),

      revokePremiumLesson: (phone, lessonId) =>
        setProgress((current) => ({
          ...current,
          authorizedPremiumLessons: {
            ...current.authorizedPremiumLessons,
            [phone]: (current.authorizedPremiumLessons[phone] ?? []).filter((id) => id !== lessonId),
          },
        })),

      activatePremiumCode: (phone, code) => {
        const lesson = findPremiumLessonFromCode(phone, code);
        if (!lesson) return null;
        setProgress((current) => ({
          ...current,
          authorizedPremiumLessons: {
            ...current.authorizedPremiumLessons,
            [phone]: Array.from(new Set([...(current.authorizedPremiumLessons[phone] ?? []), lesson.id])),
          },
          activatedPremiumLessons: Array.from(new Set([...current.activatedPremiumLessons, lesson.id])),
        }));
        return lesson.id;
      },

      registerUser: (firstName, lastName) =>
        setProgress((current) => {
          const cleanFirstName = firstName.trim();
          const cleanLastName = lastName.trim();
          if (!cleanFirstName || !cleanLastName) return current;
          const alreadyRegistered = current.registeredUsers.some(
            (user) => user.firstName.toLowerCase() === cleanFirstName.toLowerCase() && user.lastName.toLowerCase() === cleanLastName.toLowerCase()
          );
          return {
            ...current,
            userProfile: { firstName: cleanFirstName, lastName: cleanLastName },
            registeredUsers: alreadyRegistered
              ? current.registeredUsers
              : [...current.registeredUsers, { firstName: cleanFirstName, lastName: cleanLastName, registeredAt: new Date().toISOString() }],
          };
        }),
    };
  }, [progress, hydrated]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppStateContext);
  if (!value) throw new Error("useAppState must be used inside AppStateProvider");
  return value;
}
