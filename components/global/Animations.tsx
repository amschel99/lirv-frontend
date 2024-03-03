import React, { JSX } from "react";
import { StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import { boldtext, colors } from "../../assets/constants";

interface animationProps {
  animationType: string;
  animationmessage: string;
}

export const Animations = ({
  animationType,
  animationmessage,
}: animationProps): JSX.Element => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <View style={styles.animationctr}>
        <Text style={[boldtext, { fontSize: 14 }]}>{animationmessage}</Text>

        {animationType == "success" ? (
          <Lottie
            source={require("../../assets/animations/success.json")}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        ) : animationType == "error" ? (
          <Lottie
            source={require("../../assets/animations/error.json")}
            autoPlay
            loop={false}
            style={styles.animation}
          />
        ) : (
          <Lottie
            source={require("../../assets/animations/loading.json")}
            autoPlay
            loop={true}
            style={styles.animation}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.popup_bg_light,
    zIndex: 2000,
  },
  animation: {
    width: 58,
    height: 58,
  },
  animationctr: {
    width: "100%",
    height: 60,
    paddingLeft: 8,
    paddingRight: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: colors.divider_bg_light,
    backgroundColor: colors.content_bg_light,
  },
});
