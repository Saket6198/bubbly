import Avatar from "@/components/Avatar";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContexts";
import { userProfileSchema } from "@/schema/userProfileSchema";
import { updateProfile } from "@/sockets/socketEvents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import {
  EnvelopeIcon,
  PencilIcon,
  SignOutIcon,
  User,
} from "phosphor-react-native";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Toast } from "toastify-react-native";
const Settings = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(true);
  const { user, signOut, updateToken } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    setIsVisible(false);
    router.back();
    // setTimeout(() => {
    //   router.back();
    // }, 300);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; avatar?: string | null}>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });
  useEffect(() => {
    updateProfile(processUpdatedProfile);

    return () => {
      updateProfile(processUpdatedProfile, true);
    };
  }, []);

  const processUpdatedProfile = (res: any) => {
    console.log("Profile updated:", res);
    setLoading(false);
    if (res.success) {
      updateToken(res.data.token);
      router.back();
      Toast.success("Profile updated successfully!");
    } else {
      Alert.alert("User", res.msg);
    }
  };

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
          } catch (error) {
            console.error("Sign out failed:", error);
          }
        },
      },
    ]);
  };
  const onSubmit = (data: { name: string }) => {
    console.log("Submitting data:", data);
    if (!data.name.trim()) {
      Alert.alert("Please enter your name");
      return;
    }
    updateProfile(data);
    setLoading(true);
    // good
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      onSwipeComplete={handleClose}
      swipeDirection={["down"]}
      propagateSwipe={true}
      style={{ margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View className="flex-1 bg-white justify-between">
        <View>
          <View className="flex justify-center items-center mt-10">
            <Text style={{ fontSize: widthPercentageToDP("5%") }}>
              Update Profile
            </Text>
            <View className="mt-10">
              <Avatar uri={user?.avatar ?? ""} isGroup={false} />
              <View className="flex absolute right-1 bottom-2 bg-white p-2 rounded-full border">
                <TouchableOpacity>
                  <PencilIcon
                    size={widthPercentageToDP("5%")}
                    color={colors.neutral500}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="mt-10 px-10">
            <Text className="text-lg font-semibold mb-2">Name</Text>
            <View className="flex-row items-center bg-gray-100 rounded-[20px] px-4 py-4 mb-4">
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
                    placeholder="Enter your name"
                    placeholderTextColor={colors.neutral500}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="words"
                    autoComplete="name"
                  />
                )}
                name="name"
                rules={{
                  required: "Name is required",
                }}
              />
            </View>
            <Text className="text-lg font-semibold mb-2">Email</Text>
            <View className="flex-row items-center bg-gray-100 rounded-[20px] px-4 py-4">
              <EnvelopeIcon
                size={20}
                color={colors.neutral500}
                style={{ marginRight: 12 }}
              />
              <Text className="flex-1 text-neutral-500 py-4">{user?.email}</Text>
            </View>
          </View>
        </View>

        <View className="px-6 pb-8 pt-4 border-t border-gray-100">
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-red-50 border-2 border-red-200 rounded-2xl flex-1 py-4"
              onPress={handleSignOut}
            >
              <SignOutIcon size={20} color="#ef4444" weight="bold" />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center justify-center bg-yellow-500 rounded-2xl flex-[2] py-4"
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white font-bold text-base">
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Settings;
