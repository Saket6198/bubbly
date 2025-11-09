import { getAvatarPath } from "@/services/imageService";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
const Avatar = ({ uri, isGroup }: { uri?: string | null; isGroup?: boolean }) => {
  const imageSource = uri
    ? { uri }
    : require("../assets/images/defaultAvatar.png");
  return (
    <View>
      <Image
        source={getAvatarPath(uri, isGroup)}
        transition={100}
        contentFit="cover"
        style={{ width: 200, height: 200, borderRadius: 50 }}
      />
    </View>
  );
};

export default Avatar;
