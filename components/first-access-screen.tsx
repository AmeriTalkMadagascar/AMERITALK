import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { duo } from "@/constants/design";
import { useAppState } from "@/lib/app-state";

export function FirstAccessScreen() {
  const { registerUser } = useAppState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Saisis ton nom et ton prénom pour continuer.");
      return;
    }
    registerUser(firstName, lastName);
  };

  return (
    <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "bottom", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.icon}><MaterialIcons name="school" size={34} color={duo.gold} /></View>
        <Text style={styles.kicker}>BIENVENUE SUR AMERITALK</Text>
        <Text style={styles.title}>Commençons ton parcours</Text>
        <Text style={styles.subtitle}>Indique ton nom et ton prénom pour accéder à l'application.</Text>
        <TextInput value={firstName} onChangeText={setFirstName} placeholder="Prénom" placeholderTextColor="#7F8B92" autoCapitalize="words" style={styles.input} />
        <TextInput value={lastName} onChangeText={setLastName} placeholder="Nom" placeholderTextColor="#7F8B92" autoCapitalize="words" style={styles.input} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable onPress={submit} style={styles.button}><Text style={styles.buttonText}>Accéder à l'application</Text><MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" /></Pressable>
        <Text style={styles.note}>Ces informations servent uniquement à identifier ton profil d'apprentissage.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  icon: { width: 76, height: 76, borderRadius: 38, backgroundColor: duo.surface, borderWidth: 2, borderColor: duo.gold, alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 20 },
  kicker: { color: duo.gold, fontSize: 10, fontWeight: "900", letterSpacing: 1.5, textAlign: "center" },
  title: { color: "#FFFFFF", fontSize: 27, fontWeight: "900", textAlign: "center", marginTop: 8 },
  subtitle: { color: duo.muted, fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 8, marginBottom: 24 },
  input: { backgroundColor: duo.surface, borderRadius: 13, borderWidth: 1, borderColor: "#3A4850", color: "#FFFFFF", paddingHorizontal: 14, paddingVertical: 14, fontSize: 14, marginBottom: 10 },
  error: { color: "#FF8A80", fontSize: 11, marginBottom: 10 },
  button: { backgroundColor: duo.blue, borderRadius: 13, minHeight: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 },
  buttonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  note: { color: "#74818A", fontSize: 10, lineHeight: 15, textAlign: "center", marginTop: 16 },
});
