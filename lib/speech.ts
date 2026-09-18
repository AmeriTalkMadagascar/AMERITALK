import * as Speech from "expo-speech";
import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import type { Voice } from "expo-speech";

// ============================================================
// VOICE FILES — Généré avec Edge TTS (voix Andrew, masculine)
// 117 fichiers MP3 dans assets/audio/voice/
// ============================================================
const VOICE_FILES: Record<string, number> = {
  // ---------- Leçon 1 : Greetings ----------
  "Good morning!": require("@/assets/audio/voice/ch1-l1-greeting-good-morning.mp3"),
  "Good afternoon!": require("@/assets/audio/voice/ch1-l1-greeting-good-afternoon.mp3"),
  "Good evening!": require("@/assets/audio/voice/ch1-l1-greeting-good-evening.mp3"),
  "Hi!": require("@/assets/audio/voice/ch1-l1-greeting-hi.mp3"),
  "Hello!": require("@/assets/audio/voice/ch1-l1-greeting-hello.mp3"),
  "How are you?": require("@/assets/audio/voice/ch1-l1-how-are-you.mp3"),
  "I am fine thanks": require("@/assets/audio/voice/ch1-l1-i-am-fine.mp3"),
  "And you?": require("@/assets/audio/voice/ch1-l1-and-you.mp3"),
  Monday: require("@/assets/audio/voice/ch1-l1-mon.mp3"),
  Tuesday: require("@/assets/audio/voice/ch1-l1-tue.mp3"),
  Wednesday: require("@/assets/audio/voice/ch1-l1-wed.mp3"),
  Thursday: require("@/assets/audio/voice/ch1-l1-thu.mp3"),
  Friday: require("@/assets/audio/voice/ch1-l1-fri.mp3"),
  Saturday: require("@/assets/audio/voice/ch1-l1-sat.mp3"),
  Sunday: require("@/assets/audio/voice/ch1-l1-sun.mp3"),

  // ---------- Leçon 2 : Asking somebody's name ----------
  "What's your name please?": require("@/assets/audio/voice/ch1-l2-whats-your-name.mp3"),
  "My name is Ericka. And you?": require("@/assets/audio/voice/ch1-l2-my-name-is.mp3"),
  "Nice to meet you": require("@/assets/audio/voice/ch1-l2-nice-to-meet.mp3"),
  "Nice to meet you too": require("@/assets/audio/voice/ch1-l2-nice-too.mp3"),
  "Where are you from?": require("@/assets/audio/voice/ch1-l2-where-from.mp3"),
  "I am from Mananara": require("@/assets/audio/voice/ch1-l2-i-am-from-mananara.mp3"),
  "Where do you live?": require("@/assets/audio/voice/ch1-l2-where-live.mp3"),
  "I live with my brother": require("@/assets/audio/voice/ch1-l2-i-live-with.mp3"),

  // ---------- Leçon 3 : Siblings, Direction & Stay ----------
  "How many brothers or sisters do you have?": require("@/assets/audio/voice/ch1-l3-how-many-siblings.mp3"),
  "I have one brother and two sisters": require("@/assets/audio/voice/ch1-l3-i-have-one.mp3"),
  "I am an only child": require("@/assets/audio/voice/ch1-l3-only-child.mp3"),
  "Where are you going now?": require("@/assets/audio/voice/ch1-l3-where-going.mp3"),
  "I am going to school": require("@/assets/audio/voice/ch1-l3-going-school.mp3"),
  "How long have you been living here?": require("@/assets/audio/voice/ch1-l3-how-long-living.mp3"),
  "For two years": require("@/assets/audio/voice/ch1-l3-two-years.mp3"),

  // ---------- Leçon 4 : Adjectives, TO HAVE & Goodbye ----------
  "To be stuffed": require("@/assets/audio/voice/ch1-l4-stuffed.mp3"),
  "To be lazy": require("@/assets/audio/voice/ch1-l4-lazy.mp3"),
  "To be angry with someone": require("@/assets/audio/voice/ch1-l4-angry.mp3"),
  "To be hungry": require("@/assets/audio/voice/ch1-l4-hungry.mp3"),
  "To be crazy": require("@/assets/audio/voice/ch1-l4-crazy.mp3"),
  "To be afraid of": require("@/assets/audio/voice/ch1-l4-afraid.mp3"),
  "I have four pens": require("@/assets/audio/voice/ch1-l4-i-have-four-pens.mp3"),
  "Do you have money?": require("@/assets/audio/voice/ch1-l4-do-you-have-money.mp3"),
  "She has five brothers": require("@/assets/audio/voice/ch1-l4-she-has-five-brothers.mp3"),
  "Talk to you later": require("@/assets/audio/voice/ch1-l4-talk-later.mp3"),
  "Take care": require("@/assets/audio/voice/ch1-l4-take-care.mp3"),
  "See you soon": require("@/assets/audio/voice/ch1-l4-see-you-soon.mp3"),
  "Come on in": require("@/assets/audio/voice/ch1-l4-come-on-in.mp3"),
  "Sit down please": require("@/assets/audio/voice/ch1-l4-sit-down.mp3"),
  "Have a nice trip": require("@/assets/audio/voice/ch1-l4-have-nice-trip.mp3"),
  "Drive safely": require("@/assets/audio/voice/ch1-l4-drive-safely.mp3"),

  // ---------- Leçon 5 : Weather & Family ----------
  Sun: require("@/assets/audio/voice/ch1-l5-sun.mp3"),
  Sunny: require("@/assets/audio/voice/ch1-l5-sunny.mp3"),
  Rain: require("@/assets/audio/voice/ch1-l5-rain.mp3"),
  Raining: require("@/assets/audio/voice/ch1-l5-raining.mp3"),
  Wind: require("@/assets/audio/voice/ch1-l5-wind.mp3"),
  Windy: require("@/assets/audio/voice/ch1-l5-windy.mp3"),
  Cloud: require("@/assets/audio/voice/ch1-l5-cloud.mp3"),
  Cloudy: require("@/assets/audio/voice/ch1-l5-cloudy.mp3"),
  Thunderbolts: require("@/assets/audio/voice/ch1-l5-thunder.mp3"),
  "To be cold": require("@/assets/audio/voice/ch1-l5-cold.mp3"),
  "To be hot": require("@/assets/audio/voice/ch1-l5-hot.mp3"),
  Fog: require("@/assets/audio/voice/ch1-l5-fog.mp3"),
  Hail: require("@/assets/audio/voice/ch1-l5-hail.mp3"),
  "She is my sister": require("@/assets/audio/voice/ch1-l5-sister.mp3"),
  "He is my brother": require("@/assets/audio/voice/ch1-l5-brother.mp3"),
  "She is my mother": require("@/assets/audio/voice/ch1-l5-mother.mp3"),
  "He is my father": require("@/assets/audio/voice/ch1-l5-father.mp3"),
  "She is my grandmother": require("@/assets/audio/voice/ch1-l5-grandmother.mp3"),
  "He is my grandfather": require("@/assets/audio/voice/ch1-l5-grandfather.mp3"),
  "He is my uncle": require("@/assets/audio/voice/ch1-l5-uncle.mp3"),
  "She is my aunt": require("@/assets/audio/voice/ch1-l5-aunt.mp3"),
  "He is my son": require("@/assets/audio/voice/ch1-l5-son.mp3"),
  "She is my daughter": require("@/assets/audio/voice/ch1-l5-daughter.mp3"),

  // ---------- Leçon 6 : Family (suite) & Numbers ----------
  "He is my husband": require("@/assets/audio/voice/ch1-l6-husband.mp3"),
  "She is my wife": require("@/assets/audio/voice/ch1-l6-wife.mp3"),
  "He is my boyfriend": require("@/assets/audio/voice/ch1-l6-boyfriend.mp3"),
  "She is my girlfriend": require("@/assets/audio/voice/ch1-l6-girlfriend.mp3"),
  "He is my friend": require("@/assets/audio/voice/ch1-l6-friend.mp3"),
  "She is my classmate": require("@/assets/audio/voice/ch1-l6-classmate.mp3"),
  "He is my neighbor": require("@/assets/audio/voice/ch1-l6-neighbor.mp3"),
  "He is my workmate": require("@/assets/audio/voice/ch1-l6-workmate.mp3"),
  Zero: require("@/assets/audio/voice/ch1-l6-zero.mp3"),
  One: require("@/assets/audio/voice/ch1-l6-one.mp3"),
  Two: require("@/assets/audio/voice/ch1-l6-two.mp3"),
  Three: require("@/assets/audio/voice/ch1-l6-three.mp3"),
  Four: require("@/assets/audio/voice/ch1-l6-four.mp3"),
  Five: require("@/assets/audio/voice/ch1-l6-five.mp3"),
  Six: require("@/assets/audio/voice/ch1-l6-six.mp3"),
  Seven: require("@/assets/audio/voice/ch1-l6-seven.mp3"),
  Eight: require("@/assets/audio/voice/ch1-l6-eight.mp3"),
  Nine: require("@/assets/audio/voice/ch1-l6-nine.mp3"),
  Ten: require("@/assets/audio/voice/ch1-l6-ten.mp3"),

  // ---------- Leçon 7 : Health & Simple Present ----------
  "I have a flu": require("@/assets/audio/voice/ch1-l7-flu.mp3"),
  "I have a fever": require("@/assets/audio/voice/ch1-l7-fever.mp3"),
  "I have a headache": require("@/assets/audio/voice/ch1-l7-headache.mp3"),
  "I have a toothache": require("@/assets/audio/voice/ch1-l7-toothache.mp3"),
  "I have a stomachache": require("@/assets/audio/voice/ch1-l7-stomachache.mp3"),
  "I have a sore throat": require("@/assets/audio/voice/ch1-l7-sore-throat.mp3"),
  "I study every day": require("@/assets/audio/voice/ch1-l7-study-every-day.mp3"),
  "She drinks alcohol every day": require("@/assets/audio/voice/ch1-l7-she-drinks.mp3"),
  "The sun rises in the east": require("@/assets/audio/voice/ch1-l7-sun-rises.mp3"),
  Always: require("@/assets/audio/voice/ch1-l7-always.mp3"),
  Often: require("@/assets/audio/voice/ch1-l7-often.mp3"),
  Sometimes: require("@/assets/audio/voice/ch1-l7-sometimes.mp3"),
  Usually: require("@/assets/audio/voice/ch1-l7-usually.mp3"),

  // ---------- Phrases modèles ----------
  "Hello, my name is Vanna.": require("@/assets/audio/voice/model-hello-vanna.mp3"),
  "I am from Mananara Nord.": require("@/assets/audio/voice/model-from-mananara.mp3"),
  "Nice to meet you, Erica.": require("@/assets/audio/voice/model-nice-erica.mp3"),
  "I study at Lycée Mananara Nord.": require("@/assets/audio/voice/model-study-lycee.mp3"),
  "Welcome to AmeriTalk!": require("@/assets/audio/voice/model-welcome-ameritalk.mp3"),
  "Could I have a coffee, please?": require("@/assets/audio/voice/model-coffee-please.mp3"),
  "Could I have some water?": require("@/assets/audio/voice/model-some-water.mp3"),
  "Can I see the menu, please?": require("@/assets/audio/voice/model-see-menu.mp3"),
  "Could we have the bill?": require("@/assets/audio/voice/model-have-bill.mp3"),
  "I am waiting for Vanna.": require("@/assets/audio/voice/model-waiting-vanna.mp3"),
  "She is from Analagnampotsy.": require("@/assets/audio/voice/model-she-from.mp3"),
  "I have a meeting at nine.": require("@/assets/audio/voice/model-meeting-nine.mp3"),
  "The deadline is Friday.": require("@/assets/audio/voice/model-deadline-friday.mp3"),
  "Let's review the project.": require("@/assets/audio/voice/model-review-project.mp3"),
  "I will send my feedback.": require("@/assets/audio/voice/model-send-feedback.mp3"),
  "We can improve the program.": require("@/assets/audio/voice/model-improve-program.mp3"),
};

