import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import * as Speech from "expo-edge-speech";
import { ScreenContainer } from "@/components/screen-container";

export default function TestVoiceScreen() {
  const [status, setStatus] = useState("Ready");

  const speak = async () => {
    setStatus("Loading...");
    try {
      await Speech.speak("Hello, my name is AmeriTalk. Welcome to our English class!", {
        voice: "en-US-GuyNeural",
      });
      setStatus("✅ Success!");
    } catch (e: any) {
      setStatus("❌ Error: " + e.message);
    }
  };

  return (
    <ScreenContainer containerClassName="bg-[#131A20]">
      <View style={styles.container}>
        <Text style={styles.title}>Test Voice</Text>
        <Text style={styles.status}>{status}</Text>
        <Pressable onPress={speak} style={styles.button}>
          <Text style={styles.buttonText}>🔊 Speak</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { color: "#FFF", fontSize: 24, fontWeight: "900", marginBottom: 20 },
  status: { color: "#5BE58C", fontSize: 14, marginBottom: 20, textAlign: "center" },
  button: { backgroundColor: "#5BE58C", paddingHorizontal: 30, paddingVertical: 15, borderRadius: 12 },
  buttonText: { color: "#0B1116", fontSize: 16, fontWeight: "900" },
});