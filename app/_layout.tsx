import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar style="auto"/>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{ animation: "slide_from_right",  }}
        ></Stack.Screen>
      </Stack>
    </>
  );
}
