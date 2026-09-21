import * as Linking from "expo-linking";
import type { AcademicProgram } from "./academic";

// ============================================================
// SYSTÈME PREMIUM — Packs payants AmeriTalk
// Chaque pack est vendu via WhatsApp. Un message pré-rempli est
// envoyé au numéro de vente pour faciliter la conversion.
// ============================================================

/** Numéro WhatsApp de vente (format international sans le +). */
export const SALES_WHATSAPP = "261382114839";

/** Numéro affiché (format local lisible). */
export const SALES_PHONE_DISPLAY = "038 21 148 39";

export type PremiumPack = {
  id: AcademicProgram;
  title: string;
  subtitle: string;
  level: string;
  priceAriary: number;
  priceLabel: string;
  emoji: string;
  color: string;
  features: string[];
};

export type PremiumLesson = {
  id: string;
  chapterTitle: string;
  title: string;
  subtitle: string;
  duration: string;
  priceLabel: string;
  color: string;
};

/** Une seule leçon premium verrouillée par chapitre. */
export const PREMIUM_LESSONS: PremiumLesson[] = [
  { id: "premium-ch1", chapterTitle: "Chapitre 1", title: "Conversation Mastery", subtitle: "Parler avec naturel dans les situations réelles", duration: "20 min", priceLabel: "10.000 Ar", color: "#DDEBFF" },
  { id: "premium-ch2", chapterTitle: "Chapitre 2", title: "Advanced Grammar Lab", subtitle: "Maîtriser les structures intermédiaires", duration: "25 min", priceLabel: "20.000 Ar", color: "#FFE9D2" },
  { id: "premium-ch3", chapterTitle: "Chapitre 3", title: "Fluent English Challenge", subtitle: "Passer du cours à la conversation", duration: "30 min", priceLabel: "30.000 Ar", color: "#E4F6E8" },
];

const ACTIVATION_SECRET = "AMERITALK-ACTIVATION-2026";

export function normalizeCustomerPhone(phone: string): string {
  return phone.replace(/\s+/g, "").trim();
}

function activationHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).toUpperCase().padStart(8, "0").slice(-6);
}

function lessonCodePrefix(lessonId: string): string {
  return lessonId.replace("premium-", "").replace("ch", "C").toUpperCase();
}

/** Génère le code que l'admin peut envoyer au client après réception du paiement. */
export function generatePremiumCode(phone: string, lessonId: string): string {
  const normalizedPhone = normalizeCustomerPhone(phone);
  const checksum = activationHash(`${ACTIVATION_SECRET}|${normalizedPhone}|${lessonId}`);
  return `ATK-${lessonCodePrefix(lessonId)}-${checksum}`;
}

/** Vérifie le code saisi dans l'APK et renvoie la leçon correspondante. */
export function findPremiumLessonFromCode(phone: string, code: string): PremiumLesson | null {
  const normalizedCode = code.replace(/\s+/g, "").trim().toUpperCase();
  const normalizedPhone = normalizeCustomerPhone(phone);
  return PREMIUM_LESSONS.find((lesson) => generatePremiumCode(normalizedPhone, lesson.id) === normalizedCode) ?? null;
}

