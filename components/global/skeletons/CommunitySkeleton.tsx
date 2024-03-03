import React, { JSX } from "react";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { SCREENWIDTH } from "../../../assets/constants";

export const CommunitySkeleton = (): JSX.Element => {
  return (
    <MotiView
      style={{
        width: SCREENWIDTH,
        marginBottom: 8,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Skeleton colorMode="light" width={44} height={44} radius="round" />
      <Skeleton
        colorMode="light"
        width={SCREENWIDTH - 80}
        height={44}
        radius={6}
      />
    </MotiView>
  );
};
