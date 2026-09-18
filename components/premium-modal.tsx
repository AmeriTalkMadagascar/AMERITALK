import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { duo } from "@/constants/design";
import { openWhatsAppForPack, type PremiumPack } from "@/lib/premium";

// ============================================================
// MODAL PREMIUM — Popup d'achat pour un pack payant
// S'ouvre quand on clique sur un parcours verrouillé.
// Contient le prix, les features et un bouton WhatsApp.
// ============================================================

type PremiumModalProps = {
  visible: boolean;
  pack: PremiumPack | null;
  onClose: () => void;
};

export function PremiumModal({ visible, pack, onClose }: PremiumModalProps) {
  if (!pack) return null;

  const handleBuy = async () => {
    await openWhatsAppForPack(pack);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          {/* ===== En-tête ===== */}
          <View style={styles.header}>
            <View style={[styles.emojiCircle, { backgroundColor: pack.color }]}>
              <Text style={styles.emoji}>{pack.emoji}</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={22} color={duo.muted} />
            </Pressable>
          </View>

          {/* ===== Titre ===== */}
          <Text style={styles.title}>{pack.title}</Text>
          <Text style={styles.subtitle}>{pack.subtitle}</Text>

          {/* ===== Badge niveau ===== */}
          <View style={styles.levelBadge}>
            <MaterialIcons name="school" size={14} color={duo.blue} />
            <Text style={styles.levelText}>{pack.level}</Text>
          </View>

          {/* ===== Prix ===== */}
          <View style={styles.priceCard}>
            <Text style={styles.priceLabel}>PRIX UNIQUE</Text>
            <Text style={styles.priceValue}>{pack.priceLabel}</Text>
            <Text style={styles.priceNote}>Paiement via MVola, Orange Money ou Airtel Money</Text>
          </View>

          {/* ===== Features ===== */}
          <View style={styles.features}>
            {pack.features.map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <MaterialIcons name="check-circle" size={18} color={duo.green} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* ===== Bouton WhatsApp ===== */}
          <Pressable
            onPress={handleBuy}
            style={({ pressed }) => [styles.buyButton, pressed && styles.pressed]}
          >
            <MaterialIcons name="chat" size={22} color="#FFFFFF" />
            <Text style={styles.buyButtonText}>Acheter sur WhatsApp</Text>
          </Pressable>

          <Pressable onPress={onClose} style={styles.laterButton}>
            <Text style={styles.laterText}>Plus tard</Text>
          </Pressable>

          {/* ===== Note ===== */}
          <Text style={styles.footnote}>
            Tu seras redirigé vers WhatsApp avec un message pré-rempli.
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#1E2A32",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 420,
    borderWidth: 2,
    borderColor: duo.locked,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  emojiCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 34 },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: duo.locked,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
  },
  subtitle: {
    color: duo.muted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
    lineHeight: 18,
  },

  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: duo.locked,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 14,
  },
  levelText: { color: duo.blue, fontSize: 12, fontWeight: "900" },

  priceCard: {
    backgroundColor: duo.bg,
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    marginTop: 18,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: duo.gold,
  },
  priceLabel: {
    color: duo.gold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  priceValue: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "900",
    marginTop: 6,
  },
  priceNote: {
    color: duo.muted,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },

  features: { gap: 10, marginBottom: 20 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { color: "#D3DBE0", fontSize: 13, fontWeight: "700", flex: 1 },

  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#25D366",
    borderRadius: 16,
    height: 56,
    borderBottomWidth: 4,
    borderBottomColor: "#1AA850",
  },
  buyButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", letterSpacing: 0.5 },

  laterButton: { alignItems: "center", paddingVertical: 14 },
  laterText: { color: duo.muted, fontSize: 13, fontWeight: "800" },

  footnote: {
    color: duo.muted,
    fontSize: 10,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 4,
  },

  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});