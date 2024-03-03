import React, { JSX, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCommunities } from "../api/communities";
import { useFab } from "../context/fabcontext";
import { useAuth } from "../context/authcontext";
import { useAnimation } from "../context/animationctx";
import { AppHeader } from "../components/global/AppHeader";
import { FABMenu } from "../components/global/fab/FABMenu";
import { FAB } from "../components/global/fab/FAB";
import { BottomNavBar } from "../components/global/BottomNavBar";
import { CommunityPreview } from "../components/communities/CommunityPreview";
import { CommunitySkeleton } from "../components/global/skeletons/CommunitySkeleton";
import { SCREENWIDTH, container } from "../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CommunitiesScreen = (): JSX.Element => {
  const { rendersFabMenu } = useFab();

  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [communites, setcommunites] = useState<[]>([]);

  const fetchallcommunities = async (): Promise<void> => {
    const { isOk, communities: data } = await getCommunities(
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    if (isOk) {
      setcommunites(data);
      hideAnimation();
    } else {
      showAnimation("error", "An error occurred, please try again");

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  useEffect(() => {
    showAnimation("loading", "getting your communites...");
    fetchallcommunities();
  }, []);

  return (
    <SafeAreaView style={[container, styles.container]}>
      <AppHeader rendersIcon={false} pageTitle="My communities" />

      <FlatList
        style={styles.middleSection}
        data={communites}
        keyExtractor={(item: any) => item?._id}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        renderItem={({ item }) => (
          <CommunityPreview
            communityId={item?._id}
            communityImage={item.image}
            communityTitle={item.title}
            communityDescription={item.description}
            createdAt={item.createdAt}
          />
        )}
      />

      <BottomNavBar selectedScreen="Communities" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 0,
    flexDirection: "column",
  },
  middleSection: {
    marginBottom: 48,
  },
  bottomSection: {
    width: SCREENWIDTH,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 6,
  },
});
