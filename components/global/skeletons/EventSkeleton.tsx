import React, { JSX } from "react";
import { MotiView, View } from "moti";
import { Skeleton } from "moti/skeleton";
import { SCREENWIDTH } from "../../../assets/constants";

export const EventSkeleton = (): JSX.Element => {
  return (
    <MotiView
      style={{
        width: SCREENWIDTH,
        marginBottom: 8,
        paddingHorizontal: 8,
        gap: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Skeleton colorMode="light" width={100} height={25} radius={6} />

        <Skeleton colorMode="light" width={44} height={44} radius="round" />
      </View>

      <Skeleton colorMode="light" width="100%" height={180} radius={6} />

      <Skeleton colorMode="light" width={60} height={18} radius={6} />

      <Skeleton colorMode="light" width={60} height={18} radius={6} />

      <Skeleton colorMode="light" width={60} height={18} radius={6} />

      <Skeleton colorMode="light" width="100%" height={44} radius={6} />
    </MotiView>
  );
};
