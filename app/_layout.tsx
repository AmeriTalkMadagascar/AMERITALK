import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import "../global.css";
import { FirstAccessScreen } from "@/components/first-access-screen";
import { AppStateProvider, useAppState } from "@/lib/app-state";
import { useColorScheme } from "@/hooks/use-color-scheme";

function AppShell() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const { hydrated, userProfile } = useAppState();
  const [fontsLoaded] = useFonts(MaterialIcons.font);
  const isAdminRoute = segments[0] === "admin";

  if (!fontsLoaded || !hydrated) return null;
  if (!userProfile && !isAdminRoute) return <FirstAccessScreen />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="admin" options={{ headerShown: false }} />
        <Stack.Screen name="lesson/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="lesson/[id]/test" options={{ headerShown: false }} />
        <Stack.Screen name="academic/[program]" options={{ headerShown: false }} />
        <Stack.Screen name="academic/[program]/test" options={{ headerShown: false }} />
        <Stack.Screen name="academic/[program]/module/[module]" options={{ headerShown: false }} />
        <Stack.Screen name="academic/[program]/module/[module]/lesson/[lesson]" options={{ headerShown: false }} />
        <Stack.Screen name="kids" options={{ headerShown: false }} />
        <Stack.Screen name="oauth/callback" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppStateProvider>
      <AppShell />
      <StatusBar style="auto" />
    </AppStateProvider>
  );
}
