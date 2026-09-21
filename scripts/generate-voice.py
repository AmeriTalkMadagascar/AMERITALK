"""
AmeriTalk — Script de génération des audios avec voix masculine naturelle
Utilise Edge TTS (Microsoft) — 100% gratuit
"""

import asyncio
import edge_tts
import os
from pathlib import Path

# ============================================================
# CONFIGURATION
# ============================================================
VOICE = "en-US-AndrewNeural"  # Voix masculine naturelle
RATE = "-5%"                   # Légèrement plus lent = plus naturel
PITCH = "+0Hz"                 # Pitch normal

# Dossier de sortie
OUTPUT_FOLDER = Path(__file__).parent.parent / "assets" / "audio" / "voice"

# ============================================================
# PHRASES À GÉNÉRER
# ============================================================
# Format : "nom-du-fichier" : "texte à prononcer"
PHRASES = {
    # ---------- Leçon 1 : Greetings ----------
    "ch1-l1-greeting-good-morning": "Good morning!",
    "ch1-l1-greeting-good-afternoon": "Good afternoon!",
    "ch1-l1-greeting-good-evening": "Good evening!",
    "ch1-l1-greeting-hi": "Hi!",
    "ch1-l1-greeting-hello": "Hello!",
    "ch1-l1-how-are-you": "How are you?",
    "ch1-l1-i-am-fine": "I am fine thanks",
    "ch1-l1-and-you": "And you?",
    "ch1-l1-mon": "Monday",
    "ch1-l1-tue": "Tuesday",
    "ch1-l1-wed": "Wednesday",
    "ch1-l1-thu": "Thursday",
    "ch1-l1-fri": "Friday",
    "ch1-l1-sat": "Saturday",
    "ch1-l1-sun": "Sunday",

    # ---------- Leçon 2 : Asking somebody's name ----------
    "ch1-l2-whats-your-name": "What's your name please?",
    "ch1-l2-my-name-is": "My name is Ericka. And you?",
    "ch1-l2-nice-to-meet": "Nice to meet you",
    "ch1-l2-nice-too": "Nice to meet you too",
    "ch1-l2-where-from": "Where are you from?",
    "ch1-l2-i-am-from-mananara": "I am from Mananara",
    "ch1-l2-where-live": "Where do you live?",
    "ch1-l2-i-live-with": "I live with my brother",

    # ---------- Leçon 3 : Siblings ----------
    "ch1-l3-how-many-siblings": "How many brothers or sisters do you have?",
    "ch1-l3-i-have-one": "I have one brother and two sisters",
    "ch1-l3-only-child": "I am an only child",
    "ch1-l3-where-going": "Where are you going now?",
    "ch1-l3-going-school": "I am going to school",
    "ch1-l3-how-long-living": "How long have you been living here?",
    "ch1-l3-two-years": "For two years",

    # ---------- Leçon 4 : Adjectives & TO HAVE ----------
    "ch1-l4-stuffed": "To be stuffed",
    "ch1-l4-lazy": "To be lazy",
    "ch1-l4-angry": "To be angry with someone",
    "ch1-l4-hungry": "To be hungry",
    "ch1-l4-crazy": "To be crazy",
    "ch1-l4-afraid": "To be afraid of",
    "ch1-l4-i-have-four-pens": "I have four pens",
    "ch1-l4-do-you-have-money": "Do you have money?",
    "ch1-l4-she-has-five-brothers": "She has five brothers",
    "ch1-l4-talk-later": "Talk to you later",
    "ch1-l4-take-care": "Take care",
    "ch1-l4-see-you-soon": "See you soon",
    "ch1-l4-come-on-in": "Come on in",
    "ch1-l4-sit-down": "Sit down please",
    "ch1-l4-have-nice-trip": "Have a nice trip",
    "ch1-l4-drive-safely": "Drive safely",

    # ---------- Leçon 5 : Weather & Family ----------
    "ch1-l5-sun": "Sun",
    "ch1-l5-sunny": "Sunny",
    "ch1-l5-rain": "Rain",
    "ch1-l5-raining": "Raining",
    "ch1-l5-wind": "Wind",
    "ch1-l5-windy": "Windy",
    "ch1-l5-cloud": "Cloud",
    "ch1-l5-cloudy": "Cloudy",
    "ch1-l5-thunder": "Thunderbolts",
    "ch1-l5-cold": "To be cold",
    "ch1-l5-hot": "To be hot",
    "ch1-l5-fog": "Fog",
    "ch1-l5-hail": "Hail",
    "ch1-l5-sister": "She is my sister",
    "ch1-l5-brother": "He is my brother",
    "ch1-l5-mother": "She is my mother",
    "ch1-l5-father": "He is my father",
    "ch1-l5-grandmother": "She is my grandmother",
    "ch1-l5-grandfather": "He is my grandfather",
    "ch1-l5-uncle": "He is my uncle",
    "ch1-l5-aunt": "She is my aunt",
    "ch1-l5-son": "He is my son",
    "ch1-l5-daughter": "She is my daughter",

    # ---------- Leçon 6 : Family & Numbers ----------
    "ch1-l6-husband": "He is my husband",
    "ch1-l6-wife": "She is my wife",
    "ch1-l6-boyfriend": "He is my boyfriend",
    "ch1-l6-girlfriend": "She is my girlfriend",
    "ch1-l6-friend": "He is my friend",
    "ch1-l6-classmate": "She is my classmate",
    "ch1-l6-neighbor": "He is my neighbor",
    "ch1-l6-workmate": "He is my workmate",
    "ch1-l6-zero": "Zero",
    "ch1-l6-one": "One",
    "ch1-l6-two": "Two",
    "ch1-l6-three": "Three",
    "ch1-l6-four": "Four",
    "ch1-l6-five": "Five",
    "ch1-l6-six": "Six",
    "ch1-l6-seven": "Seven",
    "ch1-l6-eight": "Eight",
    "ch1-l6-nine": "Nine",
    "ch1-l6-ten": "Ten",

    # ---------- Leçon 7 : Health ----------
    "ch1-l7-flu": "I have a flu",
    "ch1-l7-fever": "I have a fever",
    "ch1-l7-headache": "I have a headache",
    "ch1-l7-toothache": "I have a toothache",
    "ch1-l7-stomachache": "I have a stomachache",
    "ch1-l7-sore-throat": "I have a sore throat",
    "ch1-l7-study-every-day": "I study every day",
    "ch1-l7-she-drinks": "She drinks alcohol every day",
    "ch1-l7-sun-rises": "The sun rises in the east",
    "ch1-l7-always": "Always",
    "ch1-l7-often": "Often",
    "ch1-l7-sometimes": "Sometimes",
    "ch1-l7-usually": "Usually",

    # ---------- Phrases modèles (pour les exercices) ----------
    "model-hello-vanna": "Hello, my name is Vanna.",
    "model-from-mananara": "I am from Mananara Nord.",
    "model-nice-erica": "Nice to meet you, Ericka.",
    "model-study-lycee": "I study at Lycée Mananara Nord.",
    "model-welcome-ameritalk": "Welcome to AmeriTalk!",
    "model-coffee-please": "Could I have a coffee, please?",
    "model-some-water": "Could I have some water?",
    "model-see-menu": "Can I see the menu, please?",
    "model-have-bill": "Could we have the bill?",
    "model-waiting-vanna": "I am waiting for Vanna.",
    "model-she-from": "She is from Analagnampotsy.",
    "model-meeting-nine": "I have a meeting at nine.",
    "model-deadline-friday": "The deadline is Friday.",
    "model-review-project": "Let's review the project.",
    "model-send-feedback": "I will send my feedback.",
    "model-improve-program": "We can improve the program.",
}

# ============================================================
# FONCTION DE GÉNÉRATION
# ============================================================
async def generate_one(name: str, text: str) -> bool:
    """Génère un fichier audio."""
    output = OUTPUT_FOLDER / f"{name}.mp3"
    try:
        communicate = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
        await communicate.save(str(output))
        return True
    except Exception as e:
        print(f"❌ ERREUR sur '{name}': {e}")
        return False

async def main():
    print("🎤 AmeriTalk — Génération des audios")
    print(f"   Voix : {VOICE}")
    print(f"   Débit : {RATE}")
    print(f"   Dossier : {OUTPUT_FOLDER}")
    print(f"   Total : {len(PHRASES)} fichiers")
    print("=" * 60)

    # Créer le dossier
    OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

    # Générer tout
    success = 0
    fail = 0
    for i, (name, text) in enumerate(PHRASES.items(), 1):
        ok = await generate_one(name, text)
        if ok:
            success += 1
            print(f"✅ [{i}/{len(PHRASES)}] {name}")
        else:
            fail += 1

    print("=" * 60)
    print(f"🎉 Terminé !")
    print(f"   ✅ Succès : {success}")
    print(f"   ❌ Échecs : {fail}")

if __name__ == "__main__":
    asyncio.run(main())