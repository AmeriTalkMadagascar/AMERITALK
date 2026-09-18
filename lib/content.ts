export type Level = "Beginner" | "Intermediate" | "Advanced";

// ============================================================
// NOUVELLE STRUCTURE : la phrase est l'unité d'apprentissage
// (comme Duolingo — on n'apprend JAMAIS un mot isolé)
// ============================================================

export type Word = {
  id: string;
  english: string;
  french: string;
  phonetic: string;
  example: string;
  level: Level;
};

export type Sentence = {
  id: string;
  english: string;           // "My name is Vanna."
  french: string;            // "Je m'appelle Vanna."
  tokens: string[];          // ["My", "name", "is", "Vanna."] pour reconstruire
  focusWord: string;         // le mot clé enseigné : "name"
  focusTranslation: string;  // sa traduction : "nom / prénom"
  focusPhonetic: string;     // sa phonétique : "/neym/"
  level: Level;
};

export type Lesson = {
  id: string;
  level: Level;
  title: string;
  subtitle: string;
  duration: string;
  color: string;
  sentences: Sentence[];     // ← au lieu de "words"
  /** Compatibility view for legacy vocabulary screens. */
  words: Word[];
  phrase: string;
  translation: string;
  dialogue: { speaker: string; text: string }[];
  grammar: string;
};

// Utilitaire : découpe une phrase en tokens
const t = (sentence: string): string[] =>
  sentence.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);

