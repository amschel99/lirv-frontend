import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { SelectedScreen } from "./BottomNavBar";
import { colors } from "../../assets/constants";

export interface ScreenIconProps {
  icon: JSX.Element;
  name: SelectedScreen;
  onPressIcon: () => void;
  selectedScreen: SelectedScreen;
}

/**
 * NavIcon component represents an icon in the navigation bar.
 * @param {JSX.Element} icon - The icon component to be displayed.
 * @param {SelectedScreen} name - The name of the screen associated with the icon.
 * @param {() => void} onPressIcon - The function to be executed when the icon is pressed.
 * @param {SelectedScreen} selectedScreen - The currently selected screen.
 * @returns {JSX.Element} - The rendered NavIcon component.
 */

export const BottomNavIcon = ({
  icon,
  name,
  onPressIcon,
  selectedScreen,
}: ScreenIconProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPressIcon}
      style={[
        styles.screenIconContainer,
        selectedScreen === name
          ? styles.selectedScreen
          : styles.notSelectedScreen,
      ]}
    >
      {React.cloneElement(icon, {
        color:
          selectedScreen === name && selectedScreen != "none"
            ? colors.navy_blue
            : colors.text_faint_dark,
      })}
      <View />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screenIconContainer: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedScreen: {
    borderBottomWidth: 2,
    borderColor: colors.navy_blue,
  },
  notSelectedScreen: {
    borderWidth: 0,
  },
});
