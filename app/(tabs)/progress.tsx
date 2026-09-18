import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Linking from "expo-linking";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";

// ============================================================
// PROGRESS PAGE — AmeriTalk Presentation (Glassmorphism)
// ============================================================

const PHONE_1 = "261322074387";
const PHONE_2 = "261382114839";

// ============================================================
// GLASS DESIGN TOKENS
// ============================================================
const glass = {
  cardBg: "rgba(255, 255, 255, 0.08)",
  cardBorder: "rgba(255, 255, 255, 0.18)",
  cardBorderStrong: "rgba(255, 255, 255, 0.28)",
  bgTop: "#2A1B4A",
  accentGreen: "#5BE58C",
  accentGold: "#FFD75E",
  accentBlue: "#6EC6FF",
  accentPink: "#FF8FB8",
  accentPurple: "#C89BFF",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.75)",
  textMuted: "rgba(255, 255, 255, 0.55)",
} as const;

// ============================================================
// IMAGES
// ============================================================
const CEO_IMAGE = require("@/assets/images/ceo-ericka.png");
const PROMO_IMAGE = require("@/assets/images/promo-ameritalk.png");

// ============================================================
// COMPONENT
// ============================================================
export default function ProgressScreen() {
  const openWhatsApp = async (phone: string, message: string) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(url);
    } catch {
      await Linking.openURL(
        `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`
      );
    }
  };

  const contactMessage = (number: string) =>
    `Hello AmeriTalk 👋\n\nI found your app and I'd like to enroll in your English courses.\n\nCould you please give me more information?\n\nThank you! (via ${number})`;

  return (
    <ScreenContainer containerClassName="bg-[#131A20]" edges={["top", "left", "right"]}>
      {/* ===== BACKGROUND ===== */}
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <View style={[styles.bgLayer, { backgroundColor: glass.bgTop }]} />
        <View style={[styles.bgBlob, styles.bgBlob1]} />
        <View style={[styles.bgBlob, styles.bgBlob2]} />
        <View style={[styles.bgBlob, styles.bgBlob3]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <Text style={styles.headerKicker}>AMERITALK MADAGASCAR</Text>
          <Text style={styles.headerTitle}>In a league of our own</Text>
          <View style={styles.headerLine} />
        </View>

        {/* ===== PROMO PHOTO ===== */}
        <View style={styles.promoCard}>
          <Image source={PROMO_IMAGE} style={styles.promoImage} resizeMode="cover" />
        </View>

        {/* ===== QUOTE ===== */}
        <View style={[styles.glassCard, styles.quoteCard]}>
          <Text style={styles.quoteEmoji}>💬</Text>
          <Text style={styles.quoteText}>
            "Nobody ever regretted learning English."
          </Text>
          <Text style={styles.quoteSubtext}>
            The only regret is not starting sooner. 😉
          </Text>
        </View>

        {/* ===== 100% SPOKEN ENGLISH ===== */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBubble, { backgroundColor: "rgba(91, 229, 140, 0.2)" }]}>
              <MaterialIcons name="record-voice-over" size={20} color={glass.accentGreen} />
            </View>
            <Text style={styles.cardTitle}>100% SPOKEN ENGLISH</Text>
          </View>
          <Text style={styles.cardBody}>
            At AmeriTalk, we don't just read English.{"\n\n"}
            We <Text style={styles.boldGreen}>SPEAK</Text> it. Full immersion from day one, in
            a warm and friendly atmosphere. Because a language is meant to be lived, not just
            studied. 😄
          </Text>
        </View>

        {/* ===== CEO MESSAGE ===== */}
        <View style={[styles.glassCard, styles.ceoCard]}>
          <View style={styles.ceoPhotoLargeWrap}>
            <Image source={CEO_IMAGE} style={styles.ceoPhotoLarge} resizeMode="cover" />
            <View style={styles.ceoPhotoBadge}>
              <MaterialIcons name="verified" size={16} color={glass.accentGold} />
            </View>
          </View>

          <View style={styles.ceoInfoCentered}>
            <Text style={styles.ceoName}>Mr Ericka Vazahgasy</Text>
            <Text style={styles.ceoRole}>CEO — AmeriTalk Madagascar</Text>
          </View>

          <View style={styles.ceoQuote}>
            <Text style={styles.ceoQuoteText}>
              "My advice: don't overthink it. Sign up, speak, and laugh at your mistakes.
              That's how you grow! 😄"
            </Text>
          </View>
        </View>

        {/* ===== CERTIFICATE ===== */}
        <View style={[styles.glassCard, styles.certCard]}>
          <View style={[styles.iconBubbleLarge, { backgroundColor: "rgba(255, 215, 94, 0.2)" }]}>
            <MaterialIcons name="workspace-premium" size={28} color={glass.accentGold} />
          </View>
          <View style={styles.certCopy}>
            <Text style={styles.certKicker}>CERTIFICATE</Text>
            <Text style={styles.certTitle}>International AmeriTalk TEFL/TESOL</Text>
            <Text style={styles.certText}>
              Recognized. Valid. The real deal. 😎{"\n"}
              Finish your training and walk away with a certificate that opens doors.
            </Text>
          </View>
        </View>

        {/* ===== LOCATIONS ===== */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBubble, { backgroundColor: "rgba(255, 143, 184, 0.2)" }]}>
              <MaterialIcons name="place" size={20} color={glass.accentPink} />
            </View>
            <Text style={styles.cardTitle}>OUR LOCATIONS</Text>
          </View>

          <View style={styles.locationRow}>
            <View style={[styles.locationIcon, { backgroundColor: "rgba(110, 198, 255, 0.18)" }]}>
              <MaterialIcons name="location-city" size={18} color={glass.accentBlue} />
            </View>
            <View style={styles.locationCopy}>
              <Text style={styles.locationName}>Mananara Nord</Text>
              <Text style={styles.locationDetail}>AmeriTalk Center</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <View style={[styles.locationIcon, { backgroundColor: "rgba(110, 198, 255, 0.18)" }]}>
              <MaterialIcons name="location-city" size={18} color={glass.accentBlue} />
            </View>
            <View style={styles.locationCopy}>
              <Text style={styles.locationName}>Androkaroka, Ankaikiny</Text>
              <Text style={styles.locationDetail}>Bar Baobab, 1st floor</Text>
            </View>
          </View>
        </View>

        {/* ===== WHAT YOU GET ===== */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBubble, { backgroundColor: "rgba(200, 155, 255, 0.2)" }]}>
              <MaterialIcons name="card-giftcard" size={20} color={glass.accentPurple} />
            </View>
            <Text style={styles.cardTitle}>WHAT YOU GET</Text>
          </View>

          {[
            "Book + Audio included",
            "100% spoken English classes",
            "International TEFL/TESOL certificate",
            "Friendly atmosphere guaranteed 😄",
          ].map((item) => (
            <View key={item} style={styles.featureRow}>
              <MaterialIcons name="check-circle" size={18} color={glass.accentGreen} />
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* ===== CONTACT ===== */}
        <View style={styles.glassCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBubble, { backgroundColor: "rgba(91, 229, 140, 0.2)" }]}>
              <MaterialIcons name="phone" size={20} color={glass.accentGreen} />
            </View>
            <Text style={styles.cardTitle}>CONTACT US</Text>
          </View>

          <Pressable
            onPress={() => void openWhatsApp(PHONE_1, contactMessage("032 20 743 87"))}
            style={({ pressed }) => [styles.contactButton, pressed && styles.pressed]}
          >
            <MaterialIcons name="chat" size={20} color="#0B1116" />
            <Text style={styles.contactText}>WhatsApp · 032 20 743 87</Text>
          </Pressable>

          <Pressable
            onPress={() => void openWhatsApp(PHONE_2, contactMessage("038 21 148 39"))}
            style={({ pressed }) => [styles.contactButton, pressed && styles.pressed]}
          >
            <MaterialIcons name="chat" size={20} color="#0B1116" />
            <Text style={styles.contactText}>WhatsApp · 038 21 148 39</Text>
          </Pressable>
        </View>

        {/* ===== CTA ===== */}
        <View style={[styles.glassCard, styles.ctaCard]}>
          <Text style={styles.ctaEmoji}>🌟</Text>
          <Text style={styles.ctaTitle}>JOIN AMERITALK</Text>
          <Text style={styles.ctaText}>
            The only regret is not starting sooner. 😉
          </Text>
          <Pressable
            onPress={() => void openWhatsApp(PHONE_1, contactMessage("032 20 743 87"))}
            style={({ pressed }) => [styles.ctaButton, pressed && styles.pressed]}
          >
            <MaterialIcons name="rocket-launch" size={20} color="#0B1116" />
            <Text style={styles.ctaButtonText}>SIGN UP NOW</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>© AmeriTalk Madagascar · In a league of our own</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

// ============================================================
// Styles
// ============================================================
const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 60 },

  // Background
  bgLayer: { ...StyleSheet.absoluteFillObject },
  bgBlob: { position: "absolute", borderRadius: 999 },
  bgBlob1: {
    width: 280,
    height: 280,
    top: -60,
    left: -80,
    backgroundColor: "rgba(200, 155, 255, 0.35)",
  },
  bgBlob2: {
    width: 320,
    height: 320,
    top: 380,
    right: -120,
    backgroundColor: "rgba(110, 198, 255, 0.28)",
  },
  bgBlob3: {
    width: 260,
    height: 260,
    bottom: 80,
    left: -80,
    backgroundColor: "rgba(255, 143, 184, 0.25)",
  },

  // Glass card
  glassCard: {
    backgroundColor: glass.cardBg,
    borderWidth: 1,
    borderColor: glass.cardBorder,
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 6,
  },

  // Header
  header: { alignItems: "center", marginBottom: 22, marginTop: 8 },
  headerKicker: {
    color: glass.accentGreen,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.6,
  },
  headerTitle: {
    color: glass.textPrimary,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
  },
  headerLine: {
    width: 60,
    height: 3,
    backgroundColor: glass.accentGold,
    borderRadius: 2,
    marginTop: 12,
  },

  // Promo
  promoCard: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: glass.cardBorderStrong,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  promoImage: {
    width: "100%",
    height: 260,
  },

  // Quote
  quoteCard: { alignItems: "center", paddingVertical: 26 },
  quoteEmoji: { fontSize: 30, marginBottom: 12 },
  quoteText: {
    color: glass.textPrimary,
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 24,
    fontStyle: "italic",
  },
  quoteSubtext: {
    color: glass.accentGold,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 18,
  },

  // Card header
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBubbleLarge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: glass.textPrimary,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 0.6,
    flex: 1,
  },
  cardBody: { color: glass.textSecondary, fontSize: 14, lineHeight: 22 },
  boldGreen: { fontWeight: "900", color: glass.accentGreen },

  // CEO
  ceoCard: {
    borderColor: "rgba(255, 215, 94, 0.35)",
    alignItems: "center",
  },
  ceoPhotoLargeWrap: {
    width: "100%",
    height: 340,
    borderRadius: 18,
    overflow: "hidden",
    marginTop: 6,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: glass.accentGold,
    position: "relative",
    shadowColor: glass.accentGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  ceoPhotoLarge: {
    width: "100%",
    height: "100%",
  },
  ceoPhotoBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: glass.accentGold,
  },
  ceoInfoCentered: {
    alignItems: "center",
    marginBottom: 16,
  },
  ceoName: {
    color: glass.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },
  ceoRole: {
    color: glass.accentGold,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 6,
  },
  ceoQuote: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: glass.accentGold,
    width: "100%",
  },
  ceoQuoteText: {
    color: glass.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    fontStyle: "italic",
  },

  // Certificate
  certCard: {
    flexDirection: "row",
    gap: 14,
    borderColor: "rgba(255, 215, 94, 0.35)",
  },
  certCopy: { flex: 1 },
  certKicker: {
    color: glass.accentGold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  certTitle: {
    color: glass.textPrimary,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 6,
    lineHeight: 20,
  },
  certText: {
    color: glass.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },

  // Locations
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: glass.cardBorder,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  locationCopy: { flex: 1 },
  locationName: {
    color: glass.textPrimary,
    fontSize: 14,
    fontWeight: "900",
  },
  locationDetail: {
    color: glass.textMuted,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },

  // Features
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: glass.cardBorder,
  },
  featureText: {
    color: glass.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    flex: 1,
  },

  // Contact
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: glass.accentGreen,
    borderRadius: 14,
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: glass.accentGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  contactText: {
    color: "#0B1116",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  // CTA
  ctaCard: {
    alignItems: "center",
    paddingVertical: 26,
    borderColor: "rgba(91, 229, 140, 0.4)",
  },
  ctaEmoji: { fontSize: 40, marginBottom: 10 },
  ctaTitle: {
    color: glass.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },
  ctaText: {
    color: glass.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: glass.accentGreen,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: "100%",
    shadowColor: glass.accentGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
  },
  ctaButtonText: {
    color: "#0B1116",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  // Footer
  footer: {
    color: glass.textMuted,
    fontSize: 10,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
  },

  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});