import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Animated, { FadeInDown } from 'react-native-reanimated';

const Welcome = () => {
    const router = useRouter();
  return (
    <ScreenWrapper showPattern={true}>
      <View className="flex flex-1 items-center justify-evenly">
        <Typo color={colors.white} size={45} fontWeight={"900"}>
          Bubbly
        </Typo>
        <Animated.Image
        entering={FadeInDown.delay(200).duration(200).springify()}
          source={require("@/assets/images/welcome.png")}
          style={{ aspectRatio: 1, height: widthPercentageToDP("80") }}
        />
        <View>
          <Typo color={colors.white} size={35} fontWeight={"700"}>
            Stay Connected.
          </Typo>
          <Typo color={colors.white} size={35} fontWeight={"700"}>
            Private by design.
          </Typo>
          <Typo color={colors.white} size={35} fontWeight={"700"}>
            Secure by default.
          </Typo>
        </View>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")} style={{width: widthPercentageToDP("75"), height: heightPercentageToDP("6.5%")}} className="bg-yellow-500 rounded-2xl flex justify-center items-center px-5 py-3">
            <Text className="text-black flex justify-center items-center">
              Get Started
            </Text>
          </TouchableOpacity>

      </View>

      <View className="absolute right-3 bottom-3">
        <Text style={{ color: colors.white, opacity: 0.28, fontSize: 11 }}>
          Saket Singh ©
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;
