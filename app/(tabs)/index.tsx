import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

import { duo } from "@/constants/design";

// ============================================================
// ÉCRAN SPLASH / ACCUEIL
// Affiche le logo AmeriTalk au centre puis redirige vers Learn.
// ============================================================

const SPLASH_DURATION = 1800; // ms avant la redirection

export default function IndexScreen() {
  const router = useRouter();

  // Animation d'apparition + respiration du logo
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Apparition du logo (fade + scale)
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        damping: 12,
        stiffness: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 2. Puis respiration continue
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseScale, {
            toValue: 1.06,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseScale, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // 3. Redirection auto vers Learn après un délai
    const timer = setTimeout(() => {
      router.replace("/(tabs)/learn" as never);
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {/* Fond dégradé simulé avec deux vues */}
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <Animated.View
        style={[
          styles.logoWrap,
          {
            opacity: logoOpacity,
            transform: [{ scale: Animated.multiply(logoScale, pulseScale) }],
          },
        ]}
      >
        <Image
          source={require("@/assets/images/ameritalk-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.Text style={[styles.appName, { opacity: logoOpacity }]}>
        AmeriTalk
      </Animated.Text>

      <Animated.Text style={[styles.tagline, { opacity: logoOpacity }]}>
        Learn English, simply.
      </Animated.Text>

      {/* Petit loader en bas */}
      <View style={styles.loaderWrap}>
        <View style={styles.loaderDot} />
        <View style={[styles.loaderDot, styles.loaderDotDelay1]} />
        <View style={[styles.loaderDot, styles.loaderDotDelay2]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: duo.bg,
    alignItems: "center",
    justifyContent: "center",
  },

  // Fond décoratif (léger dégradé de couleur)
  bgTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#0F161C",
  },
  bgBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: duo.bg,
  },

  logoWrap: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: duo.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: duo.green,
    marginBottom: 24,
    shadowColor: duo.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  tagline: {
    color: duo.muted,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    letterSpacing: 0.5,
  },

  // Loader à 3 points
  loaderWrap: {
    position: "absolute",
    bottom: 80,
    flexDirection: "row",
    gap: 10,
  },
  loaderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: duo.green,
    opacity: 0.4,
  },
  loaderDotDelay1: { opacity: 0.7 },
  loaderDotDelay2: { opacity: 1 },
});