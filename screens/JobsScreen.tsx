import React from "react";
import { View, Text } from "react-native";
import { BottomNavBar } from "../components/global/BottomNavBar";

export const JobsScreen = (): JSX.Element => {
  return (
    <View>
      <Text>This is the jobs page </Text>

      <BottomNavBar selectedScreen="Jobs" />
    </View>
  );
};
