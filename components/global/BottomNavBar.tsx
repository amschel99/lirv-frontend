import React, { JSX } from "react";
import { View, StyleSheet } from "react-native";
import { BottomNavIcon } from "./BottomNavIcon";
import {
  CommunitiesIcon,
  ConversationsIcon,
  HomeIcon,
  JobsIcon,
} from "../../assets/icons";
import { SCREENWIDTH, colors } from "../../assets/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation";
import { useNavigation } from "@react-navigation/native";

export type SelectedScreen =
  | "Home"
  | "Communities"
  | "Conversations"
  | "Jobs"
  | "none";

export interface NavBarProps {
  selectedScreen: SelectedScreen;
  setSelectedScreen: React.Dispatch<React.SetStateAction<string>>;
}
interface PageIconData {
  name: SelectedScreen;
  icon: JSX.Element;
  screenName: keyof RootStackParamList;
}

export interface BottomNavBar {
  selectedScreen: SelectedScreen;
}
export const BottomNavBar = ({ selectedScreen }: BottomNavBar): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const screens: PageIconData[] = [
    { name: "Home", icon: <HomeIcon />, screenName: "homescreen" },
    {
      name: "Communities",
      icon: <CommunitiesIcon />,
      screenName: "communitiesScreen",
    },
    {
      name: "Conversations",
      icon: <ConversationsIcon />,
      screenName: "homescreen",
    },
    { name: "Jobs", icon: <JobsIcon />, screenName: "homescreen" },
  ];

  //TODO: temporary disabling of some screens
  const hadleChangeScreen = (screen: PageIconData) => {
    if (screen.name != "Jobs" && screen.name != "Conversations")
      navigation.navigate(screen.screenName);
  };

  return (
    <View style={styles.navContainer}>
      {screens.map((screen, index) => {
        return (
          <BottomNavIcon
            key={index}
            icon={screen.icon}
            name={screen.name}
            onPressIcon={() => {
              hadleChangeScreen(screen);
            }}
            selectedScreen={selectedScreen}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    width: SCREENWIDTH,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: colors.divider_bg_light,
    backgroundColor: colors.primary_bg_light,
  },
});