// ============================================================
// VOIX TTS — Fallback avec expo-speech
// ============================================================
let voicePromise: Promise<Voice | undefined> | null = null;

async function findBestEnglishVoice(): Promise<Voice | undefined> {
  const voices = await Speech.getAvailableVoicesAsync();
  const english = voices.filter((voice) => /^en(-|_|$)/i.test(voice.language));
  if (!english.length) return undefined;
  return [...english].sort(
    (a, b) =>
      Number(b.quality === "Enhanced") - Number(a.quality === "Enhanced") ||
      Number(b.language === "en-US") - Number(a.language === "en-US")
  )[0];
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | undefined> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(undefined), ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(undefined);
      });
  });
}

export async function getNaturalEnglishVoice() {
  if (!voicePromise) voicePromise = findBestEnglishVoice().catch(() => undefined);
  return withTimeout(voicePromise, 1500);
}

// ============================================================
// PLAYER CACHE — Préchargement des MP3
// ============================================================
const playerCache = new Map<string, AudioPlayer>();

function getOrCreatePlayer(text: string): AudioPlayer | null {
  const key = text.trim();
  const cached = playerCache.get(key);
  if (cached) return cached;
  const source = VOICE_FILES[key];
  if (!source) return null;
  const player = createAudioPlayer(source);
  playerCache.set(key, player);
  return player;
}

/** Précharge les audios MP3 en cache (aucune lecture). */
export function preloadAudio(texts: string[]) {
  texts.forEach((text) => getOrCreatePlayer(text));
}

// ============================================================
// SPEAK — Lecture principale
// ============================================================
export async function speakNatural(text: string, slow = false) {
  const key = text.trim();
  const player = getOrCreatePlayer(key);

  // 1. Priorité : MP3 avec voix masculine Andrew
  if (player) {
    try {
      player.seekTo(0);
    } catch {
      // certains players ne sont pas encore prêts, on joue quand même
    }
    player.play();
    return;
  }

  // 2. Fallback : expo-speech
  await Speech.stop();
  const voice = await getNaturalEnglishVoice();
  await Speech.speak(text, {
    language: voice?.language || "en-US",
    voice: voice?.identifier,
    rate: slow ? 0.68 : 0.85,
    pitch: 0.85,
    useApplicationAudioSession: true,
  });
}

export async function stopNaturalSpeech() {
  await Speech.stop();
  playerCache.forEach((player) => {
    try {
      player.pause();
    } catch {
      // ignore
    }
  });
}