import { Stack, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { duo } from "@/constants/design";
import { useAppState } from "@/lib/app-state";
import { generatePremiumCode, normalizeCustomerPhone, openWhatsAppActivationMessage, PREMIUM_LESSONS } from "@/lib/premium";

const ADMIN_PHONE = "0322074387";
const ADMIN_PASSWORD = "Mananara";

export default function AdminScreen() {
  const router = useRouter();
  const { authorizedPremiumLessons, authorizePremiumLesson, revokePremiumLesson, registeredUsers } = useAppState();
  const [phone, setPhone] = useState(ADMIN_PHONE);
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(PREMIUM_LESSONS[0].id);

  const normalizedCustomerPhone = useMemo(() => customerPhone.replace(/\s+/g, "").trim(), [customerPhone]);
  const selectedPremiumLesson = PREMIUM_LESSONS.find((lesson) => lesson.id === selectedLesson) ?? PREMIUM_LESSONS[0];
  const activationCode = normalizedCustomerPhone ? generatePremiumCode(normalizedCustomerPhone, selectedPremiumLesson.id) : "";

  const login = () => {
    if (phone.replace(/\s+/g, "").trim() === ADMIN_PHONE && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Numéro ou mot de passe incorrect.");
    }
  };

  const authorize = () => {
    if (!normalizedCustomerPhone) {
      setError("Saisis le numéro WhatsApp du client.");
      return;
    }
    authorizePremiumLesson(normalizedCustomerPhone, selectedLesson);
    setCustomerPhone("");
    setError("");
  };

  const sendActivation = async () => {
    if (!normalizedCustomerPhone) {
      setError("Saisis le numéro WhatsApp du client avant de générer le code.");
      return;
    }
    authorizePremiumLesson(normalizeCustomerPhone(normalizedCustomerPhone), selectedPremiumLesson.id);
    await openWhatsAppActivationMessage(normalizedCustomerPhone, selectedPremiumLesson, activationCode);
    setError("");
  };

  if (!loggedIn) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "bottom", "left", "right"]}>
          <View style={styles.loginWrap}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={21} color={duo.muted} />
            </Pressable>
            <View style={styles.logoCircle}>
              <MaterialIcons name="admin-panel-settings" size={34} color={duo.gold} />
            </View>
            <Text style={styles.loginTitle}>Espace admin</Text>
            <Text style={styles.loginSubtitle}>Valide les paiements et débloque les leçons premium.</Text>
            <TextInput value={phone} onChangeText={setPhone} placeholder="Numéro admin" placeholderTextColor="#7F8B92" keyboardType="phone-pad" style={styles.input} />
            <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" placeholderTextColor="#7F8B92" secureTextEntry style={styles.input} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable onPress={login} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Se connecter</Text>
            </Pressable>
          </View>
        </ScreenContainer>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "bottom", "left", "right"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <View style={styles.adminHeader}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={21} color={duo.muted} />
            </Pressable>
            <View style={styles.adminHeaderCopy}>
              <Text style={styles.kicker}>ADMINISTRATION</Text>
              <Text style={styles.pageTitle}>Déblocage premium</Text>
            </View>
            <Pressable onPress={() => setLoggedIn(false)} style={styles.logoutButton}>
              <MaterialIcons name="logout" size={18} color={duo.muted} />
            </Pressable>
          </View>

          <View style={styles.infoCard}>
            <MaterialIcons name="verified" size={22} color={duo.green} />
            <Text style={styles.infoText}>Après réception du paiement WhatsApp, saisis le numéro du client puis autorise la leçon achetée.</Text>
          </View>

          <Text style={styles.sectionTitle}>Utilisateurs inscrits ({registeredUsers.length})</Text>
          <View style={styles.usersCard}>
            {registeredUsers.length === 0 ? <Text style={styles.emptyText}>Aucun utilisateur inscrit pour le moment.</Text> : registeredUsers.map((user) => (
              <View key={`${user.firstName}-${user.lastName}-${user.registeredAt}`} style={styles.userRow}>
                <View style={styles.userAvatar}><Text style={styles.userAvatarText}>{user.firstName.charAt(0).toUpperCase()}</Text></View>
                <View style={styles.userCopy}><Text style={styles.userName}>{user.firstName} {user.lastName}</Text><Text style={styles.userDate}>Inscrit le {new Date(user.registeredAt).toLocaleDateString("fr-FR")}</Text></View>
                <MaterialIcons name="person" size={17} color={duo.green} />
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Nouveau paiement</Text>
          <TextInput value={customerPhone} onChangeText={setCustomerPhone} placeholder="Numéro WhatsApp du client" placeholderTextColor="#7F8B92" keyboardType="phone-pad" style={styles.input} />
          <Text style={styles.fieldLabel}>Leçon à débloquer</Text>
          <View style={styles.lessonChoices}>
            {PREMIUM_LESSONS.map((lesson) => (
              <Pressable key={lesson.id} onPress={() => setSelectedLesson(lesson.id)} style={[styles.lessonChoice, selectedLesson === lesson.id && styles.lessonChoiceSelected]}>
                <MaterialIcons name={selectedLesson === lesson.id ? "radio-button-checked" : "radio-button-unchecked"} size={18} color={selectedLesson === lesson.id ? duo.gold : duo.muted} />
                <View style={styles.choiceCopy}><Text style={styles.choiceTitle}>{lesson.chapterTitle} — {lesson.title}</Text><Text style={styles.choicePrice}>{lesson.priceLabel}</Text></View>
              </Pressable>
            ))}
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable onPress={authorize} style={styles.primaryButton}>
            <MaterialIcons name="lock-open" size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Autoriser cette leçon</Text>
          </Pressable>

          {activationCode ? (
            <View style={styles.activationCard}>
              <Text style={styles.activationLabel}>CODE À ENVOYER AU CLIENT</Text>
              <Text style={styles.activationCode}>{activationCode}</Text>
              <Text style={styles.activationHint}>Le code est lié au numéro saisi et à la leçon sélectionnée.</Text>
              <Pressable onPress={() => void sendActivation()} style={styles.whatsappButton}>
                <MaterialIcons name="chat" size={18} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Autoriser et envoyer sur WhatsApp</Text>
              </Pressable>
            </View>
          ) : null}

          <Text style={styles.sectionTitle}>Autorisations enregistrées</Text>
          {Object.entries(authorizedPremiumLessons).filter(([, lessonIds]) => lessonIds.length > 0).map(([client, lessonIds]) => (
            <View key={client} style={styles.clientCard}>
              <View style={styles.clientHeader}><MaterialIcons name="person" size={19} color={duo.blue} /><Text style={styles.clientPhone}>{client}</Text></View>
              {lessonIds.map((lessonId) => {
                const lesson = PREMIUM_LESSONS.find((item) => item.id === lessonId);
                if (!lesson) return null;
                return <View key={lessonId} style={styles.authorizationRow}><Text style={styles.authorizationText}>{lesson.chapterTitle} — {lesson.title}</Text><Pressable onPress={() => revokePremiumLesson(client, lessonId)}><Text style={styles.revokeText}>Retirer</Text></Pressable></View>;
              })}
            </View>
          ))}
          {Object.values(authorizedPremiumLessons).every((items) => items.length === 0) ? <Text style={styles.emptyText}>Aucune autorisation pour le moment.</Text> : null}
        </ScrollView>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  loginWrap: { flex: 1, justifyContent: "center", padding: 24 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: duo.surface, alignItems: "center", justifyContent: "center" },
  logoCircle: { width: 76, height: 76, borderRadius: 38, backgroundColor: duo.surface, borderWidth: 2, borderColor: duo.gold, alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 18 },
  loginTitle: { color: "#FFFFFF", fontSize: 27, fontWeight: "900", textAlign: "center" },
  loginSubtitle: { color: duo.muted, fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 7, marginBottom: 24 },
  input: { backgroundColor: duo.surface, borderRadius: 13, borderWidth: 1, borderColor: "#3A4850", color: "#FFFFFF", paddingHorizontal: 14, paddingVertical: 13, fontSize: 13, marginBottom: 10 },
  error: { color: "#FF8A80", fontSize: 11, marginBottom: 10 },
  primaryButton: { backgroundColor: duo.blue, borderRadius: 13, minHeight: 48, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 5 },
  primaryButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  activationCard: { backgroundColor: "#19382B", borderRadius: 15, padding: 14, marginTop: 12, borderWidth: 1, borderColor: duo.green },
  activationLabel: { color: duo.green, fontSize: 10, fontWeight: "900", letterSpacing: 1.1 },
  activationCode: { color: "#FFFFFF", fontSize: 25, fontWeight: "900", letterSpacing: 2, marginTop: 8, textAlign: "center" },
  activationHint: { color: "#D9F6E5", fontSize: 10, lineHeight: 15, marginTop: 7, marginBottom: 10, textAlign: "center" },
  whatsappButton: { backgroundColor: "#25D366", borderRadius: 12, minHeight: 44, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  content: { padding: 18, paddingBottom: 60 },
  adminHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 18 },
  adminHeaderCopy: { flex: 1 },
  kicker: { color: duo.gold, fontSize: 9, fontWeight: "900", letterSpacing: 1.2 },
  pageTitle: { color: "#FFFFFF", fontSize: 21, fontWeight: "900", marginTop: 3 },
  logoutButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: duo.surface, alignItems: "center", justifyContent: "center" },
  infoCard: { backgroundColor: "#19382B", borderRadius: 15, padding: 14, flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 22 },
  infoText: { flex: 1, color: "#D9F6E5", fontSize: 11, lineHeight: 16 },
  sectionTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "900", marginTop: 8, marginBottom: 11 },
  fieldLabel: { color: duo.muted, fontSize: 10, fontWeight: "800", marginTop: 3, marginBottom: 8 },
  lessonChoices: { gap: 8, marginBottom: 13 },
  lessonChoice: { backgroundColor: duo.surface, borderRadius: 13, padding: 12, flexDirection: "row", alignItems: "center", gap: 9, borderWidth: 1, borderColor: "transparent" },
  lessonChoiceSelected: { borderColor: duo.gold },
  choiceCopy: { flex: 1 },
  choiceTitle: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },
  choicePrice: { color: duo.gold, fontSize: 10, fontWeight: "900", marginTop: 3 },
  clientCard: { backgroundColor: duo.surface, borderRadius: 15, padding: 13, marginBottom: 9 },
  clientHeader: { flexDirection: "row", alignItems: "center", gap: 7, paddingBottom: 9, borderBottomWidth: 1, borderBottomColor: "#35434B" },
  clientPhone: { color: "#FFFFFF", fontSize: 13, fontWeight: "900" },
  authorizationRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, paddingTop: 10 },
  authorizationText: { color: "#D3DBE0", fontSize: 10, flex: 1 },
  revokeText: { color: "#FF8A80", fontSize: 10, fontWeight: "900" },
  emptyText: { color: duo.muted, fontSize: 11, fontStyle: "italic" },
  usersCard: { backgroundColor: duo.surface, borderRadius: 15, padding: 12, marginBottom: 12 },
  userRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#35434B" },
  userAvatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: duo.blue, alignItems: "center", justifyContent: "center" },
  userAvatarText: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  userCopy: { flex: 1 },
  userName: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  userDate: { color: duo.muted, fontSize: 9, marginTop: 2 },
});
