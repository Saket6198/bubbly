import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types/types";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const ScreenWrapper = ({
  style,
  children,
  showPattern = false,
  isModal = false,
  bgOpacity = 1,
  preventPatternOverlay = false,
}: ScreenWrapperProps) => {
  if (preventPatternOverlay && showPattern) {
    // Render pattern behind content, not overlaying it
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isModal ? colors.white : colors.neutral900,
        }}
      >
        <ImageBackground
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          imageStyle={{ opacity: bgOpacity }}
          source={require("@/assets/images/bgPattern.png")}
        />
        <View style={[{ flex: 1 }, style]}>{children}</View>
      </View>
    );
  }

  return (
    <ImageBackground
      style={{
        flex: 1,
        backgroundColor: isModal ? colors.white : colors.neutral900,
      }}
      imageStyle={{ opacity: showPattern ? bgOpacity : 0 }}
      source={require("@/assets/images/bgPattern.png")}
    >
      <View
        style={[
          {
            flex: 1,
          },
          style,
        ]}
      >
        {children}
      </View>
    </ImageBackground>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