const baseLessons: Omit<Lesson, "words" | "phrase" | "translation">[] = [
  // ============================================================
  // LEÇON 1 — Welcome to Mananara
  // ============================================================
  {
    id: "1",
    level: "Beginner",
    title: "Welcome to Mananara",
    subtitle: "Se présenter et dire d'où l'on vient",
    duration: "10 min",
    color: "#DDEBFF",
    sentences: [
      {
        id: "1-1",
        english: "Hello, my name is Vanna.",
        french: "Bonjour, je m'appelle Vanna.",
        tokens: t("Hello, my name is Vanna."),
        focusWord: "name",
        focusTranslation: "nom / prénom",
        focusPhonetic: "/neym/",
        level: "Beginner",
      },
      {
        id: "1-2",
        english: "What is your name?",
        french: "Comment t'appelles-tu ?",
        tokens: t("What is your name?"),
        focusWord: "what",
        focusTranslation: "quoi / que",
        focusPhonetic: "/wot/",
        level: "Beginner",
      },
      {
        id: "1-3",
        english: "Nice to meet you, Erica.",
        french: "Enchanté(e), Erica.",
        tokens: t("Nice to meet you, Erica."),
        focusWord: "nice",
        focusTranslation: "agréable / enchanté(e)",
        focusPhonetic: "/nys/",
        level: "Beginner",
      },
      {
        id: "1-4",
        english: "I am from Analampenja.",
        french: "Je viens d'Analampenja.",
        tokens: t("I am from Analampenja."),
        focusWord: "from",
        focusTranslation: "de / depuis",
        focusPhonetic: "/from/",
        level: "Beginner",
      },
      {
        id: "1-5",
        english: "I study at Lycée Mananara Nord.",
        french: "J'étudie au Lycée Mananara Nord.",
        tokens: t("I study at Lycée Mananara Nord."),
        focusWord: "study",
        focusTranslation: "étudier",
        focusPhonetic: "/steu-di/",
        level: "Beginner",
      },
      {
        id: "1-6",
        english: "Welcome to AmeriTalk!",
        french: "Bienvenue chez AmeriTalk !",
        tokens: t("Welcome to AmeriTalk!"),
        focusWord: "welcome",
        focusTranslation: "bienvenue",
        focusPhonetic: "/wel-keum/",
        level: "Beginner",
      },
      {
        id: "1-7",
        english: "I am a student.",
        french: "Je suis étudiant(e).",
        tokens: t("I am a student."),
        focusWord: "student",
        focusTranslation: "étudiant(e)",
        focusPhonetic: "/steu-dent/",
        level: "Beginner",
      },
      {
        id: "1-8",
        english: "Where are you from?",
        french: "D'où viens-tu ?",
        tokens: t("Where are you from?"),
        focusWord: "where",
        focusTranslation: "où",
        focusPhonetic: "/wer/",
        level: "Beginner",
      },
    ],
    dialogue: [
      { speaker: "Erica", text: "Hello! Welcome to AmeriTalk. My name is Erica." },
      { speaker: "Vanna", text: "Hi Erica! I'm Vanna. Nice to meet you." },
      { speaker: "Erica", text: "Nice to meet you too. Where are you from?" },
      { speaker: "Vanna", text: "I'm from Analampenja. I study at Lycée Mananara Nord." },
      { speaker: "Fabiola", text: "Welcome Vanna! I'm Fabiola, the Young Teacher here." },
      { speaker: "Vanna", text: "Nice to meet you, Fabiola!" },
    ],
    grammar:
      "Pour se présenter : « My name is… » ou « I am… ». Pour dire d'où l'on vient : « I am from… ». Pour poser la question : « What is your name? » et « Where are you from? ». Mananara Nord se prononce « Mananaré Nord ».",
  },

  // ============================================================
  // LEÇON 2 — At CR Media Service
  // ============================================================
  {
    id: "2",
    level: "Beginner",
    title: "At CR Media Service",
    subtitle: "Commander poliment et attendre quelqu'un",
    duration: "12 min",
    color: "#FFE9D2",
    sentences: [
      {
        id: "2-1",
        english: "Could I have a coffee, please?",
        french: "Pourrais-je avoir un café, s'il vous plaît ?",
        tokens: t("Could I have a coffee, please?"),
        focusWord: "coffee",
        focusTranslation: "café",
        focusPhonetic: "/ko-fi/",
        level: "Beginner",
      },
      {
        id: "2-2",
        english: "Could I have some water?",
        french: "Pourrais-je avoir de l'eau ?",
        tokens: t("Could I have some water?"),
        focusWord: "water",
        focusTranslation: "eau",
        focusPhonetic: "/wo-ter/",
        level: "Beginner",
      },
      {
        id: "2-3",
        english: "Can I see the menu, please?",
        french: "Puis-je voir le menu, s'il vous plaît ?",
        tokens: t("Can I see the menu, please?"),
        focusWord: "menu",
        focusTranslation: "menu / carte",
        focusPhonetic: "/me-niu/",
        level: "Beginner",
      },
      {
        id: "2-4",
        english: "Could we have the bill?",
        french: "Pourrions-nous avoir l'addition ?",
        tokens: t("Could we have the bill?"),
        focusWord: "bill",
        focusTranslation: "addition / note",
        focusPhonetic: "/bil/",
        level: "Beginner",
      },
      {
        id: "2-5",
        english: "I am waiting for Vanna.",
        french: "J'attends Vanna.",
        tokens: t("I am waiting for Vanna."),
        focusWord: "waiting",
        focusTranslation: "attendre",
        focusPhonetic: "/wey-ting/",
        level: "Beginner",
      },
      {
        id: "2-6",
        english: "She is from Analagnampotsy.",
        french: "Elle vient d'Analagnampotsy.",
        tokens: t("She is from Analagnampotsy."),
        focusWord: "she",
        focusTranslation: "elle",
        focusPhonetic: "/shi/",
        level: "Beginner",
      },
      {
        id: "2-7",
        english: "Welcome to CR Media Service.",
        french: "Bienvenue au CR Media Service.",
        tokens: t("Welcome to CR Media Service."),
        focusWord: "service",
        focusTranslation: "service",
        focusPhonetic: "/ser-vis/",
        level: "Beginner",
      },
      {
        id: "2-8",
        english: "Anything else?",
        french: "Autre chose ?",
        tokens: t("Anything else?"),
        focusWord: "anything",
        focusTranslation: "quelque chose",
        focusPhonetic: "/e-ni-ting/",
        level: "Beginner",
      },
    ],
    dialogue: [
      { speaker: "Sanio", text: "Good morning! Welcome to CR Media Service." },
      { speaker: "Rasoa Be", text: "Hello Sanio! Could I have a coffee, please?" },
      { speaker: "Sanio", text: "Of course. Anything else?" },
      { speaker: "Rasoa Be", text: "Some water too, please. I'm waiting for Vanna." },
      { speaker: "Sanio", text: "She is from Analagnampotsy. She will be here soon." },
      { speaker: "Rasoa Be", text: "Perfect. Could we have the bill after the recording?" },
    ],
    grammar:
      "Pour demander poliment : « Could I have…? » ou « Can I see…? ». Ajoutez toujours « please ». Pour dire qu'on attend quelqu'un : « I am waiting for + nom ».",
  },

  // ============================================================
  // LEÇON 3 — At CFP ESAC
  // ============================================================
  {
    id: "3",
    level: "Intermediate",
    title: "At CFP ESAC",
    subtitle: "Parler de son travail et de ses projets",
    duration: "14 min",
    color: "#E4F6E8",
    sentences: [
      {
        id: "3-1",
        english: "I have a meeting at nine.",
        french: "J'ai une réunion à neuf heures.",
        tokens: t("I have a meeting at nine."),
        focusWord: "meeting",
        focusTranslation: "réunion",
        focusPhonetic: "/mi-ting/",
        level: "Intermediate",
      },
      {
        id: "3-2",
        english: "The deadline is Friday.",
        french: "La date limite est vendredi.",
        tokens: t("The deadline is Friday."),
        focusWord: "deadline",
        focusTranslation: "date limite",
        focusPhonetic: "/ded-layn/",
        level: "Intermediate",
      },
      {
        id: "3-3",
        english: "Let's review the project.",
        french: "Révisons le projet.",
        tokens: t("Let's review the project."),
        focusWord: "review",
        focusTranslation: "réviser / revoir",
        focusPhonetic: "/ri-viou/",
        level: "Intermediate",
      },
      {
        id: "3-4",
        english: "I will send my feedback.",
        french: "J'enverrai mes commentaires.",
        tokens: t("I will send my feedback."),
        focusWord: "feedback",
        focusTranslation: "retour / commentaires",
        focusPhonetic: "/fid-bak/",
        level: "Intermediate",
      },
      {
        id: "3-5",
        english: "We can improve the program.",
        french: "Nous pouvons améliorer le programme.",
        tokens: t("We can improve the program."),
        focusWord: "improve",
        focusTranslation: "améliorer",
        focusPhonetic: "/im-prouv/",
        level: "Intermediate",
      },
      {
        id: "3-6",
        english: "Welcome to CFP ESAC.",
        french: "Bienvenue au CFP ESAC.",
        tokens: t("Welcome to CFP ESAC."),
        focusWord: "training",
        focusTranslation: "formation",
        focusPhonetic: "/trey-ning/",
        level: "Intermediate",
      },
      {
        id: "3-7",
        english: "Our students are from Beryl and Ambitsika.",
        french: "Nos étudiants viennent de Beryl et Ambitsika.",
        tokens: t("Our students are from Beryl and Ambitsika."),
        focusWord: "students",
        focusTranslation: "étudiants",
        focusPhonetic: "/steu-dents/",
        level: "Intermediate",
      },
      {
        id: "3-8",
        english: "Good idea. Let's start now.",
        french: "Bonne idée. Commençons maintenant.",
        tokens: t("Good idea. Let's start now."),
        focusWord: "idea",
        focusTranslation: "idée",
        focusPhonetic: "/ay-dia/",
        level: "Intermediate",
      },
    ],
    dialogue: [
      { speaker: "Frederic", text: "Good morning! Welcome to CFP ESAC." },
      { speaker: "Charles Winner", text: "Thank you Frederic. I have a meeting at nine." },
      { speaker: "Frederic", text: "Perfect. Let's review the project before the deadline." },
      { speaker: "Charles Winner", text: "Good idea. I will send my feedback this afternoon." },
      { speaker: "Frederic", text: "We can improve the program with your insights." },
      { speaker: "Charles Winner", text: "Our students are from Beryl and Ambitsika. They need it." },
    ],
    grammar:
      "« Let's + verb » = proposition d'action ensemble : « Let's review » = « Révisons ». Pour parler du futur proche : « I will + verb ». Pour mentionner l'origine : « from + lieu ».",
  },

  // ============================================================
  // LEÇON 4 — At Sainte-Jeanne-d'Arc
  // ============================================================
  {
    id: "4",
    level: "Advanced",
    title: "At Sainte-Jeanne-d'Arc",
    subtitle: "Nuancer son opinion",
    duration: "15 min",
    color: "#F1E4FF",
    sentences: [
      {
        id: "4-1",
        english: "Although the task is challenging, this approach is promising.",
        french: "Même si la tâche est difficile, cette approche est prometteuse.",
        tokens: t("Although the task is challenging, this approach is promising."),
        focusWord: "although",
        focusTranslation: "bien que / même si",
        focusPhonetic: "/ol-dow/",
        level: "Advanced",
      },
      {
        id: "4-2",
        english: "However, we need more data.",
        french: "Cependant, nous avons besoin de plus de données.",
        tokens: t("However, we need more data."),
        focusWord: "however",
        focusTranslation: "cependant",
        focusPhonetic: "/haw-e-ver/",
        level: "Advanced",
      },
      {
        id: "4-3",
        english: "This approach works well.",
        french: "Cette approche fonctionne bien.",
        tokens: t("This approach works well."),
        focusWord: "approach",
        focusTranslation: "approche",
        focusPhonetic: "/e-prouch/",
        level: "Advanced",
      },
      {
        id: "4-4",
        english: "Your insight is valuable.",
        french: "Ton point de vue est précieux.",
        tokens: t("Your insight is valuable."),
        focusWord: "insight",
        focusTranslation: "point de vue / aperçu",
        focusPhonetic: "/in-sayt/",
        level: "Advanced",
      },
      {
        id: "4-5",
        english: "The students at Sainte-Jeanne-d'Arc succeed.",
        french: "Les étudiants de Sainte-Jeanne-d'Arc réussissent.",
        tokens: t("The students at Sainte-Jeanne-d'Arc succeed."),
        focusWord: "succeed",
        focusTranslation: "réussir",
        focusPhonetic: "/seuk-sid/",
        level: "Advanced",
      },
      {
        id: "4-6",
        english: "The results at La Renommée are promising.",
        french: "Les résultats à La Renommée sont prometteurs.",
        tokens: t("The results at La Renommée are promising."),
        focusWord: "results",
        focusTranslation: "résultats",
        focusPhonetic: "/ri-zeults/",
        level: "Advanced",
      },
      {
        id: "4-7",
        english: "Every student deserves it.",
        french: "Chaque étudiant le mérite.",
        tokens: t("Every student deserves it."),
        focusWord: "deserves",
        focusTranslation: "mérite",
        focusPhonetic: "/di-zeurvz/",
        level: "Advanced",
      },
      {
        id: "4-8",
        english: "From Androkaroka to La Renommée, we can do it.",
        french: "D'Androkaroka à La Renommée, nous pouvons le faire.",
        tokens: t("From Androkaroka to La Renommée, we can do it."),
        focusWord: "can",
        focusTranslation: "pouvoir",
        focusPhonetic: "/kan/",
        level: "Advanced",
      },
    ],
    dialogue: [
      { speaker: "Rasoa Be", text: "The first results at Sainte-Jeanne-d'Arc are encouraging." },
      { speaker: "Erica", text: "Although the task is challenging, this approach is promising." },
      { speaker: "Rasoa Be", text: "I agree. However, we need more data before deciding." },
      { speaker: "Erica", text: "You're right. From Androkaroka to La Renommée, every student deserves it." },
      { speaker: "Vanna", text: "Your insight is valuable, Rasoa Be. Thank you for sharing it." },
    ],
    grammar:
      "« Although » introduit une concession (même si…). « However » oppose deux idées entre deux phrases (cependant…). Ces deux mots rendent ton anglais plus nuancé et plus professionnel.",
  },
];

