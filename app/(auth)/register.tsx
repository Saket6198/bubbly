import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import { CaretLeftIcon } from "phosphor-react-native";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
const RegisterPage = () => {
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScreenWrapper
          style={{ flex: 1 }}
          showPattern={true}
          preventPatternOverlay={true}
        >
          <View className="flex flex-row justify-between items-center w-full px-3 pt-3">
            <TouchableOpacity onPress={() => router.back()} className="p-1">
              <CaretLeftIcon size={24} color={colors.white} />
            </TouchableOpacity>

            <TouchableOpacity className="p-1" accessibilityLabel="Help">
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                Need Help?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ backgroundColor: "#ffffff" }}
            className="flex flex-1 mt-10 rounded-t-[60px] p-5"
          >
            <View className="flex flex-col mt-5 mx-5">
              <Text
                style={{ fontSize: widthPercentageToDP(7) }}
                className="font-semibold"
              >
                Getting Started 
              </Text>
              <Text >Create an account to continue</Text>
            </View>
            <View className="flex flex-col mt-10 mx-5">
              <TextInput className="bg-gray-100 rounded-[20px] px-4 py-4" placeholder="Enter your name"/>
              <Text>Hello</Text>
            </View>
          </View>
        </ScreenWrapper>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default RegisterPage;
