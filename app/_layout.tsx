import { AuthProvider, useAuth } from "@/contexts/authContexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

function RootLayoutNav() {
  const { token } = useAuth();
  const insets = useSafeAreaInsets();
  const loggedIn = !!token;

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      }}
    >
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="(auth)"></Stack.Screen>
      <Stack.Screen name="(main)"></Stack.Screen>
    </Stack>
  );
}

export default function RootLayout() {
  const client = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <QueryClientProvider client={client}>
          <Toast position="top" />
          <StatusBar style="auto" />
          <RootLayoutNav />
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
