import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";
import { registerSchema, RegisterSchemaProps } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { CaretLeftIcon, Envelope, Lock, User } from "phosphor-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaProps>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const onSubmit = (data: RegisterSchemaProps) => {
    console.log("Form Data:", data);
  };

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
              <Text>Create an account to continue</Text>
            </View>
            <View className="flex flex-col mt-10 mx-5 gap-4">
              <View>
                <View className="flex-row items-center bg-gray-100 rounded-[20px] px-4 py-4">
                  <User
                    size={20}
                    color={colors.neutral500}
                    style={{ marginRight: 12 }}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1"
                        placeholder="Enter your username"
                        placeholderTextColor={colors.neutral500}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                      />
                    )}
                    name="userName"
                    rules={{
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Username cannot exceed 20 characters",
                      },
                    }}
                    defaultValue=""
                  />
                </View>
                {errors.userName && (
                  <Text className="text-red-500 text-sm mt-1 ml-2">
                    {String(errors.userName.message)}
                  </Text>
                )}
              </View>

              <View>
                <View className="flex-row items-center bg-gray-100 rounded-[20px] px-4 py-4">
                  <Envelope
                    size={20}
                    color={colors.neutral500}
                    style={{ marginRight: 12 }}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1"
                        placeholder="Enter your email"
                        placeholderTextColor={colors.neutral500}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                      />
                    )}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Enter a valid email address",
                      },
                    }}
                    defaultValue=""
                  />
                </View>
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1 ml-2">
                    {String(errors.email.message)}
                  </Text>
                )}
              </View>
              <View>
                <View className="flex-row items-center bg-gray-100 rounded-[20px] px-4 py-4">
                  <Lock
                    size={20}
                    color={colors.neutral500}
                    style={{ marginRight: 12 }}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="flex-1"
                        placeholder="Enter your password"
                        placeholderTextColor={colors.neutral500}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        autoCapitalize="none"
                        autoComplete="password-new"
                      />
                    )}
                    name="password"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 50,
                        message: "Password cannot exceed 50 characters",
                      },
                    }}
                    defaultValue=""
                  />
                </View>
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1 ml-2">
                    {String(errors.password.message)}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                className="bg-yellow-400 rounded-[20px] py-4 mt-6"
                onPress={handleSubmit(onSubmit)}
              >
                <Text className="text-center text-black font-semibold text-lg">
                  Create Account
                </Text>
              </TouchableOpacity>
              <View className="flex flex-row justify-center items-center text-center">
                <Text>Already have an Account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                  <Text className="text-yellow-400 font-bold">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScreenWrapper>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default RegisterPage;
