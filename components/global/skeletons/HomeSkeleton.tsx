import React, { JSX } from "react";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { SCREENWIDTH } from "../../../assets/constants";

export const HomeSkeleton = (): JSX.Element => {
  return (
    <MotiView
      style={{
        width: SCREENWIDTH,
        marginBottom: 8,
        paddingHorizontal: 8,
        gap: 8,
      }}
    >
      <Skeleton colorMode="light" width="100%" height={120} radius={6} />
      <Skeleton colorMode="light" width="100%" height={66} radius={6} />
    </MotiView>
  );
};
