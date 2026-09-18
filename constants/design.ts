export const colors = {
  ink: "#14202B",
  inkSoft: "#4C5B68",
  muted: "#84909B",
  canvas: "#F5F7F9",
  white: "#FFFFFF",
  line: "#E4E9EE",
  primary: "#B24C3F",
  primaryDark: "#8D352F",
  gold: "#F2AA4B",
  goldSoft: "#FFF0D8",
  mint: "#DDF4E6",
  mintStrong: "#3C9560",
  blue: "#DDEBFF",
  blueStrong: "#4079C8",
  lilac: "#EEE5FF",
  lilacStrong: "#7653B8",
  peach: "#FFE6D1",
  peachStrong: "#C8753F",
  danger: "#D86459",
} as const;

export const spacing = { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, xxl: 32 } as const;
export const radius = { sm: 12, md: 18, lg: 24, pill: 999 } as const;
export const shadow = { shadowColor: "#17212B", shadowOpacity: 0.07, shadowRadius: 14, shadowOffset: { width: 0, height: 7 }, elevation: 3 } as const;
export const type = { display: 34, h1: 28, h2: 20, body: 14, small: 11, micro: 9 } as const;

// Palette "façon Duolingo" (fond sombre, couleurs vives) utilisée par les écrans
// en cours de refonte (Learn). Les autres écrans gardent encore l'ancienne palette
// ci-dessus tant qu'ils n'ont pas été migrés.
export const duo = {
  bg: "#131A20",
  surface: "#1E2A32",
  muted: "#5B6B74",
  lockedIcon: "#3A4750",
  locked: "#243139",
  green: "#58CC02",
  blue: "#1CB0F6",
  gold: "#FFC800",
  orange: "#FF9600",
  purple: "#CE82FF",
  pink: "#FF4B8C",
  red: "#FF4B4B",
  redSoft: "#3A2126",
  greenSoft: "#1E3320",
} as const;

export const skillColors = {
  Vocabulary: { bg: colors.blue, accent: colors.blueStrong, icon: "Aa" },
  Listening: { bg: colors.mint, accent: colors.mintStrong, icon: "♫" },
  Speaking: { bg: colors.peach, accent: colors.peachStrong, icon: "◉" },
  Review: { bg: colors.lilac, accent: colors.lilacStrong, icon: "↻" },
  Grammar: { bg: colors.goldSoft, accent: colors.peachStrong, icon: "✦" },
} as const;
