import { getAvatarPath } from "@/services/imageService";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
const Avatar = ({ uri, isGroup, size = 200 }: { uri?: string | null; isGroup?: boolean; size?: number }) => {
  const imageSource = uri
    ? { uri }
    : require("../assets/images/defaultAvatar.png");
  return (
    <View>
      <Image
        source={getAvatarPath(uri, isGroup)}
        transition={100}
        contentFit="cover"
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
};

export default Avatar;
