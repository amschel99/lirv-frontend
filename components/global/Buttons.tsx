import React, { JSX } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { boldtext, colors } from "../../assets/constants";

interface buttonProps {
  onPressFunc: () => void;
  dpText: string;
  dpIcon: JSX.Element;
  isDisabled?: boolean;
  xtraStyles?: {};
  largeText?: boolean;
}

export const LargeTouchableButton = ({
  onPressFunc,
  dpText,
  dpIcon,
  isDisabled,
  xtraStyles,
  largeText,
}: buttonProps): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={isDisabled ?? false}
      onPress={onPressFunc}
      style={[
        styles.touchable,
        xtraStyles,
        {
          backgroundColor: isDisabled
            ? colors.popup_bg_light
            : colors.navy_blue,
        },
      ]}
    >
      {largeText ? (
        <Text
          style={[
            boldtext,
            {
              width: "60%",
              textAlign: "right",
              color: colors.text_primary_dark,
            },
          ]}
        >
          {dpText}
        </Text>
      ) : (
        <Text style={[boldtext, { color: colors.text_primary_dark }]}>
          {dpText}
        </Text>
      )}

      {dpIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 0,
    borderRadius: 8,
  },
});
