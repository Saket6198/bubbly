import ScreenWrapper from "@/components/ScreenWrapper";
import { useAuth } from "@/contexts/authContexts";
import { loginSchema, LoginSchemaProps } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { CaretLeftIcon, Envelope, Lock } from "phosphor-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { colors } from "../../constants/theme";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaProps>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaProps) => {
    try {
      setLoading(true);
      await signIn(data.email, data.password);
      setLoading(false);
      console.log("Login successful");
      Toast.show({
        type: "success",
        text1: "Login successful!",
      });
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
     Alert.alert("Invalid email or password");
    }
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
            <View className="flex flex-col mt-5 mx-5 gap-2">
              <Text
                style={{ fontSize: widthPercentageToDP(7) }}
                className="font-semibold"
              >
                Welcome Back
              </Text>
              <Text>We are happy to see you again!</Text>
            </View>
            <View className="flex flex-col mt-10 mx-5 gap-4">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <View className="flex-row items-center bg-gray-100 rounded-[20px] px-4 py-4">
                      <Envelope
                        size={20}
                        color={colors.neutral500}
                        style={{ marginRight: 12 }}
                      />
                      <TextInput
                        className="flex-1"
                        placeholder="Enter your email"
                        placeholderTextColor={colors.neutral500}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.email && (
                      <Text className="text-red-500 text-sm mt-1 ml-2">
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <View className="flex-row items-center bg-gray-100 rounded-[20px] px-4 py-4">
                      <Lock
                        size={20}
                        color={colors.neutral500}
                        style={{ marginRight: 12 }}
                      />
                      <TextInput
                        className="flex-1"
                        placeholder="Enter your password"
                        placeholderTextColor={colors.neutral500}
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                    {errors.password && (
                      <Text className="text-red-500 text-sm mt-1 ml-2">
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                className={`rounded-[20px] py-4 mt-4 flex-row justify-center items-center ${loading ? "bg-yellow-300" : "bg-yellow-400"}`}
              >
                {loading && (
                  <ActivityIndicator
                    size="small"
                    color="#000000"
                    style={{ marginRight: 8 }}
                  />
                )}
                <Text className="text-center text-black font-semibold text-lg">
                  {loading ? "Logging in..." : "Login"}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-5 flex flex-row items-center justify-center">
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text className="text-yellow-400 font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScreenWrapper>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default Login;
