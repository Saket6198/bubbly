import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
        router.replace("/(auth)/welcome")
    }, 1000);
  }, []);
  return (
    <SafeAreaProvider className="flex">
      <View className="flex flex-1 justify-center items-center bg-neutral-900">
        <Animated.Image
          style={{ aspectRatio: 1, height: hp("30%") }}
          entering={FadeInDown.delay(100).duration(400).springify()}
          source={require("@/assets/images/splashImage.png")}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default index;
