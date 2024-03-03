import React, { JSX } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { colors, boldtext, lighttext } from "../../assets/constants";

interface accountTypeProps {
  dpText: string;
  dpDescription: string;
  onSelect: () => void;
  isSelected: boolean;
  isDisabled: boolean;
}

export const AccountType = ({
  dpText,
  dpDescription,
  onSelect,
  isSelected,
  isDisabled,
}: accountTypeProps): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onSelect}
      style={[
        styles.acctype,
        {
          backgroundColor: isDisabled
            ? colors.divider_bg_dark
            : colors.popup_bg_light,
          borderColor: isSelected
            ? colors.divider_bg_light
            : colors.popup_bg_light,
        },
      ]}
    >
      <View
        style={[
          styles.radiobutton,
          {
            backgroundColor: isSelected
              ? colors.divider_bg_light
              : "transparent",
          },
        ]}
      />

      <View style={{ gap: 8 }}>
        <Text style={boldtext}>{dpText}</Text>
        <Text style={lighttext}>{dpDescription}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  acctype: {
    width: "100%",
    minHeight: 80,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 14,
    borderWidth: 0.5,
    borderRadius: 6,
  },
  radiobutton: {
    width: 14,
    height: 14,
    borderWidth: 0.5,
    borderRadius: 500,
    borderColor: colors.divider_bg_light,
  },
});
