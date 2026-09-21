import { Head, Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { duo } from "@/constants/design";

export default function AboutScreen() {
  return (
    <>
      <Head>
        <title>Erica Vazahgasy Fabiola — Fondatrice d’Ameritalk</title>
        <meta
          name="description"
          content="Erica Vazahgasy Fabiola est la fondatrice d’Ameritalk, une application dédiée à l’apprentissage de l’anglais."
        />
        <meta property="og:title" content="Erica Vazahgasy Fabiola — Fondatrice d’Ameritalk" />
        <meta
          property="og:description"
          content="Découvrez Erica Vazahgasy Fabiola, fondatrice d’Ameritalk, et le projet de l’application d’apprentissage de l’anglais."
        />
        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content="Erica" />
        <meta property="profile:last_name" content="Vazahgasy Fabiola" />
      </Head>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>À PROPOS D’AMERITALK</Text>
          <Text style={styles.title}>Erica Vazahgasy Fabiola</Text>
          <Text style={styles.role}>Fondatrice d’Ameritalk</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>La fondatrice</Text>
          <Text style={styles.body}>
            Erica Vazahgasy Fabiola est la fondatrice d’Ameritalk. Elle habite à Mananara Nord et porte le projet d’une application qui rend l’apprentissage de l’anglais plus accessible, pratique et autonome.
          </Text>
          <Text style={styles.body}>
            Pour la création du site et de l’application Ameritalk, Erica collabore avec Kevino Totozafy, créateur du site Matour Guide Madagascar.
          </Text>
          <Link href="https://matourguidemadagascar.com/Kevino.html" style={styles.link} target="_blank">
            Découvrir Kevino Totozafy
          </Link>
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>Ameritalk</Text>
          <Text style={styles.body}>
            Ameritalk propose des leçons, des exercices et de la pratique pour progresser en anglais depuis Madagascar et partout dans le monde.
          </Text>
          <Link href="/" style={styles.link}>Retour à Ameritalk</Link>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: duo.bg, padding: 24, gap: 18 },
  hero: { paddingTop: 36, paddingBottom: 18 },
  eyebrow: { color: duo.green, fontSize: 12, fontWeight: "900", letterSpacing: 1.5 },
  title: { color: "#FFFFFF", fontSize: 32, fontWeight: "900", marginTop: 12 },
  role: { color: duo.muted, fontSize: 17, fontWeight: "700", marginTop: 8 },
  card: { backgroundColor: duo.surface, borderRadius: 18, padding: 22, borderWidth: 1, borderColor: "#26343D", gap: 14 },
  heading: { color: "#FFFFFF", fontSize: 22, fontWeight: "900" },
  body: { color: duo.muted, fontSize: 16, lineHeight: 25 },
  link: { color: duo.green, fontSize: 15, fontWeight: "800", marginTop: 4 },
});
