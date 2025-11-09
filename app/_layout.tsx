import { AuthProvider } from "@/contexts/authContexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import "../global.css";

function RootLayoutNav() {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
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
          <ToastManager
            position="top"
            theme="dark"
            duration={3000}
            animationStyle="fade"
            showProgressBar={false}
            showCloseIcon={false}
            // topOffset="20"
            useModal={false}
          />
          <StatusBar style="auto" />
          <RootLayoutNav />
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
