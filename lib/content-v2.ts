// lib/content-v2.ts
import { lesson3PdfPages, niv2PdfPages, type PdfPage } from "./pdf-content";
import { levelAStructuredLessons } from "./levela-structured-lessons";
import { niv2StructuredLessons } from "./niv2-structured-lessons";
import { niv3StructuredLessons } from "./niv3-structured-lessons";
import { premiumStructuredLessons } from "./premium-content";
// ============================================================
// CONTENU V2 — Chapitres / Leçons / Cartes (façon Duolingo)
// Contenu 100% basé sur les PDFs officiels AmeriTalk
// Chapitre 1 : LEVEL A (A1–A2)
// ============================================================

export type ContentCard = {
  id: string;
  type: "explanation" | "formula" | "examples" | "vocabulary" | "note";
  title: string;
  malagasyExplanation?: string;
  englishTitle?: string;
  formula?: string;
  content?: string;
  remarks?: string[];
  sourceExamples?: string[];
  examples?: { english: string; malagasy: string; example?: string }[];
};

export type LessonV2 = {
  id: string;
  chapterId: string;
  title: string;
  subtitle: string;
  duration: string;
  cards: ContentCard[];
  sourcePages?: PdfPage[];
};

export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  color: string;
  emoji: string;
  lessons: LessonV2[];
};

