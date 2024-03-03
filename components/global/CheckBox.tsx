import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors, lighttext } from "../../assets/constants";
import { DoubleTickIcon } from "../../assets/icons";

export interface CheckBoxProps {
  dpText: string;
  isSelected: boolean;
  toggleSelected: () => void;
}

export const CheckBox = ({
  dpText,
  isSelected,
  toggleSelected,
}: CheckBoxProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={toggleSelected} style={style.container}>
      {isSelected ? <DoubleTickIcon /> : <View style={style.box} />}
      <Text style={lighttext}>{dpText}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  box: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.divider_bg_light,
  },
});