export const PREMIUM_PACKS: Record<AcademicProgram, PremiumPack> = {
  bepc: {
    id: "bepc",
    title: "Pack Anglais BEPC",
    subtitle: "Prépare ton BEPC avec confiance",
    level: "A1–A2 · Collège",
    priceAriary: 10000,
    priceLabel: "10.000 Ar",
    emoji: "🎓",
    color: "#DDEBFF",
    features: [
      "15 modules structurés",
      "Exercices interactifs",
      "Vocabulaire essentiel du BEPC",
      "Suivi de progression",
      "Accès à vie",
    ],
  },
  bac: {
    id: "bac",
    title: "Pack Anglais Baccalauréat",
    subtitle: "Réussis ton Bac avec méthode",
    level: "B1–B2 · Lycée",
    priceAriary: 20000,
    priceLabel: "20.000 Ar",
    emoji: "🎓",
    color: "#FFE9D2",
    features: [
      "20 modules avancés",
      "Grammaire et argumentation",
      "Compréhension écrite et orale",
      "Rédaction et essais guidés",
      "Suivi de progression",
      "Accès à vie",
    ],
  },
  university: {
    id: "university",
    title: "Pack Anglais Université",
    subtitle: "Anglais académique et professionnel",
    level: "B2–C1 · Académique",
    priceAriary: 30000,
    priceLabel: "30.000 Ar",
    emoji: "🎓",
    color: "#E4F6E8",
    features: [
      "25 modules experts",
      "Anglais académique (citations, résumés)",
      "Présentations et entretiens",
      "Emails professionnels",
      "Vocabulaire universitaire",
      "Suivi de progression",
      "Accès à vie",
    ],
  },
};

/** Construit le message WhatsApp pré-rempli pour un pack donné. */
export function buildWhatsAppMessage(pack: PremiumPack): string {
  return [
    "Bonjour AmeriTalk 👋",
    "",
    `Je souhaite acheter le ${pack.title} à ${pack.priceLabel}.`,
    "",
    "Pouvez-vous m'indiquer comment procéder pour le paiement ?",
    "",
    "Merci !",
  ].join("\n");
}

/** Ouvre WhatsApp avec le message pré-rempli pour un pack. */
export async function openWhatsAppForPack(pack: PremiumPack): Promise<void> {
  const message = encodeURIComponent(buildWhatsAppMessage(pack));
  const url = `https://wa.me/${SALES_WHATSAPP}?text=${message}`;
  try {
    await Linking.openURL(url);
  } catch {
    await Linking.openURL(`https://api.whatsapp.com/send?phone=${SALES_WHATSAPP}&text=${message}`);
  }
}

/** Formate un prix en Ariary (avec séparateur de milliers). */
export function formatAriary(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} Ar`;
}

export function buildWhatsAppLessonMessage(lesson: PremiumLesson): string {
  return [
    "Bonjour AmeriTalk 👋",
    "",
    `Je souhaite débloquer la leçon payante « ${lesson.title} » du ${lesson.chapterTitle}.`,
    `Prix indiqué : ${lesson.priceLabel}.`,
    "",
    "Pouvez-vous m'indiquer comment procéder au paiement et au déblocage ?",
    "",
    "Merci !",
  ].join("\n");
}

export async function openWhatsAppForLesson(lesson: PremiumLesson): Promise<void> {
  const message = encodeURIComponent(buildWhatsAppLessonMessage(lesson));
  const url = `https://wa.me/${SALES_WHATSAPP}?text=${message}`;
  try {
    await Linking.openURL(url);
  } catch {
    await Linking.openURL(`https://api.whatsapp.com/send?phone=${SALES_WHATSAPP}&text=${message}`);
  }
}

export async function openWhatsAppActivationMessage(phone: string, lesson: PremiumLesson, code: string): Promise<void> {
  const message = encodeURIComponent([
    "Bonjour, votre paiement AmeriTalk a été validé.",
    "",
    `Leçon activée : ${lesson.chapterTitle} — ${lesson.title}`,
    `Code d'activation : ${code}`,
    "",
    "Dans l'application, ouvrez Leçons premium, saisissez votre numéro WhatsApp et ce code, puis appuyez sur Activer.",
    "Conservez ce code. Il est lié à votre numéro.",
  ].join("\n"));
  const target = normalizeCustomerPhone(phone).replace(/^0/, "261");
  try {
    await Linking.openURL(`https://wa.me/${target}?text=${message}`);
  } catch {
    await Linking.openURL(`https://api.whatsapp.com/send?phone=${target}&text=${message}`);
  }
}
