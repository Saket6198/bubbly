import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/contexts/authContexts";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GearIcon } from "phosphor-react-native"
import { Socket } from "socket.io-client";
import { useRouter } from "expo-router";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaProvider className="flex flex-1">
      <ScreenWrapper
        style={{ flex: 1 }}
        showPattern={true}
        preventPatternOverlay={true}
        bgOpacity={0.5}
      >
        <View className="flex flex-row justify-between items-center w-full px-3 pt-3">
          <Text style={{ fontSize: widthPercentageToDP("5%") }} className="text-gray-400 font-semibold">
            Welcome Back, {user?.name}
          </Text>
          <TouchableOpacity className="p-1" accessibilityLabel="settings" onPress={() => router.push("/(main)/settingsModal")}>
            <GearIcon size={24} color={"white"} />
          </TouchableOpacity>
        </View>
        <View
          style={{ backgroundColor: "#ffffff" }}
          className="flex flex-1 mt-10 rounded-t-[60px] p-5"
        >
        </View>
      </ScreenWrapper>
    </SafeAreaProvider>
  );
};

export default Home;
