import React, { JSX } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useFab } from "../../../context/fabcontext";
import { PlusIcon } from "../../../assets/icons";
import { colors } from "../../../assets/constants";

export const FAB = (): JSX.Element => {
  const { showFabMenu } = useFab();

  return (
    <TouchableOpacity onPress={() => showFabMenu()} style={styles.fabcontainer}>
      <PlusIcon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fabcontainer: {
    width: 48,
    height: 48,
    position: "absolute",
    bottom: 62,
    right: 8,
    borderRadius: 500,
    backgroundColor: colors.navy_blue,
    alignItems: "center",
    justifyContent: "center",
  },
});
