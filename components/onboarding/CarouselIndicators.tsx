import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../assets/constants";

interface carouselIndicatorProps {
  currIdx: number;
}

export const CarouselIndicators = ({
  currIdx,
}: carouselIndicatorProps): JSX.Element => {
  const width: number = 12;
  const activeWidth: number = 48;

  return (
    <View style={styles.indicatorsctr}>
      <View
        style={[
          styles.indicator,
          { width: currIdx == 0 ? activeWidth : width },
        ]}
      />
      <View
        style={[
          styles.indicator,
          { width: currIdx == 1 ? activeWidth : width },
        ]}
      />
      <View
        style={[
          styles.indicator,
          { width: currIdx == 2 ? activeWidth : width },
        ]}
      />
      <View
        style={[
          styles.indicator,
          { width: currIdx == 3 ? activeWidth : width },
        ]}
      />
      <View
        style={[
          styles.indicator,
          { width: currIdx == 4 ? activeWidth : width },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorsctr: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 500,
    backgroundColor: colors.divider_bg_light,
  },
});