export const lessons: Lesson[] = baseLessons.map((lesson) => {
  const words: Word[] = lesson.sentences.map((sentence) => ({
    id: sentence.id,
    english: sentence.focusWord,
    french: sentence.focusTranslation,
    phonetic: sentence.focusPhonetic,
    example: sentence.english,
    level: sentence.level,
  }));
  return {
    ...lesson,
    words,
    phrase: lesson.sentences[0]?.english ?? "",
    translation: lesson.sentences[0]?.french ?? "",
  };
});

export const situations = [
  { title: "At the airport", icon: "✈", color: "#DDEBFF", detail: "Check-in, gate, luggage" },
  { title: "At the hotel", icon: "⌂", color: "#E4F6E8", detail: "Booking, room, requests" },
  { title: "Job interview", icon: "▣", color: "#FFE9D2", detail: "Questions & answers" },
  { title: "Talking to friends", icon: "☻", color: "#F1E4FF", detail: "Everyday conversations" },
];

// Compat : certains fichiers utilisent encore "words" — on expose les phrases à plat
export const allSentences = lessons.flatMap((lesson) => lesson.sentences);

// ⚠️ Compat temporaire : anciens imports "allWords" / "words"
// Ces exports seront supprimés quand tous les fichiers seront migrés.
export const allWords = allSentences.map((s) => ({
  id: s.id,
  english: s.english,
  french: s.french,
  phonetic: s.focusPhonetic,
  example: s.english,
  level: s.level,
}));