// ============================================================
// CHAPITRE 1 — LEVEL A
// ============================================================
export const chapters: Chapter[] = [
  {
    id: "ch1",
    title: "Chapitre 1",
    subtitle: "Level A — Les bases",
    level: "A1–A2",
    color: "#DDEBFF",
    emoji: "📘",
    lessons: [
      // ===== LEÇON 1 — Greetings =====
      {
        id: "ch1-l1",
        chapterId: "ch1",
        title: "Greetings",
        subtitle: "Fiarahabana",
        duration: "8 min",
        cards: [
          {
            id: "ch1-l1-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "GREETINGS",
            malagasyExplanation:
              "Rehefa mifanena amin'olona ianao dia misy fiarahabana samihafa: " +
              "Good morning (maraina), Good afternoon (tolakandro), Good evening (hariva), " +
              "Hi / Hello (tsy officiel).",
          },
          {
            id: "ch1-l1-c2",
            type: "examples",
            title: "Ohatra",
            examples: [
              { english: "Good morning!", malagasy: "Manao ahoana ny maraina!" },
              { english: "Good afternoon!", malagasy: "Manao ahoana ny tolakandro!" },
              { english: "Good evening!", malagasy: "Manao ahoana ny hariva!" },
              { english: "Hi!", malagasy: "Salama!" },
              { english: "How are you?", malagasy: "Manao ahoana ianao?" },
              { english: "I am fine thanks", malagasy: "Salama tsara fa misaotra" },
              { english: "And you?", malagasy: "Ary ianao?" },
            ],
          },
          {
            id: "ch1-l1-c3",
            type: "examples",
            title: "Andro amin'ny herinandro",
            examples: [
              { english: "Monday", malagasy: "Alatsinainy" },
              { english: "Tuesday", malagasy: "Talata" },
              { english: "Wednesday", malagasy: "Alarobia" },
              { english: "Thursday", malagasy: "Alakamisy" },
              { english: "Friday", malagasy: "Zoma" },
              { english: "Saturday", malagasy: "Asabotsy" },
              { english: "Sunday", malagasy: "Alahady" },
            ],
          },
        ],
      },

      // ===== LEÇON 2 — Asking somebody's name =====
      {
        id: "ch1-l2",
        chapterId: "ch1",
        title: "Asking somebody's name",
        subtitle: "Manontany anarana",
        duration: "10 min",
        cards: [
          {
            id: "ch1-l2-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "ASKING SOMEBODY'S NAME",
            malagasyExplanation:
              "Rehefa te hahafantatra ny anaran'olona ianao dia mampiasa " +
              "\"What's your name please?\" na \"Can I have your name please?\".",
          },
          {
            id: "ch1-l2-c2",
            type: "examples",
            title: "Ohatra",
            examples: [
              { english: "What's your name please?", malagasy: "Iza anaranao tompoko?" },
              { english: "My name is Ericka. And you?", malagasy: "Ericka ny anarako. Ary ianao?" },
              { english: "Nice to meet you", malagasy: "Faly mahafantatra anao aho" },
              { english: "Nice to meet you too", malagasy: "Izaho koa faly" },
              { english: "Where are you from?", malagasy: "Avy aiza ianao?" },
              { english: "I am from Mananara", malagasy: "Avỳ Mananara aho" },
              { english: "Where do you live?", malagasy: "Aiza ianao mipetraka?" },
              { english: "I live with my brother", malagasy: "Miaraka amin'ny rahalahiko aho" },
            ],
          },
        ],
      },

      // ===== LEÇON 3 — Siblings + Direction + Stay =====
      {
        id: "ch1-l3",
        chapterId: "ch1",
        title: "Siblings, Direction & Stay",
        subtitle: "Mpiray tampo, làlana sy fipetrahana",
        duration: "12 min",
        cards: [
          {
            id: "ch1-l3-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "ASKING SB IF THEY HAVE SIBLINGS",
            malagasyExplanation:
              "Rehefa manontany raha manana mpiray tampo ny olona ianao dia mampiasa " +
              "\"How many brothers or sisters do you have?\".",
          },
          {
            id: "ch1-l3-c2",
            type: "examples",
            title: "Ohatra",
            examples: [
              { english: "How many brothers or sisters do you have?", malagasy: "Firy mpiray tampo aminao?" },
              { english: "I have one brother and two sisters", malagasy: "Manana rahalahy iray sy anabavy roa aho" },
              { english: "I am an only child", malagasy: "Zaza tokana aho" },
              { english: "Where are you going now?", malagasy: "Andeha aiza ianao izao?" },
              { english: "I am going to school", malagasy: "Mankany an-tsekoly aho" },
              { english: "How long have you been living here?", malagasy: "Efa hafiriana ianao no mipetraka eto?" },
              { english: "For two years", malagasy: "Efa roa taona" },
            ],
          },
          {
            id: "ch1-l3-c3",
            type: "formula",
            title: "To be",
            formula:
              "AFF : I am / You are / He is / She is / We are / They are\n" +
              "INT : Am I? / Are you? / Is he? / Are they?\n" +
              "NEG : I am not / You aren't / He isn't / They aren't",
          },
        ],
      },

      // ===== LEÇON 4 — Adjectives + TO HAVE + Goodbye =====
      {
        id: "ch1-l4",
        chapterId: "ch1",
        title: "Adjectives, TO HAVE & Goodbye",
        subtitle: "Adjectifs, manana, veloma",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l4-c1",
            type: "examples",
            title: "Adjectifs",
            examples: [
              { english: "To be stuffed", malagasy: "Voky" },
              { english: "To be lazy", malagasy: "Kamo" },
              { english: "To be angry with sb", malagasy: "Tezitra amin'olona" },
              { english: "To be hungry", malagasy: "Noana" },
              { english: "To be crazy", malagasy: "Adala" },
              { english: "To be afraid of", malagasy: "Matahotra" },
            ],
          },
          {
            id: "ch1-l4-c2",
            type: "formula",
            title: "TO HAVE — Manana",
            formula:
              "AFF : I have / He has / She has / We have / They have\n" +
              "INT : Do I have? / Does he have? / Do they have?\n" +
              "NEG : I don't have / He doesn't have / They don't have",
          },
          {
            id: "ch1-l4-c3",
            type: "examples",
            title: "Ohatra TO HAVE",
            examples: [
              { english: "I have four pens", malagasy: "Manana penina efatra aho" },
              { english: "Do you have money?", malagasy: "Manana vola ve ianao?" },
              { english: "She has five brothers", malagasy: "Manana rahalahy dimy izy" },
            ],
          },
          {
            id: "ch1-l4-c4",
            type: "examples",
            title: "Veloma sy fandraisana",
            examples: [
              { english: "Talk to you later", malagasy: "Hiresaka eto aoriana" },
              { english: "Take care", malagasy: "Mitandrema" },
              { english: "See you soon", malagasy: "Hifankahita tsy ho ela" },
              { english: "Come on in", malagasy: "Midira" },
              { english: "Sit down please", malagasy: "Mipetraha azafady" },
              { english: "Have a nice trip", malagasy: "Ho tsara ny dianao" },
              { english: "Drive safely", malagasy: "Mitondra fiara am-pilaminana" },
            ],
          },
        ],
      },

      // ===== LEÇON 5 — Weather + Family =====
      {
        id: "ch1-l5",
        chapterId: "ch1",
        title: "Weather & Family",
        subtitle: "Toetrandro sy fianakaviana",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l5-c1",
            type: "examples",
            title: "Toetrandro",
            examples: [
              { english: "Sun / Sunny", malagasy: "Masoandro / Mamirapiratra" },
              { english: "Rain / Raining", malagasy: "Orana / Manorana" },
              { english: "Wind / Windy", malagasy: "Rivotra / Mamiratra amin'ny rivotra" },
              { english: "Cloud / Cloudy", malagasy: "Rahona / Mandrahona" },
              { english: "Thunderbolts", malagasy: "Varatra" },
              { english: "To be cold", malagasy: "Mangatsiaka" },
              { english: "To be hot", malagasy: "Mafana" },
              { english: "Fog", malagasy: "Zavona" },
              { english: "Hail", malagasy: "Avandra" },
            ],
          },
          {
            id: "ch1-l5-c2",
            type: "examples",
            title: "Fianakaviana",
            examples: [
              { english: "She is my sister", malagasy: "Anabaviko izy" },
              { english: "He is my brother", malagasy: "Rahalahiko izy" },
              { english: "She is my mother", malagasy: "Mamako izy" },
              { english: "He is my father", malagasy: "Papako izy" },
              { english: "She is my grandmother", malagasy: "Dadiko izy" },
              { english: "He is my grandfather", malagasy: "Dadahiko izy" },
              { english: "He is my uncle", malagasy: "Tonton-ko izy" },
              { english: "She is my aunt", malagasy: "Tantinko izy" },
              { english: "He is my son", malagasy: "Zanakolahiko izy" },
              { english: "She is my daughter", malagasy: "Zanako vavy izy" },
            ],
          },
        ],
      },

      // ===== LEÇON 6 — Family (suite) + Numbers =====
      {
        id: "ch1-l6",
        chapterId: "ch1",
        title: "Family (suite) & Numbers",
        subtitle: "Fianakaviana sy isa",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l6-c1",
            type: "examples",
            title: "Fianakaviana (fanohizana)",
            examples: [
              { english: "He is my husband", malagasy: "Vadiko lahy izy" },
              { english: "She is my wife", malagasy: "Vadiko vavy izy" },
              { english: "He is my boyfriend", malagasy: "Sipako lahy izy" },
              { english: "She is my girlfriend", malagasy: "Sipako vavy izy" },
              { english: "He is my friend", malagasy: "Namako izy" },
              { english: "She is my classmate", malagasy: "Mpiara-mianatra amiko izy" },
              { english: "He is my neighbor", malagasy: "Mpifanolobo-dirindrina amiko izy" },
              { english: "He is my workmate", malagasy: "Mpiara-miasa amiko izy" },
            ],
          },
          {
            id: "ch1-l6-c2",
            type: "examples",
            title: "Cardinal numbers 0-12",
            examples: [
              { english: "0 = Zero", malagasy: "Aotra" },
              { english: "1 = One", malagasy: "Iray" },
              { english: "2 = Two", malagasy: "Roa" },
              { english: "3 = Three", malagasy: "Telo" },
              { english: "4 = Four", malagasy: "Efatra" },
              { english: "5 = Five", malagasy: "Dimy" },
              { english: "6 = Six", malagasy: "Enina" },
              { english: "7 = Seven", malagasy: "Fito" },
              { english: "8 = Eight", malagasy: "Valo" },
              { english: "9 = Nine", malagasy: "Sivy" },
              { english: "10 = Ten", malagasy: "Folo" },
              { english: "11 = Eleven", malagasy: "Iraika ambin'ny folo" },
              { english: "12 = Twelve", malagasy: "Roa ambin'ny folo" },
            ],
          },
          {
            id: "ch1-l6-c3",
            type: "examples",
            title: "Dizaines et grands nombres",
            examples: [
              { english: "20 = Twenty", malagasy: "Roapolo" },
              { english: "30 = Thirty", malagasy: "Tolopolo" },
              { english: "40 = Forty", malagasy: "Efapolo" },
              { english: "50 = Fifty", malagasy: "Dimampolo" },
              { english: "60 = Sixty", malagasy: "Enimpolo" },
              { english: "70 = Seventy", malagasy: "Fitopolo" },
              { english: "80 = Eighty", malagasy: "Valopolo" },
              { english: "90 = Ninety", malagasy: "Sivifolo" },
              { english: "100 = One hundred", malagasy: "Zato" },
              { english: "1000 = One thousand", malagasy: "Arivo" },
              { english: "1,000,000 = One million", malagasy: "Tapitrisa" },
            ],
          },
          {
            id: "ch1-l6-c4",
            type: "examples",
            title: "Ordinal numbers 1st-10th",
            examples: [
              { english: "1st = First", malagasy: "Voalohany" },
              { english: "2nd = Second", malagasy: "Faharoa" },
              { english: "3rd = Third", malagasy: "Fahatelo" },
              { english: "4th = Fourth", malagasy: "Fahefatra" },
              { english: "5th = Fifth", malagasy: "Fahadimy" },
              { english: "6th = Sixth", malagasy: "Fahaenina" },
              { english: "7th = Seventh", malagasy: "Fahafito" },
              { english: "8th = Eighth", malagasy: "Fahavalo" },
              { english: "9th = Ninth", malagasy: "Fahasivy" },
              { english: "10th = Tenth", malagasy: "Fahafolo" },
            ],
          },
        ],
      },

      // ===== LEÇON 7 — Health + Simple Present =====
      {
        id: "ch1-l7",
        chapterId: "ch1",
        title: "Health & Simple Present",
        subtitle: "Fahasalamana sy présent simple",
        duration: "16 min",
        cards: [
          {
            id: "ch1-l7-c1",
            type: "examples",
            title: "Aretina",
            examples: [
              { english: "I have a flu", malagasy: "Azontsery aho" },
              { english: "I have a fever", malagasy: "Azontazona aho" },
              { english: "I have a headache", malagasy: "Marary loha aho" },
              { english: "I have a toothache", malagasy: "Marary nify aho" },
              { english: "I have a stomachache", malagasy: "Marary kibo aho" },
              { english: "I have a sore throat", malagasy: "Marary tentako" },
            ],
          },
          {
            id: "ch1-l7-c2",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "SIMPLE PRESENT TENSE",
            malagasyExplanation:
              "Ny simple present dia ampiasaina rehefa miresaka momba: " +
              "(1) zavatra miverimberina, (2) fahamarinana ankapobeny, " +
              "(3) fahazarana, (4) zavatra maharitra.",
          },
          {
            id: "ch1-l7-c3",
            type: "formula",
            title: "Simple Present — Formule",
            formula:
              "AFF : S + V(s/es) + O\n" +
              "INT : Do/Does + S + V + O?\n" +
              "NEG : S + don't/doesn't + V + O",
          },
          {
            id: "ch1-l7-c4",
            type: "note",
            title: "Règle du -s / -es",
            malagasyExplanation:
              "1) ch, ss, sh, x, o, z → +es (go → goes)\n" +
              "2) C+Y → +ies (study → studies)\n" +
              "3) V+Y → +s (play → plays)\n" +
              "4) Sinon → +s (drink → drinks)",
          },
          {
            id: "ch1-l7-c5",
            type: "examples",
            title: "Ohatra Simple Present",
            examples: [
              { english: "I study every day", malagasy: "Mianatra isan'andro aho" },
              { english: "She drinks alcohol every day", malagasy: "Misotro toaka isan'andro izy" },
              { english: "The sun rises in the east", malagasy: "Miposaka any atsinanana ny masoandro" },
              { english: "Do you go to church every Sunday?", malagasy: "Mandeha am-piangonana isan'Alahady ve ianao?" },
              { english: "Always", malagasy: "Mandrakariva" },
              { english: "Often", malagasy: "Matetika" },
              { english: "Sometimes", malagasy: "Indraindray" },
              { english: "Usually", malagasy: "Matetika" },
            ],
          },
        ],
      },

      // ============================================================
      // ===== LEÇON 8 — Simple Present practice + Opinion =====
      // ============================================================
      {
        id: "ch1-l8",
        chapterId: "ch1",
        title: "Practice & Opinion",
        subtitle: "Fanazaran-tena sy hevitra",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l8-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "PRACTICE OF SIMPLE PRESENT TENSE",
            malagasyExplanation:
              "Ato amin'ity lesona ity dia hianatra ny matoanteny ampiasaina " +
              "amin'ny fiainana andavanandro ianao: mifoha, misasa, " +
              "mihinana sakafo maraina, mandeha mianatra...",
          },
          {
            id: "ch1-l8-c2",
            type: "examples",
            title: "Routine ny maraina",
            examples: [
              { english: "To wake up", malagasy: "Mifoha" },
              { english: "To get up", malagasy: "Mifoha" },
              { english: "To wash one's face", malagasy: "Misafo" },
              { english: "To go to the bathroom", malagasy: "Mandeha mandro" },
              { english: "To take a bath / shower", malagasy: "Mandro" },
              { english: "To comb one's hair", malagasy: "Mihogo volo" },
              { english: "To brush one's teeth", malagasy: "Mibrosse nify" },
              { english: "To light one fire", malagasy: "Mamelona afo" },
              { english: "To do the dishes", malagasy: "Manasa lasety" },
              { english: "To cook breakfast", malagasy: "Mahandro sakafo maraina" },
            ],
          },
          {
            id: "ch1-l8-c3",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "EXPRESSING OPINION",
            malagasyExplanation:
              "Rehefa milaza hevitra ianao dia misy fomba maro: " +
              "\"In my opinion\" (Araka ny hevitro), \"I feel that\", " +
              "\"From my perspective\", \"In my point of view\", " +
              "\"I reckon that\", \"As for me\", \"As I see it\".",
          },
          {
            id: "ch1-l8-c4",
            type: "examples",
            title: "Milaza hevitra",
            examples: [
              { english: "In my opinion", malagasy: "Araka ny hevitro" },
              { english: "I feel that", malagasy: "Mahatsapa aho fa" },
              { english: "From my perspective", malagasy: "Araka ny fijeriko" },
              { english: "In my point of view", malagasy: "Araka ny hevitro" },
              { english: "I reckon that", malagasy: "Hevitro fa" },
              { english: "As for me", malagasy: "Raha izaho" },
              { english: "As I see it", malagasy: "Araka ny hitako" },
            ],
          },
          {
            id: "ch1-l8-c5",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "ADJECTIVES + GOOD / BAD",
            malagasyExplanation:
              "Misy fomba fiteny manokana amin'ny adjectif \"good\" sy \"bad\":\n" +
              "• To be good for someone → Tsara @ olona\n" +
              "• To be good at + Ving → Mahay\n" +
              "• To be bad at + (n) / to+Vinf → Tsy mahay\n" +
              "• To be difficult for someone → Sarotra @ olona\n" +
              "• To be easy for someone → Mora @ olona",
          },
          {
            id: "ch1-l8-c6",
            type: "examples",
            title: "Ohatra",
            examples: [
              { english: "English is good for me", malagasy: "Tsara amiko ny anglisy" },
              { english: "I am good at cooking", malagasy: "Mahay mahandro aho" },
              { english: "He is bad at French", malagasy: "Tsy mahay frantsay izy" },
              { english: "English is difficult for me", malagasy: "Sarotra amiko ny anglisy" },
              { english: "It's easy for her to speak English", malagasy: "Mora aminy ny miteny anglisy" },
            ],
          },
          {
            id: "ch1-l8-c7",
            type: "examples",
            title: "What do you do in your spare time?",
            examples: [
              { english: "In my spare time", malagasy: "Amin'ny fotoana malalaka" },
              { english: "To visit one's friend", malagasy: "Mamangy namana" },
              { english: "To go for a walk with friends", malagasy: "Mitsangatsangana miaraka amin'ny namana" },
              { english: "To surf on FB", malagasy: "Manao Facebook" },
              { english: "To stay at home", malagasy: "Mipetraka an-trano" },
              { english: "To read a book", malagasy: "Mamaky boky" },
              { english: "To watch TV", malagasy: "Mijery télé" },
            ],
          },
        ],
      },

      // ============================================================
      // ===== LEÇON 9 — Present Progressive =====
      // ============================================================
      {
        id: "ch1-l9",
        chapterId: "ch1",
        title: "Present Progressive",
        subtitle: "Présent continu",
        duration: "12 min",
        cards: [
          {
            id: "ch1-l9-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "PRESENT PROGRESSIVE TENSE",
            malagasyExplanation:
              "Ny present progressive (na present continuous) dia ampiasaina " +
              "rehefa miresaka zavatra mitranga amin'izao fotoana izao, " +
              "zavatra vonjimaika, na drafi-piaraha-miasa ho avy.",
          },
          {
            id: "ch1-l9-c2",
            type: "formula",
            title: "Formule",
            formula:
              "AFF : S + am/is/are + V-ing + O\n" +
              "INT : Am/Is/Are + S + V-ing + O?\n" +
              "NEG : S + am not / isn't / aren't + V-ing + O",
          },
          {
            id: "ch1-l9-c3",
            type: "examples",
            title: "Ohatra",
            examples: [
              { english: "They are reading books right now", malagasy: "Mamaky boky izy ireo izao" },
              { english: "We are playing guitar now", malagasy: "Mitendry gitara izahay izao" },
              { english: "He is eating now", malagasy: "Mihinana izy izao" },
              { english: "What are you doing now?", malagasy: "Inona no ataonao izao?" },
              { english: "I am staying at my friend's house this week", malagasy: "Mipetraka any amin'ny namako aho ity herinandro ity" },
              { english: "He is working on a project these days", malagasy: "Miasa amin'ny projet izy amin'izao andro izao" },
            ],
          },
          {
            id: "ch1-l9-c4",
            type: "note",
            title: "Règle du -ing",
            malagasyExplanation:
              "1) Mifarana amin'ny \"e\" → esorina ny e (drive → driving)\n" +
              "2) CVC (consonant-vowel-consonant) → averina ny consonne farany (get → getting)\n" +
              "3) Mifarana amin'ny \"ie\" → soloina \"y\" (tie → tying)",
          },
          {
            id: "ch1-l9-c5",
            type: "note",
            title: "Verbes tsy azo ampiasaina amin'ny présent progressif",
            malagasyExplanation:
              "Ireto matoanteny ireto dia tsy azo ampiasaina amin'ny présent progressif: " +
              "know, understand, remember, like, love, hate, prefer, hear, want, seem, need.",
          },
          {
            id: "ch1-l9-c6",
            type: "examples",
            title: "Ohatra diso vs marina",
            examples: [
              { english: "❌ He is knowing me → ✅ He knows me", malagasy: "Mahafantatra ahy izy" },
              { english: "❌ I am loving you → ✅ I love you", malagasy: "Tiako ianao" },
              { english: "❌ She is wanting to see you → ✅ She wants to see you", malagasy: "Te hahita anao izy" },
              { english: "❌ I am needing help → ✅ I need help", malagasy: "Mila fanampiana aho" },
            ],
          },
        ],
      },

      // ============================================================
      // ===== LEÇON 10 — Future =====
      // ============================================================
      {
        id: "ch1-l10",
        chapterId: "ch1",
        title: "Future",
        subtitle: "Ho avy",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l10-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "FUTURE SIMPLE",
            malagasyExplanation:
              "Ny future simple dia ampiasaina rehefa: " +
              "(1) manao fanapahan-kevitra tampoka, " +
              "(2) maminavina zavatra hitranga, " +
              "(3) mampanantena zavatra.",
          },
          {
            id: "ch1-l10-c2",
            type: "formula",
            title: "Formule",
            formula:
              "AFF : S + will + V + O\n" +
              "INT : Will + S + V + O?\n" +
              "NEG : S + won't + V + O",
          },
          {
            id: "ch1-l10-c3",
            type: "examples",
            title: "Ohatra",
            examples: [
              { english: "I will visit my parents next week", malagasy: "Hitsidika ny ray aman-dreniko aho amin'ny herinandro ho avy" },
              { english: "Will you come here tomorrow?", malagasy: "Ho tonga eto ianao rahampitso?" },
              { english: "I won't study tomorrow", malagasy: "Tsy hianatra aho rahampitso" },
              { english: "She will do it next month", malagasy: "Hanao izany izy amin'ny volana ho avy" },
            ],
          },
          {
            id: "ch1-l10-c4",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "TO BE GOING TO",
            malagasyExplanation:
              "Misy fomba faharoa hilazana ny ho avy: \"to be going to\". " +
              "Ampiasaina rehefa efa misy drafitra mazava na zavatra ho tonga " +
              "ho azo antoka.",
          },
          {
            id: "ch1-l10-c5",
            type: "examples",
            title: "Ohatra TO BE GOING TO",
            examples: [
              { english: "My mother is going to buy something in the market", malagasy: "Hividy zavatra any an-tsena ny reniko" },
              { english: "I am going to learn my lessons", malagasy: "Hianatra ny lesonako aho" },
            ],
          },
          {
            id: "ch1-l10-c6",
            type: "note",
            title: "Simple Present ho an'ny ho avy",
            malagasyExplanation:
              "Azo ampiasaina koa ny simple present rehefa miresaka " +
              "zavatra efa voalamina ho amin'ny ho avy (drafitra, fotoana voafaritra).",
          },
          {
            id: "ch1-l10-c7",
            type: "examples",
            title: "Ohatra",
            examples: [
              { english: "I go to Canada next year", malagasy: "Mandeha any Canada aho amin'ny taona ho avy" },
              { english: "She does it on Monday", malagasy: "Hanao izany izy ny Alatsinainy" },
              { english: "My father comes here tomorrow morning", malagasy: "Ho tonga eto ny raiko rahampitso maraina" },
              { english: "I have an appointment tomorrow afternoon", malagasy: "Manana fotoana hihaonana aho rahampitso tolakandro" },
            ],
          },
          {
            id: "ch1-l10-c8",
            type: "examples",
            title: "Contractions sy Shall",
            examples: [
              { english: "I will = I'll", malagasy: "Hanao" },
              { english: "You will = you'll", malagasy: "Hanao" },
              { english: "He will = He'll", malagasy: "Hanao" },
              { english: "She will = She'll", malagasy: "Hanao" },
              { english: "We will = We'll", malagasy: "Hanao" },
              { english: "They will = They'll", malagasy: "Hanao" },
              { english: "I shall = I'll", malagasy: "Hanao (officiel)" },
              { english: "We shall = we'll", malagasy: "Hanao (officiel)" },
            ],
          },
        ],
      },

      // ============================================================
      // ===== LEÇON 11 — Articles + Demonstratives =====
      // ============================================================
      {
        id: "ch1-l11",
        chapterId: "ch1",
        title: "Articles & Demonstratives",
        subtitle: "Articles sy teny manondro",
        duration: "12 min",
        cards: [
          {
            id: "ch1-l11-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "INDEFINITE ARTICLES: A and AN",
            malagasyExplanation:
              "Misy article roa tsy voafaritra: \"a\" sy \"an\". " +
              "Ampiasaina \"a\" rehefa manomboka amin'ny consonne ny teny " +
              "(a dog, a car, a book). Ampiasaina \"an\" rehefa manomboka " +
              "amin'ny voyelle (a, e, i, o, u) ny teny (an apple, an hour). " +
              "Ampiasaina miaraka amin'ny anarana tokana azo isaina izy ireo.",
          },
          {
            id: "ch1-l11-c2",
            type: "examples",
            title: "Ohatra A / AN",
            examples: [
              { english: "A dog", malagasy: "Alika iray" },
              { english: "A car", malagasy: "Fiara iray" },
              { english: "A book", malagasy: "Boky iray" },
              { english: "An apple", malagasy: "Paoma iray" },
              { english: "An hour", malagasy: "Adiny iray" },
              { english: "An engineer", malagasy: "Injeniera iray" },
            ],
          },
          {
            id: "ch1-l11-c3",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "DEFINITE ARTICLE: THE",
            malagasyExplanation:
              "Ny \"the\" dia article voafaritra. Ampiasaina rehefa " +
              "iresahantsika zavatra efa fantatra na efa voalaza. " +
              "Mety ho tokana na maro, azo isaina na tsy azo isaina.",
          },
          {
            id: "ch1-l11-c4",
            type: "examples",
            title: "Ohatra THE",
            examples: [
              { english: "The book", malagasy: "Ilay boky" },
              { english: "The bottle", malagasy: "Ilay tavoahangy" },
              { english: "The phone", malagasy: "Ilay finday" },
              { english: "The teacher is here", malagasy: "Eto ilay mpampianatra" },
            ],
          },
          {
            id: "ch1-l11-c5",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "DEMONSTRATIVES",
            malagasyExplanation:
              "Ny demonstratives dia teny manondro zavatra, olona, na toerana:\n" +
              "• THIS → zavatra akaiky (tokana)\n" +
              "• THAT → zavatra lavitra (tokana)\n" +
              "• THESE → zavatra akaiky (maro)\n" +
              "• THOSE → zavatra lavitra (maro)",
          },
          {
            id: "ch1-l11-c6",
            type: "examples",
            title: "Ohatra THIS / THAT / THESE / THOSE",
            examples: [
              { english: "This book is interesting", malagasy: "Mahaliana ity boky ity" },
              { english: "This is my new friend", malagasy: "Ity ny namako vaovao" },
              { english: "That building is mine", malagasy: "Ahy io tranobe io" },
              { english: "Who is that boy?", malagasy: "Iza io ankizilahy io?" },
              { english: "These shirts are brand new", malagasy: "Vaovao ireto akanjo ireto" },
              { english: "Those are my friends", malagasy: "Ireo ny namako" },
            ],
          },
        ],
      },

      // ============================================================
      // ===== LEÇON 12 — Past Simple =====
      // ============================================================
      {
        id: "ch1-l12",
        chapterId: "ch1",
        title: "Past Simple",
        subtitle: "Lasana tsotra",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l12-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "PAST SIMPLE",
            malagasyExplanation:
              "Ny past simple dia ampiasaina rehefa miresaka zavatra " +
              "efa niseho sy vita tamin'ny lasa, ary efa fantatra ny fotoana. " +
              "Misy matoanteny ara-dalàna (regular) sy tsy ara-dalàna (irregular).",
          },
          {
            id: "ch1-l12-c2",
            type: "formula",
            title: "Formule",
            formula:
              "AFF : S + V-ed (na V2) + O\n" +
              "INT : Did + S + V + O?\n" +
              "NEG : S + didn't + V + O",
          },
          {
            id: "ch1-l12-c3",
            type: "note",
            title: "Règle du -ed",
            malagasyExplanation:
              "1) Mifarana amin'ny \"e\" → +d (love → loved)\n" +
              "2) Mifarana amin'ny CVC → averina ny consonne (stop → stopped)\n" +
              "3) Mifarana amin'ny C+Y → +ied (study → studied)\n" +
              "4) Mifarana amin'ny V+Y → +ed (play → played)",
          },
          {
            id: "ch1-l12-c4",
            type: "examples",
            title: "Verbes réguliers",
            examples: [
              { english: "To play → played", malagasy: "Nilalao" },
              { english: "To watch → watched", malagasy: "Nijery" },
              { english: "To study → studied", malagasy: "Nianatra" },
              { english: "To stop → stopped", malagasy: "Nijanona" },
              { english: "To love → loved", malagasy: "Nitia" },
            ],
          },
          {
            id: "ch1-l12-c5",
            type: "examples",
            title: "Verbes irréguliers courants",
            examples: [
              { english: "To go → went", malagasy: "Nandeha" },
              { english: "To come → came", malagasy: "Ntonga" },
              { english: "To see → saw", malagasy: "Nahita" },
              { english: "To eat → ate", malagasy: "Nihinana" },
              { english: "To drink → drank", malagasy: "Nisotro" },
              { english: "To have → had", malagasy: "Nanana" },
              { english: "To do → did", malagasy: "Nanao" },
              { english: "To be → was / were", malagasy: "Nisy / Nizaho" },
            ],
          },
          {
            id: "ch1-l12-c6",
            type: "examples",
            title: "Keywords ny past simple",
            examples: [
              { english: "Yesterday", malagasy: "Omaly" },
              { english: "Last night", malagasy: "Tampoka omaly alina" },
              { english: "Last week", malagasy: "Herinandro lasa" },
              { english: "Last month", malagasy: "Volana lasa" },
              { english: "Last year", malagasy: "Taona lasa" },
              { english: "Two days ago", malagasy: "Roa andro lasa izay" },
            ],
          },
          {
            id: "ch1-l12-c7",
            type: "examples",
            title: "Ohatra",
            examples: [
              { english: "My father came here yesterday", malagasy: "Ntonga teto ny raiko omaly" },
              { english: "We arrived here last month", malagasy: "Tonga teto izahay volana lasa" },
              { english: "Did you go to church last Sunday?", malagasy: "Nandeha am-piangonana ve ianao Alahady lasa?" },
              { english: "Where did you go last Monday?", malagasy: "Taiza ianao nandeha Alatsinainy lasa?" },
            ],
          },
        ],
      },

      // ============================================================
      // ===== LEÇON 13 — Modal verbs =====
      // ============================================================
      {
        id: "ch1-l13",
        chapterId: "ch1",
        title: "Modal Verbs",
        subtitle: "Matoanteny modal",
        duration: "16 min",
        cards: [
          {
            id: "ch1-l13-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "MODAL VERBS",
            malagasyExplanation:
              "Ny modal verbs dia matoanteny manampy hilazana fahaizana, " +
              "fahazoan-dalana, adidy, na soso-kevitra. Tsy miova " +
              "araka ny sujet izy ireo, ary mifanaraka amin'ny matoanteny " +
              "fototra (base form).",
          },
          {
            id: "ch1-l13-c2",
            type: "explanation",
            title: "CAN / TO BE ABLE TO",
            englishTitle: "CAN / TO BE ABLE TO",
            malagasyExplanation:
              "• Fahaizana: \"I can play the guitar\" (Mahay mitendry gitara aho)\n" +
              "• Fahafahana: \"Mistakes can happen\" (Mety hisy fahadisoana)\n" +
              "• Fahazoan-dalana tsy officiel: \"Can I borrow your pen?\"\n" +
              "• Fangatahana: \"Can you help me with my homework?\"",
          },
          {
            id: "ch1-l13-c3",
            type: "examples",
            title: "Ohatra CAN",
            examples: [
              { english: "She can play the guitar", malagasy: "Mahay mitendry gitara izy" },
              { english: "I can solve this math problem", malagasy: "Mahavaha an'ity olana matematika ity aho" },
              { english: "Can I borrow your pen?", malagasy: "Afaka mindrana ny peninao ve aho?" },
              { english: "Can you help me?", malagasy: "Afaka manampy ahy ve ianao?" },
              { english: "Could I have a glass of water?", malagasy: "Afaka mahazo rano iray vera ve aho?" },
            ],
          },
          {
            id: "ch1-l13-c4",
            type: "explanation",
            title: "MAY / MIGHT",
            englishTitle: "MAY / MIGHT",
            malagasyExplanation:
              "• Fahazoan-dalana officiel: \"You may leave early today\"\n" +
              "• Fahafahana: \"It may rain later\" (Mety hisy orana)\n" +
              "• Fangatahana am-panajana: \"May I borrow your pen?\"",
          },
          {
            id: "ch1-l13-c5",
            type: "examples",
            title: "Ohatra MAY",
            examples: [
              { english: "You may leave early today", malagasy: "Afaka miala aloha ianao anio" },
              { english: "It may rain later", malagasy: "Mety hisy orana any aoriana" },
              { english: "May I borrow your pen?", malagasy: "Afaka mindrana ny peninao ve aho?" },
            ],
          },
          {
            id: "ch1-l13-c6",
            type: "explanation",
            title: "MUST / HAVE TO",
            englishTitle: "MUST / HAVE TO",
            malagasyExplanation:
              "• MUST → adidy mafy, ilaina, na azo antoka\n" +
              "• HAVE TO → adidy na ilaina (tsy dia mafy loatra)\n" +
              "• SHOULD / OUGHT TO → soso-kevitra na adidy ara-pitondrantena",
          },
          {
            id: "ch1-l13-c7",
            type: "examples",
            title: "Ohatra MUST / HAVE TO / SHOULD",
            examples: [
              { english: "You must wear a helmet", malagasy: "Tsy maintsy manao helmet ianao" },
              { english: "We must finish this project by tomorrow", malagasy: "Tsy maintsy mahavita an'ity projet ity izahay rahampitso" },
              { english: "I have to wake up early tomorrow", malagasy: "Mila mifoha maraina aho rahampitso" },
              { english: "Do you have to go now?", malagasy: "Mila mandeha ianao izao?" },
              { english: "You should eat more vegetables", malagasy: "Tokony hihinana anana bebe kokoa ianao" },
              { english: "We should apologize for being late", malagasy: "Tokony miala tsiny izahay noho ny fahatarana" },
            ],
          },
          {
            id: "ch1-l13-c8",
            type: "note",
            title: "Fanamarihana",
            malagasyExplanation:
              "1) Ny modal dia tsy miova: \"He can\", fa tsy \"He cans\".\n" +
              "2) Mifanaraka amin'ny matoanteny fototra: \"I can play\", fa tsy \"I can to play\".\n" +
              "3) Tsy mampiasa \"do/does\" amin'ny fanontaniana: \"Can you…?\", fa tsy \"Do you can…?\".",
          },
        ],
      },
            // ============================================================
      // ===== LEÇON 14 — Some/Any/No + Much/Many =====
      // ============================================================
      {
        id: "ch1-l14",
        chapterId: "ch1",
        title: "Some, Any, No & Much/Many",
        subtitle: "Mpamaritra isa sy habetsahana",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l14-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "SOME",
            malagasyExplanation:
              "Ny \"some\" dia midika hoe \"misy\" na \"vitsivitsy\". " +
              "Ampiasaina amin'ny fehezanteny affirmative (fanambarana), " +
              "ary koa amin'ny fanontaniana rehefa manolotra na mangataka. " +
              "Azo ampiasaina amin'ny anarana azo isaina sy tsy azo isaina.",
          },
          {
            id: "ch1-l14-c2",
            type: "examples",
            title: "Ohatra SOME",
            examples: [
              { english: "There are some apples in the basket", malagasy: "Misy paoma vitsivitsy ao anaty harona" },
              { english: "I have some books", malagasy: "Manana boky vitsivitsy aho" },
              { english: "Would you like some tea?", malagasy: "Te hisotro dite ve ianao?" },
              { english: "Could I borrow some money please?", malagasy: "Afaka mindrana vola ve aho azafady?" },
              { english: "I have something to tell you", malagasy: "Manana zavatra holazaina aminao aho" },
              { english: "There is someone who is calling you", malagasy: "Misy olona miantso anao" },
            ],
          },
          {
            id: "ch1-l14-c3",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "ANY",
            malagasyExplanation:
              "Ny \"any\" dia ampiasaina amin'ny fehezanteny negative " +
              "sy amin'ny fanontaniana. Midika hoe \"tsy misy\" " +
              "(amin'ny negative) na \"misy ve?\" (amin'ny fanontaniana).",
          },
          {
            id: "ch1-l14-c4",
            type: "examples",
            title: "Ohatra ANY",
            examples: [
              { english: "I don't have any problems", malagasy: "Tsy manana olana aho" },
              { english: "He doesn't have any chairs in his room", malagasy: "Tsy manana seza ao an'efi-tranony izy" },
              { english: "Do you have any sugar?", malagasy: "Manana siramamy ve ianao?" },
              { english: "Is there any milk left?", malagasy: "Misy ronono sisa ve?" },
              { english: "There isn't anyone inside", malagasy: "Tsy misy olona ao anaty" },
              { english: "Do you have anywhere to go tonight?", malagasy: "Manana toerana haleha ve ianao anio alina?" },
            ],
          },
          {
            id: "ch1-l14-c5",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "NO",
            malagasyExplanation:
              "Ny \"no\" dia midika hoe \"tsy misy mihitsy\" na \"tsy misy na dia iray aza\". " +
              "Ampiasaina amin'ny fehezanteny affirmative kanefa ny dikany dia " +
              "negative (tsy misy).",
          },
          {
            id: "ch1-l14-c6",
            type: "examples",
            title: "Ohatra NO",
            examples: [
              { english: "There are no apples on the table", malagasy: "Tsy misy paoma eo ambony latabatra" },
              { english: "He has no money to buy this phone", malagasy: "Tsy manana vola hividianana an'ity finday ity izy" },
              { english: "There is no one inside", malagasy: "Tsy misy olona ao anaty" },
              { english: "I am doing nothing", malagasy: "Tsy manao na inona na inona aho" },
              { english: "She has nowhere to go", malagasy: "Tsy manana toerana haleha izy" },
            ],
          },
          {
            id: "ch1-l14-c7",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "MUCH vs MANY",
            malagasyExplanation:
              "• MUCH → ampiasaina amin'ny anarana tsy azo isaina " +
              "(water, money, sugar, time)\n" +
              "• MANY → ampiasaina amin'ny anarana azo isaina " +
              "(apples, books, cars, people)",
          },
          {
            id: "ch1-l14-c8",
            type: "examples",
            title: "Ohatra MUCH / MANY",
            examples: [
              { english: "I don't have much money", malagasy: "Tsy manana vola be aho" },
              { english: "Is there much sugar left in the jar?", malagasy: "Misy siramamy be sisa ao anaty boaty ve?" },
              { english: "I drink much water every day", malagasy: "Misotro rano be aho isan'andro" },
              { english: "There are too many people in the room", malagasy: "Olona be loatra ao anaty efitrano" },
              { english: "I saw many cars on the road today", malagasy: "Nahita fiara maro teny an-dàlana aho anio" },
              { english: "Many students attended the lecture", malagasy: "Mpianatra maro no nanatrika ny lesona" },
            ],
          },
        ],
      },

      // ============================================================
      // ===== LEÇON 15 — Prepositions =====
      // ============================================================
      {
        id: "ch1-l15",
        chapterId: "ch1",
        title: "Prepositions",
        subtitle: "Teny mifandray (toerana sy fotoana)",
        duration: "16 min",
        cards: [
          {
            id: "ch1-l15-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "PREPOSITIONS OF PLACE",
            malagasyExplanation:
              "Ny preposition of place dia teny milaza toerana: " +
              "ambony, ambany, anaty, ivelany, akaiky, lavitra...",
          },
          {
            id: "ch1-l15-c2",
            type: "examples",
            title: "Ohatra — Toerana (1/2)",
            examples: [
              { english: "Above", malagasy: "Ambon'ny (tsy mikitika)" },
              { english: "Below", malagasy: "Ambany noho" },
              { english: "Under", malagasy: "Ambany (mikitika)" },
              { english: "On", malagasy: "Eo ambony" },
              { english: "In", malagasy: "Ao anaty" },
              { english: "At", malagasy: "Ao amin'ny" },
              { english: "Between", malagasy: "Eo anelanelan'ny" },
              { english: "Beside", malagasy: "Eo anilany" },
            ],
          },
          {
            id: "ch1-l15-c3",
            type: "examples",
            title: "Ohatra — Toerana (2/2)",
            examples: [
              { english: "Behind", malagasy: "Ao aoriana" },
              { english: "In front of", malagasy: "Eo aloha" },
              { english: "Next to", malagasy: "Eo akaiky" },
              { english: "Near", malagasy: "Eo akaiky" },
              { english: "Inside", malagasy: "Ao anaty" },
              { english: "Outside", malagasy: "Any ivelany" },
              { english: "Into", malagasy: "Miditra ao anaty" },
              { english: "Out of", malagasy: "Mivoaka avy ao" },
              { english: "Across", malagasy: "Miampita" },
              { english: "Through", malagasy: "Mandalo ao anatiny" },
            ],
          },
          {
            id: "ch1-l15-c4",
            type: "examples",
            title: "Ohatra amin'ny fehezanteny",
            examples: [
              { english: "The airplane is flying above the clouds", malagasy: "Manidina ambonin'ny rahona ny fiaramanidina" },
              { english: "The cat is hiding under the table", malagasy: "Miery ao ambany latabatra ny saka" },
              { english: "The phone is on the desk", malagasy: "Eo ambony latabatra ny finday" },
              { english: "She lives in Mananara", malagasy: "Mipetraka any Mananara izy" },
              { english: "The meeting is at the office", malagasy: "Ao amin'ny birao ny fivoriana" },
              { english: "She sat between her two friends", malagasy: "Nipetraka teo anelanelan'ny namany roa izy" },
              { english: "The dog is hiding behind the sofa", malagasy: "Miery ao aorian'ny sofa ny alika" },
            ],
          },
          {
            id: "ch1-l15-c5",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "PREPOSITIONS OF TIME",
            malagasyExplanation:
              "Ny preposition of time dia teny milaza fotoana: " +
              "amin'ny, mandritra, taloha, aorian'ny, hatramin'ny...",
          },
          {
            id: "ch1-l15-c6",
            type: "examples",
            title: "Ohatra — Fotoana",
            examples: [
              { english: "AT", malagasy: "Amin'ny (ora)" },
              { english: "ON", malagasy: "Amin'ny (andro, daty)" },
              { english: "IN", malagasy: "Amin'ny (taona, volana)" },
              { english: "BY", malagasy: "Alohan'ny" },
              { english: "UNTIL / TILL", malagasy: "Mandrapiha..." },
              { english: "FOR", malagasy: "Nandritra ny" },
              { english: "SINCE", malagasy: "Nanomboka tamin'ny" },
              { english: "DURING", malagasy: "Nandritra ny" },
              { english: "BEFORE", malagasy: "Talohan'ny" },
              { english: "AFTER", malagasy: "Aorian'ny" },
              { english: "AGO", malagasy: "Lasa izay" },
              { english: "WITHIN", malagasy: "Ao anatin'ny" },
            ],
          },
          {
            id: "ch1-l15-c7",
            type: "examples",
            title: "Ohatra amin'ny fehezanteny",
            examples: [
              { english: "The train arrives at 5PM", malagasy: "Tonga amin'ny 5 ora hariva ny fiara" },
              { english: "He leaves on the weekend", malagasy: "Miala amin'ny faran'ny herinandro izy" },
              { english: "She was born in 2017", malagasy: "Teraka tamin'ny 2017 izy" },
              { english: "She promised to be here by noon", malagasy: "Nampanantena ho tonga alohan'ny mitataovovonana izy" },
              { english: "I fell asleep during the movie", malagasy: "Natory aho nandritra ny sarimihetsika" },
              { english: "The accident happened 10 years ago", malagasy: "Nitrang ny lozam-pifamoivoizana 10 taona lasa izay" },
            ],
          },
        ],
      },

      // ============================================================
      // ===== LEÇON 16 — Question words =====
      // ============================================================
      {
        id: "ch1-l16",
        chapterId: "ch1",
        title: "Question Words",
        subtitle: "Teny fanontaniana",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l16-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "THE QUESTION WORDS",
            malagasyExplanation:
              "Ny question words dia teny ampiasaina hametrahana fanontaniana. " +
              "Samy manana ny dikany manokana izy ireo ary manomboka " +
              "amin'ny litera WH ny ankamaroany (WHO, WHAT, WHERE...).",
          },
          {
            id: "ch1-l16-c2",
            type: "examples",
            title: "Ohatra — Question words (1/2)",
            examples: [
              { english: "WHO → Iza", malagasy: "Who is calling you?" },
              { english: "WHOM → Iza", malagasy: "Whom are you talking to?" },
              { english: "WHAT → Inona", malagasy: "What are you doing now?" },
              { english: "WHICH → Iza (mampisafidy)", malagasy: "Which of these bags is yours?" },
              { english: "WHOSE → An'iza", malagasy: "Whose is this umbrella?" },
              { english: "WHY → Nahoana", malagasy: "Why are you crying?" },
              { english: "WHEN → Oviana", malagasy: "When do you go to Canada?" },
              { english: "WHERE → Aiza", malagasy: "Where are you from?" },
            ],
          },
          {
            id: "ch1-l16-c3",
            type: "examples",
            title: "Ohatra — Question words (2/2)",
            examples: [
              { english: "HOW OFTEN → Impiry", malagasy: "How often do you visit your parents?" },
              { english: "HOW MANY → Firy (azo isaina)", malagasy: "How many siblings do you have?" },
              { english: "HOW MUCH → Hotrino (vidiny, tsy azo isaina)", malagasy: "How much did you buy this phone?" },
              { english: "HOW LONG → Hafiriana", malagasy: "How long have you been waiting for me?" },
              { english: "HOW FAR → Elanelana", malagasy: "How far is Mananara from Toamasina?" },
              { english: "HOW DEEP → Halalina", malagasy: "How deep is this water?" },
              { english: "WHAT TIME → Amin'ny firy", malagasy: "What time did you come here?" },
              { english: "HOW → Ahoana", malagasy: "How was your party yesterday?" },
            ],
          },
          {
            id: "ch1-l16-c4",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "DIFFÉRENCE — WHO / WHOM / WHOSE",
            malagasyExplanation:
              "• WHO → sujet (izaho no manao zavatra)\n" +
              "• WHOM → objet (izaho no anaovana zavatra)\n" +
              "• WHOSE → fananana (an'iza ny zavatra)",
          },
          {
            id: "ch1-l16-c5",
            type: "examples",
            title: "Ohatra amin'ny fehezanteny",
            examples: [
              { english: "Who is calling you?", malagasy: "Iza no miantso anao?" },
              { english: "Whom are you talking to?", malagasy: "Iza no resahinao?" },
              { english: "Whose is this umbrella?", malagasy: "An'iza ity elo ity?" },
              { english: "What are you doing now?", malagasy: "Inona no ataonao izao?" },
              { english: "Which of these bags is yours?", malagasy: "Iza amin'ireto kitapo ireto no anao?" },
              { english: "Why are you crying?", malagasy: "Nahoana ianao no mitomany?" },
              { english: "When do you go to Canada?", malagasy: "Oviana ianao no mandeha any Canada?" },
              { english: "Where are you from?", malagasy: "Avy aiza ianao?" },
              { english: "How many siblings do you have?", malagasy: "Firy mpiray tampo aminao?" },
              { english: "How much money do you need?", malagasy: "Ohatrinona ny vola ilainao?" },
            ],
          },
        ],
      },
            // ============================================================
      // ===== LEÇON 17 — Relative pronouns =====
      // ============================================================
      {
        id: "ch1-l17",
        chapterId: "ch1",
        title: "Relative Pronouns",
        subtitle: "Teny mifandray (who, whom, whose...)",
        duration: "14 min",
        cards: [
          {
            id: "ch1-l17-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "RELATIVE PRONOUNS",
            malagasyExplanation:
              "Ny relative pronouns dia teny mampifandray fehezanteny roa " +
              "mba hamoronana fehezanteny iray mitohy. Izy ireo no misolo " +
              "tena amin'ny anarana efa voalaza. Misy: who, whom, whose, " +
              "which, that, when, where, why.",
          },
          {
            id: "ch1-l17-c2",
            type: "explanation",
            title: "WHO — Ho an'ny olona",
            englishTitle: "WHO",
            malagasyExplanation:
              "Ny \"who\" dia ampiasaina ho an'ny olona. Izy no sujet " +
              "(lohahevitry ny fehezanteny faharoa).",
          },
          {
            id: "ch1-l17-c3",
            type: "examples",
            title: "Ohatra WHO",
            examples: [
              { english: "The boy who won the race is my brother", malagasy: "Ilay ankizilahy nandresy tamin'ny hazakazaka no rahalahiko" },
              { english: "I need someone who is willing to study", malagasy: "Mila olona vonona hianatra aho" },
              { english: "She is the teacher who helped me", malagasy: "Izy no mpampianatra nanampy ahy" },
            ],
          },
          {
            id: "ch1-l17-c4",
            type: "explanation",
            title: "WHOM — Ho an'ny olona (objet)",
            englishTitle: "WHOM",
            malagasyExplanation:
              "Ny \"whom\" dia ampiasaina ho an'ny olona koa, fa izy no " +
              "objet (izay anaovana zavatra). Amin'ny anglisy andavanandro, " +
              "dia matetika soloina \"who\" ny \"whom\".",
          },
          {
            id: "ch1-l17-c5",
            type: "examples",
            title: "Ohatra WHOM",
            examples: [
              { english: "The woman whom you met yesterday is my aunt", malagasy: "Ilay vehivavy nifankahitanao omaly no nenitoako" },
              { english: "I am a teacher whom the students admire the most", malagasy: "Mpampianatra ankafizin'ny mpianatra indrindra aho" },
              { english: "The man whom I called is my uncle", malagasy: "Ilay lehilahy nantsoiko no dadatoako" },
            ],
          },
          {
            id: "ch1-l17-c6",
            type: "explanation",
            title: "WHOSE — Fananana",
            englishTitle: "WHOSE",
            malagasyExplanation:
              "Ny \"whose\" dia milaza fananana. Ampiasaina ho an'ny olona, " +
              "biby, na zavatra.",
          },
          {
            id: "ch1-l17-c7",
            type: "examples",
            title: "Ohatra WHOSE",
            examples: [
              { english: "The student whose book is missing reported it to the teacher", malagasy: "Ilay mpianatra very ny bokiny no nitatitra tamin'ny mpampianatra" },
              { english: "The girl whose dog is missing is very upset", malagasy: "Tena malahelo ilay tovovavy very ny alikany" },
              { english: "The family whose house burned down is receiving community support", malagasy: "Mahazo fanampiana avy amin'ny fiaraha-monina ilay fianakaviana may ny tranony" },
            ],
          },
          {
            id: "ch1-l17-c8",
            type: "explanation",
            title: "WHICH — Ho an'ny zavatra",
            englishTitle: "WHICH",
            malagasyExplanation:
              "Ny \"which\" dia ampiasaina ho an'ny zavatra sy biby. " +
              "Tsy ampiasaina ho an'ny olona izy.",
          },
          {
            id: "ch1-l17-c9",
            type: "examples",
            title: "Ohatra WHICH",
            examples: [
              { english: "The house which was painted last week looks amazing", malagasy: "Mahafinaritra ilay trano nolokoina herinandro lasa" },
              { english: "It's like this something which I am looking for", malagasy: "Toy izao ny zavatra tadiaviko" },
              { english: "The book which I read was interesting", malagasy: "Mahaliana ilay boky novakiako" },
            ],
          },
          {
            id: "ch1-l17-c10",
            type: "explanation",
            title: "THAT — Ho an'ny rehetra",
            englishTitle: "THAT",
            malagasyExplanation:
              "Ny \"that\" dia azo ampiasaina ho an'ny olona, biby, ary zavatra. " +
              "Matetika izy no soloina ny \"who\", \"whom\", na \"which\".",
          },
          {
            id: "ch1-l17-c11",
            type: "examples",
            title: "Ohatra THAT",
            examples: [
              { english: "This is the car that I want to buy", malagasy: "Ity no fiara tiko hovidiana" },
              { english: "The pen that you lent me was lost", malagasy: "Very ilay penina nampindraminao ahy" },
              { english: "The man that called you is my father", malagasy: "Ilay lehilahy niantso anao no raiko" },
            ],
          },
          {
            id: "ch1-l17-c12",
            type: "explanation",
            title: "WHEN / WHERE / WHY",
            englishTitle: "WHEN / WHERE / WHY",
            malagasyExplanation:
              "• WHEN → fotoana (the day when…)\n" +
              "• WHERE → toerana (the place where…)\n" +
              "• WHY → antony (the reason why…)",
          },
          {
            id: "ch1-l17-c13",
            type: "examples",
            title: "Ohatra WHEN / WHERE / WHY",
            examples: [
              { english: "I remember the day when we first met", malagasy: "Tsaroako ny andro nifankahitantsika voalohany" },
              { english: "Here is the place where we go", malagasy: "Ity ny toerana ialehantsika" },
              { english: "Do you know where he lives?", malagasy: "Fantatrao ve ny toerana ipetrahany?" },
              { english: "The reason why she left early is still unknown", malagasy: "Mbola tsy fantatra ny antony nialany aloha" },
            ],
          },
        ],
      },
            // ============================================================
      // ===== LEÇON 18 — Vocabularies I =====
      // ============================================================
      {
        id: "ch1-l18",
        chapterId: "ch1",
        title: "Vocabularies I",
        subtitle: "Voambolana (fiainana andavanandro)",
        duration: "16 min",
        cards: [
          {
            id: "ch1-l18-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "WHAT DO YOU DO EVERY DAY?",
            malagasyExplanation:
              "Ato amin'ity lesona ity dia hianatra matoanteny ampiasaina " +
              "amin'ny fiainana andavanandro ianao: ny asa atao ao an-trano, " +
              "ny fahazarana amin'ny maraina, ary ny fihetseham-po.",
          },
          {
            id: "ch1-l18-c2",
            type: "examples",
            title: "Asa ao an-trano",
            examples: [
              { english: "To clean the house", malagasy: "Manadio trano" },
              { english: "To arrange something", malagasy: "Mandamina zavatra" },
              { english: "To open / close the door", malagasy: "Manokatra / Mamidy varavarana" },
              { english: "To open / close the curtain", malagasy: "Manokatra / Mamidy rideau" },
              { english: "To have a shower", malagasy: "Mandro" },
              { english: "To soap oneself down", malagasy: "Manosotra savony" },
              { english: "To do the laundry", malagasy: "Manasa lamba" },
              { english: "To do the chores", malagasy: "Manao raharaha ao an-trano" },
              { english: "To fetch water", malagasy: "Maka rano" },
              { english: "To light on / off", malagasy: "Mamelona / Mamono afo" },
            ],
          },
          {
            id: "ch1-l18-c3",
            type: "examples",
            title: "Asa any ivelany",
            examples: [
              { english: "To winnow the rice", malagasy: "Manahaka vary" },
              { english: "To select the rice", malagasy: "Mitsimpona vary" },
              { english: "To get warm", malagasy: "Mamindro" },
              { english: "To tend a fire", malagasy: "Manorognafo" },
              { english: "To boil", malagasy: "Mandeha / Mangotraka" },
              { english: "To broil", malagasy: "Mitonò zavatra amin'ny afo" },
              { english: "To prepare breakfast", malagasy: "Manomana sakafo maraina" },
              { english: "To scoop the rice", malagasy: "Mamoatra vary" },
            ],
          },
          {
            id: "ch1-l18-c4",
            type: "examples",
            title: "Fiomanana maraina",
            examples: [
              { english: "To see the mirror", malagasy: "Mijery fitaratra" },
              { english: "To make up", malagasy: "Manao makiazy" },
              { english: "To get well dressed", malagasy: "Manao fitafy tsara" },
              { english: "To dress up", malagasy: "Mitafy tsara" },
              { english: "To put one's shoes on", malagasy: "Manao kiraro" },
              { english: "To get ready to go out", malagasy: "Miomana hivoaka trano" },
              { english: "To go on foot", malagasy: "Mandeha tongotra" },
              { english: "To go by bicycle / car", malagasy: "Mandeha bisikileta / fiara" },
              { english: "To ride a bicycle", malagasy: "Mitondra bisikileta" },
            ],
          },
          {
            id: "ch1-l18-c5",
            type: "examples",
            title: "Asa fianarana sy fiasana",
            examples: [
              { english: "To study", malagasy: "Mianatra" },
              { english: "To start to study at / work at", malagasy: "Manomboka mianatra / miasa amin'ny" },
              { english: "To have break time", malagasy: "Maka sasatra / fialan-tsasatra" },
              { english: "To go back from school", malagasy: "Mody avy any an-tsekoly" },
              { english: "To get off work", malagasy: "Mirava / mody avy miasa" },
              { english: "To come home", malagasy: "Tonga an-trano" },
              { english: "To take / have a nap", malagasy: "Manao sieste antoandro" },
              { english: "To have fun with friends", malagasy: "Manala azy miaraka amin'ny namana" },
              { english: "To learn one's lesson", malagasy: "Mianatra lesona" },
              { english: "To revise one's lesson", malagasy: "Mamerina lesona" },
            ],
          },
          {
            id: "ch1-l18-c6",
            type: "examples",
            title: "Fihetseham-po sy saina",
            examples: [
              { english: "To be sleepy", malagasy: "Te-hatory" },
              { english: "To fall asleep", malagasy: "Tafatory" },
              { english: "To spend one's time", malagasy: "Mandany fotoana" },
              { english: "To have a breakfast", malagasy: "Mihinana sakafo maraina" },
              { english: "To have a lunch", malagasy: "Mihinana sakafo antoandro" },
              { english: "To have a dinner", malagasy: "Mihinana sakafo hariva" },
              { english: "To meet sb / to bump into sb", malagasy: "Mifanena" },
              { english: "To look for sth / sb", malagasy: "Mitady" },
            ],
          },
          {
            id: "ch1-l18-c7",
            type: "examples",
            title: "Saina sy fahaizana",
            examples: [
              { english: "To pretend to", malagasy: "Mody" },
              { english: "To pretend not to", malagasy: "Mody tsy" },
              { english: "To cheat somebody", malagasy: "Mamitaka" },
              { english: "To lend something", malagasy: "Mampindrana" },
              { english: "To borrow something", malagasy: "Mihindra" },
              { english: "To look + adj", malagasy: "Misy toetra" },
              { english: "To seem + adj", malagasy: "Toa" },
              { english: "It looks that + S+V", malagasy: "Toa izy fa" },
              { english: "It seems that + S+V", malagasy: "Toa izy fa" },
            ],
          },
        ],
      },
            // ============================================================
      // ===== LEÇON 19 — Vocabularies II =====
      // ============================================================
      {
        id: "ch1-l19",
        chapterId: "ch1",
        title: "Vocabularies II",
        subtitle: "Voambolana (fahasalamana sy fiainana)",
        duration: "16 min",
        cards: [
          {
            id: "ch1-l19-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "EVERYDAY VOCABULARY",
            malagasyExplanation:
              "Ato amin'ity lesona ity dia hianatra matoanteny sy andian-teny " +
              "ampiasaina amin'ny fiainana andavanandro ianao: ny fahasalamana, " +
              "ny fihetseham-pon'ny vatana, ary ny asa atao amin'ny tany.",
          },
          {
            id: "ch1-l19-c2",
            type: "examples",
            title: "Fihetseham-pon'ny vatana",
            examples: [
              { english: "To snore", malagasy: "Mangorokoro" },
              { english: "To sneeze", malagasy: "Mitsioko" },
              { english: "To cough", malagasy: "Mikohaka" },
              { english: "To be deaf", malagasy: "Marenina" },
              { english: "To be dumb", malagasy: "Moa / Tsy mahay miteny" },
              { english: "To be blind", malagasy: "Jamba" },
              { english: "To be sloshed", malagasy: "Mamo" },
              { english: "To lick", malagasy: "Milelaka" },
              { english: "To suck out / at something", malagasy: "Minono / Mitsentsitra" },
              { english: "To poke somebody", malagasy: "Mikitika olona" },
              { english: "To melt / thaw", malagasy: "Mitsonika" },
              { english: "To tickle", malagasy: "Mangidihidy" },
              { english: "To chuckle", malagasy: "Mimoehy reraka" },
              { english: "To blow one's nose", malagasy: "Manisindelo" },
              { english: "To wipe one's tears", malagasy: "Mamafa ranomaso" },
              { english: "To spit out", malagasy: "Mandrora" },
              { english: "To fart", malagasy: "Mangetotra" },
              { english: "To itch / to be itchy", malagasy: "Mangidihidy" },
              { english: "To burp", malagasy: "Mandrezatra" },
            ],
          },
          {
            id: "ch1-l19-c3",
            type: "examples",
            title: "Verbes agricoles",
            examples: [
              { english: "To grow / to plant", malagasy: "Mitombo / Mamboly" },
              { english: "To sprout", malagasy: "Mitsimoka" },
              { english: "To be raw / to be ripe", malagasy: "Manta / Masaka" },
              { english: "To climb", malagasy: "Mihanika" },
              { english: "To breed", malagasy: "Miompy" },
              { english: "To go to hunt", malagasy: "Mandeha mihaza" },
              { english: "To be a hunter", malagasy: "Mpihaza" },
              { english: "To go to fish", malagasy: "Mandeha mamintana" },
              { english: "To be a fisher", malagasy: "Mpamintana" },
              { english: "To take firewood", malagasy: "Maka kitay" },
              { english: "To pluck / uproot", malagasy: "Manongatra mangahazo" },
              { english: "To rake", malagasy: "Mampiasa rateau" },
              { english: "To sow", malagasy: "Mamafy" },
              { english: "To plant the rice", malagasy: "Mamboly vary" },
              { english: "To harvest / reap", malagasy: "Mijinga ny vokatra" },
              { english: "To graft", malagasy: "Manao grefy" },
              { english: "To trim", malagasy: "Manapaka ahitra" },
              { english: "To collect / gather", malagasy: "Manangona / Mamory" },
              { english: "To clear by the ax", malagasy: "Manapaka amin'ny famaky" },
              { english: "The channel / canal", malagasy: "Kanalindrano" },
              { english: "To sieve", malagasy: "Manivana" },
              { english: "To haul / transport", malagasy: "Mitatitra" },
              { english: "To burn", malagasy: "Mandoro" },
              { english: "The bushfire / wildfire", malagasy: "Doro tanety" },
              { english: "To water", malagasy: "Manondraka rano" },
              { english: "To grind", malagasy: "Mitoto" },
              { english: "The grinder", malagasy: "Fitotoana zavatra" },
            ],
          },
          {
            id: "ch1-l19-c4",
            type: "examples",
            title: "Verbes du quotidien",
            examples: [
              { english: "To focus on something", malagasy: "Mifantoka amin'ny zavatra" },
              { english: "To get better and better", malagasy: "Mihatsara" },
              { english: "To get worse and worse", malagasy: "Miharatsy" },
              { english: "To interrupt someone", malagasy: "Manapaka tenin'olona" },
              { english: "To butt in someone", malagasy: "Manapaka tenin'olona" },
              { english: "To translate something into sth", malagasy: "Mandika" },
              { english: "To put something in use", malagasy: "Mampiasa" },
              { english: "To improve / to brush up", malagasy: "Manatsara" },
              { english: "To enrich", malagasy: "Mampitombo" },
              { english: "To memorize", malagasy: "Mitadidy" },
              { english: "To move forward", malagasy: "Mandroso foana" },
              { english: "To think something over", malagasy: "Mieritreritra" },
            ],
          },
          {
            id: "ch1-l19-c5",
            type: "examples",
            title: "Verbes de réussite",
            examples: [
              { english: "To take something seriously", malagasy: "Mandray zavatra ho matotra" },
              { english: "To study hard", malagasy: "Mianatra mafy" },
              { english: "To work hard", malagasy: "Miasa mafy" },
              { english: "To bother / disturb", malagasy: "Manelingelina" },
              { english: "To express oneself", malagasy: "Milaza ny hevitra" },
              { english: "To repeat again and again", malagasy: "Mamerimberina foana" },
              { english: "To feel free to + Vinf", malagasy: "Aza misalasala" },
              { english: "To manage to + Vinf", malagasy: "Miezaka" },
              { english: "To deepen", malagasy: "Mandalina" },
              { english: "To hasten", malagasy: "Manafaingana" },
              { english: "To look forward to + Ving", malagasy: "Tsy mahandry ny" },
              { english: "What does (…) mean in…?", malagasy: "Inona dikan'ny …?" },
              { english: "How to say … in …?", malagasy: "Ahoana no atao miteny …?" },
              { english: "To create", malagasy: "Mamorona" },
              { english: "To give sth back to sb", malagasy: "Mamerina zavatra amin'olona" },
            ],
          },
          {
            id: "ch1-l19-c6",
            type: "examples",
            title: "Fihetseham-po mahery",
            examples: [
              { english: "To cry one's eyes out", malagasy: "Mitomany maharitra be" },
              { english: "To see red", malagasy: "Tezitra tampoka" },
              { english: "To jump down someone's throat", malagasy: "Lasa tezitra" },
              { english: "To hit the ceiling", malagasy: "Lasa tezitra be" },
              { english: "To burn someone up", malagasy: "Mankatezitra olona" },
              { english: "To fall in love with someone", malagasy: "Latsa-pitiavana amin'olona" },
              { english: "To be in the picture", malagasy: "Mbola velona / Mbola miaina" },
              { english: "To get in somebody's hair", malagasy: "Manelingelina olona" },
              { english: "To be tongue in cheek", malagasy: "Tsy matotra" },
              { english: "To sell someone short", malagasy: "Manambanimbany olona" },
            ],
          },
          {
            id: "ch1-l19-c7",
            type: "examples",
            title: "Fahaizana sy fahasahiana",
            examples: [
              { english: "To change one's tune / opinion", malagasy: "Manova hevitra" },
              { english: "To turn over a new leaf", malagasy: "Manadino ny lasa" },
              { english: "To make a bundle / killing", malagasy: "Mahazo vola be" },
              { english: "To be rolling in dough / money", malagasy: "Manankarena" },
              { english: "To throw the book at sb", malagasy: "Manafay mafy" },
              { english: "To rant and rave", malagasy: "Miteny mafy" },
              { english: "To stay awake", malagasy: "Miaritory" },
              { english: "To be in the red", malagasy: "Manana trosa" },
              { english: "To give somebody the cold shoulder", malagasy: "Tsy miraharaha olona" },
              { english: "To promise the moon", malagasy: "Mampanantena zavatra tsy ho tanteraka" },
              { english: "To be hard of hearing", malagasy: "Tsy maheno tsara" },
              { english: "To be all gone", malagasy: "Lany / Tsy misy" },
            ],
          },
          {
            id: "ch1-l19-c8",
            type: "examples",
            title: "Tory sy fitsaharana",
            examples: [
              { english: "To sleep out", malagasy: "Matory ivelan-trano" },
              { english: "To sneak out", malagasy: "Misolitra" },
              { english: "To sleep over (with someone)", malagasy: "Matory an-tranon'olona" },
              { english: "To sleep through something", malagasy: "Matory mandritra ny zavatra miseho" },
              { english: "To sleep tight", malagasy: "Matory tsara" },
              { english: "To sleep around the clock", malagasy: "Matory maharitra be" },
              { english: "To sleep on something", malagasy: "Mandinika zavatra mandritra ny alina" },
              { english: "To sleep like a log / baby", malagasy: "Tafandry be" },
              { english: "To sit on one's hands", malagasy: "Tsy manao na inona na inona" },
              { english: "To look up to someone", malagasy: "Manaja olona" },
              { english: "To look down on someone", malagasy: "Tsy manaja olona" },
            ],
          },
        ],
      },
            // ============================================================
      // ===== LEÇON 20 — Vocabularies III =====
      // ============================================================
      {
        id: "ch1-l20",
        chapterId: "ch1",
        title: "Vocabularies III",
        subtitle: "Voambolana (asa sy fiainana)",
        duration: "18 min",
        cards: [
          {
            id: "ch1-l20-c1",
            type: "explanation",
            title: "Fanazavana",
            englishTitle: "HEALTH & LIFE VOCABULARY",
            malagasyExplanation:
              "Ato amin'ity lesona farany amin'ny Chapitre 1 ity dia hianatra " +
              "voambolana momba ny fahasalamana, ny fiterahana, ny asa, " +
              "ny fianarana, ary ny fihetseham-po ianao.",
          },
          {
            id: "ch1-l20-c2",
            type: "examples",
            title: "Fahasalamana sy fiterahana",
            examples: [
              { english: "To wound / to hurt", malagasy: "Maratra / Mandratra" },
              { english: "To hospitalize", malagasy: "Mandefa olona any amin'ny hopitaly" },
              { english: "To do an emergency call", malagasy: "Manao antso maika" },
              { english: "To evacuate someone", malagasy: "Mamindra toerana olona marary" },
              { english: "By an ambulance", malagasy: "Amin'ny alalan'ny ambulance" },
              { english: "Vaccination / an injection", malagasy: "Vaksiny / Pikiry" },
              { english: "To give someone an injection", malagasy: "Manao pikiry" },
              { english: "To take someone's blood pressure", malagasy: "Maka tension'olona" },
              { english: "To put a dressing", malagasy: "Manao passement" },
              { english: "To feel dizzy", malagasy: "Fanina" },
              { english: "To be faint", malagasy: "Torana" },
              { english: "To give birth", malagasy: "Miteraka" },
              { english: "To be premature", malagasy: "Zaza tsy tonga volana" },
              { english: "To be born", malagasy: "Teraka" },
              { english: "To be born by caesarean", malagasy: "Didiana" },
              { english: "To weigh", malagasy: "Mandanja" },
              { english: "Birth weight", malagasy: "Lanjan'ny zaza vao teraka" },
              { english: "To put a baby in an incubator", malagasy: "Mametraka zaza ao amin'ny kovety" },
              { english: "To be barren / sterile", malagasy: "Momba / Tsy miteraka" },
              { english: "To be disabled / handicapped", malagasy: "Sembana" },
              { english: "The womb", malagasy: "Tranonjaza" },
              { english: "Fetus", malagasy: "Zaza ao an-kibo" },
            ],
          },
          {
            id: "ch1-l20-c3",
            type: "examples",
            title: "Fianakaviana sy fanabeazana",
            examples: [
              { english: "To take care of someone", malagasy: "Mikarakara olona" },
              { english: "To bring someone up", malagasy: "Mitaiza olona" },
              { english: "To punish kids", malagasy: "Manasazy zaza" },
              { english: "To tell sb off / to chide sb", malagasy: "Masiaka olona" },
              { english: "To abandon / to give up", malagasy: "Mamela / Miala" },
              { english: "To pass away / to die", malagasy: "Maty" },
              { english: "To kill / to murder sb", malagasy: "Mamono olona" },
              { english: "To be a killer", malagasy: "Mpamono olona" },
              { english: "To suicide / to hang oneself", malagasy: "Mamono tena" },
              { english: "To waste one's life", malagasy: "Manimba fiainana" },
              { english: "To make a mistake", malagasy: "Manao diso" },
              { english: "To spoil one's chances", malagasy: "Manimba fahombiazana" },
            ],
          },
          {
            id: "ch1-l20-c4",
            type: "examples",
            title: "Fianarana sy fahaizana",
            examples: [
              { english: "To be expensive ≠ to be cheap", malagasy: "Lafo ≠ Mora" },
              { english: "The cost of living", malagasy: "Ny vidim-piainana" },
              { english: "The school fee", malagasy: "Sarampianarana" },
              { english: "To have an opportunity / the means to", malagasy: "Manana fahafahana manao zavatra" },
              { english: "To take a chance to + Vinf", malagasy: "Manararaotra" },
              { english: "To have a right to + Vinf", malagasy: "Manana zo hanao zavatra" },
              { english: "It's one's duty to + Vinf", malagasy: "Zon'olona ny hanao zavatra" },
              { english: "To face / to assume", malagasy: "Miatrika zavatra" },
              { english: "To avoid + Vinf", malagasy: "Miala" },
              { english: "To get rid of something / someone", malagasy: "Miala amin'ny zavatra / olona" },
              { english: "To underestimate sb", malagasy: "Manambanimbany olona" },
              { english: "To send someone to school", malagasy: "Mandefa olona an-tsekoly" },
              { english: "To unlock one's potential", malagasy: "Mamaha ny fahombiazana" },
              { english: "To develop", malagasy: "Mivoatra" },
            ],
          },
          {
            id: "ch1-l20-c5",
            type: "examples",
            title: "Tombony sy fahavoazana",
            examples: [
              { english: "The advantage of + Ving", malagasy: "Tombontsoan'ny" },
              { english: "The disadvantage of + Ving", malagasy: "Lafiratsin'ny" },
              { english: "The drawback of + Ving", malagasy: "Lafiratsin'ny" },
              { english: "To brighten", malagasy: "Mihatsara" },
              { english: "To be rich", malagasy: "Manankarena" },
              { english: "To get rich", malagasy: "Miha-manankarena" },
              { english: "To be wealthy", malagasy: "Mpanefoefo" },
              { english: "To be poor", malagasy: "Mahantra" },
              { english: "To be homeless", malagasy: "Tsy manan-kialofana" },
              { english: "To ignore / to neglect", malagasy: "Tsy miraharaha" },
              { english: "To be stubborn", malagasy: "Maditra" },
            ],
          },
          {
            id: "ch1-l20-c6",
            type: "examples",
            title: "Sekoly sy asa",
            examples: [
              { english: "To play hookey / a truant", malagasy: "Manao kilavaka amin'ny fianarana" },
              { english: "To drop out of school", malagasy: "Mijanona / Miala mianatra" },
              { english: "To be intelligent / to be smart", malagasy: "Mahay / Kinga saina" },
              { english: "To buckle down", malagasy: "Miasa tsara" },
              { english: "To take an exam", malagasy: "Manao fanadinana" },
              { english: "To sit for an exam", malagasy: "Manao fanadinana" },
              { english: "To take a test / a competitive exam", malagasy: "Manao fifaninana" },
              { english: "To fail", malagasy: "Tsy tafita" },
              { english: "To succeed", malagasy: "Tafita" },
              { english: "To reach one's goal", malagasy: "Mahatratra tanjona" },
              { english: "To discourage", malagasy: "Manakivy olona" },
              { english: "To encourage", malagasy: "Mampirisika olona" },
            ],
          },
          {
            id: "ch1-l20-c7",
            type: "examples",
            title: "Fanantenana sy fahaizana",
            examples: [
              { english: "To have high hopes of sth", malagasy: "Manana fanantenana" },
              { english: "To have a glimmer of hope", malagasy: "Manana fanantenana kely" },
              { english: "To have a dashed hope", malagasy: "Tsy manana fanantenana" },
              { english: "To be realistic", malagasy: "Olona mahay mandahatra tsara" },
              { english: "To be illiterate", malagasy: "Olona tsy mahay taratasy" },
              { english: "To be intellectual", malagasy: "Olona nianatra" },
              { english: "To be dull", malagasy: "Olona bado / Donto" },
              { english: "To make a decision", malagasy: "Manapa-kevitra" },
              { english: "To take a decision", malagasy: "Mandray fanapahan-kevitra" },
              { english: "To take something into account", malagasy: "Mandinika momba ny zavatra iray" },
              { english: "To take something into consideration", malagasy: "Mampisy zavatra iray" },
              { english: "To figure something out", malagasy: "Mieritreritra" },
              { english: "To chew something over", malagasy: "Mandinika" },
            ],
          },
          {
            id: "ch1-l20-c8",
            type: "examples",
            title: "Teny farany",
            examples: [
              { english: "Don't bank on it!", malagasy: "Aza miankina amin'izany!" },
              { english: "Behave yourself!", malagasy: "Miendre tsara!" },
              { english: "To have a strong desire to + Vinf", malagasy: "Manana hafanam-po lehibe" },
              { english: "To come clean to someone", malagasy: "Milaza ny marina" },
              { english: "To be flabbergasted / staggered", malagasy: "Gaga" },
              { english: "Easy does it!", malagasy: "Moramora!" },
              { english: "To hold hands", malagasy: "Mifamihina" },
              { english: "To tie the knot / get hitched", malagasy: "Maka vady" },
              { english: "To pop the question", malagasy: "Mangata-bady" },
              { english: "To tag along / to follow", malagasy: "Manaradia" },
              { english: "To be a strumpet / bitch", malagasy: "Makorely" },
              { english: "To woo", malagasy: "Mikoty / Manjengy" },
              { english: "To hit on sb / to flirt on sb", malagasy: "Mikoty" },
              { english: "To be a mooch", malagasy: "Tsy mahavelona tena" },
            ],
          },
          {
            id: "ch1-l20-c9",
            type: "examples",
            title: "Fanajana sy fahasahiana",
            examples: [
              { english: "To bite the dust", malagasy: "Maty" },
              { english: "To kick the bucket", malagasy: "Maty" },
              { english: "To miss the point / misunderstand", malagasy: "Tsy mahazo resaka" },
              { english: "To pull someone's leg", malagasy: "Misangisangy" },
              { english: "To throw up / to vomit", malagasy: "Mandoa" },
              { english: "Knock on wood!", malagasy: "Sagnatria!" },
              { english: "To swear / to vow", malagasy: "Mifanta / Mivoady" },
              { english: "To be dolled up", malagasy: "Mitafy tsara" },
              { english: "To be nude / to be naked", malagasy: "Mipolaka / Miboridana" },
              { english: "To be disappointed", malagasy: "Diso fanantenana" },
              { english: "To smile / to laugh", malagasy: "Mitsiky / Mimoeky" },
              { english: "Buzz off! / Get lost!", malagasy: "Mandihana any!" },
            ],
            },
          ],
        },
        ...levelAStructuredLessons,
        premiumStructuredLessons[0],
      ],
  },
  {
    id: "ch2",
    title: "Chapitre 2",
    subtitle: "Niv 2 — Intermédiaire",
    level: "B1–B2",
    color: "#FFE9D2",
    emoji: "📗",
    lessons: [
            // ============================================================
        // ===== LEÇON 1 (Ch2) — Comparatives & Superlatives =====
        // ============================================================
        {
          id: "ch2-l1",
          chapterId: "ch2",
          title: "Comparatives & Superlatives",
          subtitle: "Fampitahana sy fanandratana",
          duration: "16 min",
          cards: [
            {
              id: "ch2-l1-c1",
              type: "explanation",
              title: "Fanazavana",
              englishTitle: "COMPARATIVE",
              malagasyExplanation:
                "Ny comparative dia ampiasaina rehefa mampitaha zavatra roa " +
                "na olona roa. Misy karazany efatra: " +
                "(1) short adj + er + than, " +
                "(2) more + long adj + than, " +
                "(3) less + adj + than, " +
                "(4) as + adj + as.",
            },
            {
              id: "ch2-l1-c2",
              type: "formula",
              title: "Formule — Short adjectives",
              formula:
                "S + short ADJ (ER / IER) + THAN",
              malagasyExplanation:
                "Ho an'ny adjectif fohy (tall, fast, big, clean), " +
                "ampiana \"er\" na \"ier\" ary ampiarahina amin'ny \"than\".",
            },
            {
              id: "ch2-l1-c3",
              type: "examples",
              title: "Ohatra — Short adjectives",
              examples: [
                { english: "He is taller than his sister", malagasy: "Lava noho ny anabaviny izy" },
                { english: "My car is faster than yours", malagasy: "Haingana noho ny anao ny fiarako" },
                { english: "I am bigger than you", malagasy: "Lehibe noho ianao aho" },
                { english: "My room is cleaner than yours", malagasy: "Madio noho ny anao ny efitranoko" },
              ],
            },
            {
              id: "ch2-l1-c4",
              type: "formula",
              title: "Formule — Long adjectives",
              formula:
                "S + MORE + long ADJ + THAN",
              malagasyExplanation:
                "Ho an'ny adjectif lava (intelligent, important, difficult), " +
                "ampiasaina ny \"more\" alohany ary \"than\" aoriany.",
            },
            {
              id: "ch2-l1-c5",
              type: "examples",
              title: "Ohatra — Long adjectives",
              examples: [
                { english: "I am more intelligent than him", malagasy: "Mahay noho izy aho" },
                { english: "English is more important than French", malagasy: "Manan-danja noho ny frantsay ny anglisy" },
                { english: "Chinese is more difficult than French", malagasy: "Sarotra noho ny frantsay ny sinoa" },
              ],
            },
            {
              id: "ch2-l1-c6",
              type: "formula",
              title: "Comparative of Inferiority",
              formula:
                "S + LESS + ADJ + THAN",
              malagasyExplanation:
                "Ampiasaina rehefa milaza zavatra \"ambany\" noho ny hafa.",
            },
            {
              id: "ch2-l1-c7",
              type: "examples",
              title: "Ohatra — Inferiority",
              examples: [
                { english: "John is less strong than Mark", malagasy: "Tsy dia matanjaka noho i Mark i John" },
                { english: "My phone is less interesting than yours", malagasy: "Tsy dia mahaliana noho ny anao ny findaiko" },
                { english: "Nela is less beautiful than Nirina", malagasy: "Tsy dia tsara tarehy noho i Nirina i Nela" },
              ],
            },
            {
              id: "ch2-l1-c8",
              type: "formula",
              title: "Comparative of Equality",
              formula:
                "S + AS + ADJ + AS",
              malagasyExplanation:
                "Ampiasaina rehefa milaza zavatra mitovy na mitovy halehibe.",
            },
            {
              id: "ch2-l1-c9",
              type: "examples",
              title: "Ohatra — Equality",
              examples: [
                { english: "Rebecca is as beautiful as Annicet", malagasy: "Mitovy tarehy amin'i Annicet i Rebecca" },
                { english: "You are as cute as your sister", malagasy: "Mitovy amin'ny anabavinao ianao" },
                { english: "Tax is as black as Docteur Love", malagasy: "Mainty toy i Docteur Love i Tax" },
              ],
            },
            {
              id: "ch2-l1-c10",
              type: "formula",
              title: "Comparative of Inequality",
              formula:
                "S + NOT + AS + ADJ + AS",
              malagasyExplanation:
                "Ampiasaina rehefa milaza zavatra tsy mitovy.",
            },
            {
              id: "ch2-l1-c11",
              type: "examples",
              title: "Ohatra — Inequality",
              examples: [
                { english: "You are not as good at speaking Chinese as me", malagasy: "Tsy mahay miteny sinoa toa ahy ianao" },
                { english: "I am not as white as you", malagasy: "Tsy fotsy toa anao aho" },
                { english: "He is not as intelligent as his sister", malagasy: "Tsy mahay toa ny anabaviny izy" },
              ],
            },
            {
              id: "ch2-l1-c12",
              type: "explanation",
              title: "Fanazavana",
              englishTitle: "SUPERLATIVE",
              malagasyExplanation:
                "Ny superlative dia ampiasaina rehefa mampitaha zavatra " +
                "mihoatra ny roa. Misy karazany roa: " +
                "(1) the + short adj + est, " +
                "(2) the most + long adj.",
            },
            {
              id: "ch2-l1-c13",
              type: "formula",
              title: "Formule — Superlative (short)",
              formula:
                "S + THE + short ADJ (EST / IEST) + IN",
              malagasyExplanation:
                "Ho an'ny adjectif fohy: ampiana \"est\" na \"iest\", " +
                "arahin'ny \"in\".",
            },
            {
              id: "ch2-l1-c14",
              type: "examples",
              title: "Ohatra — Superlative (short)",
              examples: [
                { english: "I am the biggest in our class", malagasy: "Izaho no lehibe indrindra ao amin'ny kilasintsika" },
                { english: "She is the tallest in the class", malagasy: "Izy no lava indrindra ao amin'ny kilasy" },
                { english: "My car is the fastest", malagasy: "Ny fiarako no haingana indrindra" },
              ],
            },
            {
              id: "ch2-l1-c15",
              type: "formula",
              title: "Formule — Superlative (long)",
              formula:
                "S + THE MOST + long ADJ + (IN THE)",
              malagasyExplanation:
                "Ho an'ny adjectif lava: ampiasaina ny \"the most\" alohany.",
            },
            {
              id: "ch2-l1-c16",
              type: "examples",
              title: "Ohatra — Superlative (long)",
              examples: [
                { english: "She is the most beautiful in our class", malagasy: "Izy no tsara tarehy indrindra ao amin'ny kilasintsika" },
                { english: "He is the most intelligent in your time", malagasy: "Izy no mahay indrindra tamin'ny andronao" },
                { english: "Chinese is the most difficult", malagasy: "Ny sinoa no sarotra indrindra" },
              ],
            },
            {
              id: "ch2-l1-c17",
              type: "note",
              title: "Fanamarihana",
              malagasyExplanation:
                "• Ny adjectif fohy (1-2 silabà) dia mandray \"er / est\".\n" +
                "• Ny adjectif lava (3+ silabà) dia mandray \"more / the most\".\n" +
                "• Adjectif tsy ara-dalàna: good → better / the best, bad → worse / the worst, far → farther / the farthest.",
            },
          ],
        },
        // ===== LEÇON 2 (Ch2) — Irregular verbs =====
        niv2StructuredLessons[0],
        // ===== LEÇON 3 (Ch2) — Present Perfect =====
        {
          id: "ch2-l3",
          chapterId: "ch2",
          title: "Present Perfect",
          subtitle: "Les actions passées liées au présent",
          duration: "18 min",
          cards: [
            {
              id: "ch2-l3-c1",
              type: "explanation",
              title: "Fanazavana",
              englishTitle: "PRESENT PERFECT TENSE",
              malagasyExplanation:
                "Ny present perfect dia ampiasaina hilazana hetsika nitranga taloha " +
                "nefa tsy voafaritra ny fotoana, na hetsika vao vita izay mbola misy " +
                "fiantraikany amin'ny ankehitriny.",
            },
            {
              id: "ch2-l3-c2",
              type: "formula",
              title: "Formule — Affirmative",
              formula: "S + HAVE / HAS + PAST PARTICIPLE + O",
              malagasyExplanation:
                "Ampiasao have amin'ny I, you, we, they ary has amin'ny he, she, it.",
            },
            {
              id: "ch2-l3-c3",
              type: "examples",
              title: "Ohatra — Actions avant maintenant",
              examples: [
                { english: "I have been to Canada.", malagasy: "Efa tany Canada aho." },
                { english: "He has bought a new phone.", malagasy: "Nividy finday vaovao izy." },
                { english: "They have been to school.", malagasy: "Efa tany an-tsekoly izy ireo." },
                { english: "My mother has visited me.", malagasy: "Efa namangy ahy ny reniko." },
              ],
            },
            {
              id: "ch2-l3-c4",
              type: "formula",
              title: "Formule — Interrogative",
              formula: "HAVE / HAS + S + PAST PARTICIPLE + O ?",
              malagasyExplanation: "Atao eo alohan'ny sujet ny have na has rehefa mametraka fanontaniana.",
            },
            {
              id: "ch2-l3-c5",
              type: "examples",
              title: "Ohatra — Questions",
              examples: [
                { english: "Have I seen you?", malagasy: "Efa nahita anao ve aho?" },
                { english: "Has she called you?", malagasy: "Efa niantso anao ve izy?" },
                { english: "Have they passed by here?", malagasy: "Efa nandalo teto ve izy ireo?" },
              ],
            },
            {
              id: "ch2-l3-c6",
              type: "formula",
              title: "Formule — Negative",
              formula: "S + HAVEN'T / HASN'T + PAST PARTICIPLE + O",
              malagasyExplanation: "Ampiasao haven't na hasn't rehefa milaza fa tsy mbola nitranga ilay hetsika.",
            },
            {
              id: "ch2-l3-c7",
              type: "examples",
              title: "Ohatra — Negatives",
              examples: [
                { english: "I haven't seen you.", malagasy: "Tsy mbola nahita anao aho." },
                { english: "He hasn't bought a new phone.", malagasy: "Tsy mbola nividy finday vaovao izy." },
                { english: "They haven't gone there.", malagasy: "Tsy mbola nandeha tany izy ireo." },
              ],
            },
            {
              id: "ch2-l3-c8",
              type: "vocabulary",
              title: "Keywords",
              examples: [
                { english: "just — She has just arrived.", malagasy: "vao avy — Vao tonga izy." },
                { english: "already — I have already finished.", malagasy: "efa — Efa vitaiko." },
                { english: "ever — Have you ever been to Canada?", malagasy: "efa mba — Efa mba tany Canada ve ianao?" },
                { english: "yet — I haven't finished yet.", malagasy: "mbola — Tsy mbola vita." },
                { english: "never — I have never seen you.", malagasy: "mbola tsy — Tsy mbola nahita anao aho." },
                { english: "since / for", malagasy: "nanomboka tamin'ny / nandritra ny" },
                { english: "recently / lately", malagasy: "vao haingana / tato ho ato" },
              ],
            },
            {
              id: "ch2-l3-c9",
              type: "examples",
              title: "Ohatra — Keywords",
              examples: [
                { english: "She has just arrived at the office.", malagasy: "Vao tonga tao amin'ny birao izy." },
                { english: "I have already finished my homework.", malagasy: "Efa vitako ny devoara." },
                { english: "Have you ever been to Canada?", malagasy: "Efa mba tany Canada ve ianao?" },
                { english: "She has lived here since 2020.", malagasy: "Efa nipetraka teto izy nanomboka tamin'ny 2020." },
                { english: "They have been friends for ten years.", malagasy: "Efa mpinamana nandritra ny folo taona izy ireo." },
              ],
            },
          ],
          sourcePages: niv2PdfPages,
        },
        // PDF lessons 4–33 reconstructed as pedagogical cards.
        ...niv2StructuredLessons.slice(1),
        premiumStructuredLessons[1],
          ],
    },

    // ============================================================
    // CHAPITRE 3 — NIV 3
    // ============================================================
    {
      id: "ch3",
      title: "Chapitre 3",
      subtitle: "Niv 3 — Avancé",
      level: "B2–C1",
      color: "#E4F6E8",
      emoji: "📙",
      lessons: [
        ...niv3StructuredLessons,
        premiumStructuredLessons[2],
      ],
    },
];

// ============================================================
// Helpers
// ============================================================
export function getChapter(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getLesson(chapterId: string, lessonId: string): LessonV2 | undefined {
  const chapter = getChapter(chapterId);
  return chapter?.lessons.find((l) => l.id === lessonId);
}

export function getLessonById(lessonId: string): LessonV2 | undefined {
  for (const chapter of chapters) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getChapterOfLesson(lessonId: string): Chapter | undefined {
  for (const chapter of chapters) {
    if (chapter.lessons.some((l) => l.id === lessonId)) return chapter;
  }
  return undefined;
}
