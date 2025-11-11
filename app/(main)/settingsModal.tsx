import Avatar from "@/components/Avatar";
import { colors } from "@/constants/theme";
import { useAuth } from "@/contexts/authContexts";
import { userProfileSchema } from "@/schema/userProfileSchema";
import { uploadToCloudinary } from "@/services/imageService";
import { updateProfile } from "@/sockets/socketEvents";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  EnvelopeIcon,
  PencilIcon,
  SignOutIcon,
  UserIcon,
} from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Toast } from "toastify-react-native";

const Settings = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const [isVisible, setIsVisible] = React.useState(true);
  const { user, signOut, updateToken } = useAuth();
  const [updateloading, setUpdateLoading] = React.useState(false);
  const [signOutLoading, setSignOutLoading] = React.useState(false);
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<{ name: string; avatar?: string }>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      avatar: "",
    },
  });
  const watchedName = watch("name");
  const watchedAvatar = watch("avatar");
  const isNameChanged =
    (watchedName ?? "").trim() !== (user?.name ?? "").trim();
  const isAvatarChanged = watchedAvatar && watchedAvatar.trim() !== "";
  const hasChanges = isNameChanged || isAvatarChanged;
  useEffect(() => {
    updateProfile(processUpdatedProfile);

    return () => {
      updateProfile(processUpdatedProfile, true);
    };
  }, []);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      const uri = result?.assets[0]?.uri;
      setImage(uri);
      setValue("avatar", uri);
    }
  };

  const processUpdatedProfile = (res: any) => {
    console.log("Profile updated:", res);
    setUpdateLoading(false);
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
            setSignOutLoading(true);
            await signOut();
            setSignOutLoading(false);
          } catch (error) {
            setSignOutLoading(false);
            console.error("Sign out failed:", error);
          }
        },
      },
    ]);
  };
  const onSubmit = async (data: { name: string; avatar?: string }) => {
    setUpdateLoading(true);
    console.log("Submitting data:", data);
    if (!data.name.trim()) {
      Alert.alert("Please enter your name");
      setUpdateLoading(false);
      return;
    }

    const updatePayload: { name: string; avatar?: string } = {
      name: data.name,
    };

    if (data.avatar && data.avatar.trim()) {
      try {
        const res = await uploadToCloudinary(data.avatar, "profiles");
        if (res.success && res.data) {
          console.log("cloudinary response:", res);
          updatePayload.avatar = res.data;
        } else {
          console.log("Image upload failed:", res.msg);
          Alert.alert(
            "Image Upload Failed",
            "Failed to upload avatar image. Please try again."
          );
          setUpdateLoading(false);
          return;
        }
      } catch (error) {
        console.log("Image upload error:", error);
        Alert.alert(
          "Image Upload Failed",
          "Failed to upload avatar image. Please try again."
        );
        setUpdateLoading(false);
        return;
      }
    }

    updateProfile(updatePayload);
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
              <Avatar uri={image || user?.avatar || ""} isGroup={false} />
              <View className="flex absolute right-1 bottom-2 bg-white p-2 rounded-full border">
                <TouchableOpacity onPress={onPickImage}>
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
              <UserIcon
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
              <Text className="flex-1 text-neutral-500 py-4">
                {user?.email}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-6 pb-8 pt-4 border-t border-gray-100">
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-red-50 border-2 border-red-200 rounded-2xl flex-1 py-4"
              onPress={handleSignOut}
              disabled={signOutLoading}
            >
              {signOutLoading ? (
                <ActivityIndicator size="small" color="#ef4444" />
              ) : (
                <SignOutIcon size={20} color="#ef4444" weight="bold" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={
                `flex-row items-center justify-center rounded-2xl flex-[2] py-4 ` +
                (hasChanges && !updateloading
                  ? "bg-yellow-500"
                  : "bg-yellow-200")
              }
              disabled={!hasChanges || updateloading}
              onPress={() => {
                setUpdateLoading(true);
                handleSubmit(onSubmit)();
              }}
            >
              {updateloading ? (
                <>
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-white font-bold text-base ml-2">
                    Saving...
                  </Text>
                </>
              ) : hasChanges ? (
                <Text className="text-white font-bold text-base">
                  Save Changes
                </Text>
              ) : (
                <Text className="text-neutral-400 font-bold text-base">
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Settings;
