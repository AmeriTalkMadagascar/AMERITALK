import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { duo } from "@/constants/design";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 9);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: duo.green,
        tabBarInactiveTintColor: duo.muted,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarItemStyle: { paddingHorizontal: 4 },
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: bottomPadding,
          height: 56 + bottomPadding,
          backgroundColor: duo.bg,
          borderTopColor: duo.surface,
          borderTopWidth: 2,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} /> }} />
      <Tabs.Screen name="learn" options={{ title: "Learn", tabBarIcon: ({ color }) => <IconSymbol size={26} name="book.fill" color={color} /> }} />
      <Tabs.Screen name="practice" options={{ title: "Practice", tabBarIcon: ({ color }) => <IconSymbol size={26} name="mic.fill" color={color} /> }} />
      <Tabs.Screen name="progress" options={{ title: "Progress", tabBarIcon: ({ color }) => <IconSymbol size={26} name="chart.bar.fill" color={color} /> }} />
    </Tabs>
  );
}
