import React, { JSX, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavBar } from "../components/global/BottomNavBar";
import { AppHeader } from "../components/global/AppHeader";
import { useFab } from "../context/fabcontext";
import { RecommendedCommunities } from "../components/home/RecommendedCommunities";
import { useAuth } from "../context/authcontext";
import { useAnimation } from "../context/animationctx";
import { getAllEvents } from "../api/events";
import { getCommunities } from "../api/communities";
import { EventsForYou } from "../components/home/EventsForYou";
import { HomeSkeleton } from "../components/global/skeletons/HomeSkeleton";
import { FAB } from "../components/global/fab/FAB";
import { FABMenu } from "../components/global/fab/FABMenu";
import { SCREENWIDTH, container } from "../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotification } from "../context/notificationctx";
import { CommunityScreen } from "../components/communities/CommunityScreen";

export default function HomeScreen(): JSX.Element {
  const { rendersFabMenu } = useFab();
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [communites, setcommunites] = useState<[]>([]);
  const { events, setEvents } = useNotification();

  const onFetchCommunitiesEvents = async (): Promise<void> => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      showAnimation("loading", "getting the latest updates for you...");

      const { isOk: communitiesOk, communities: communitiesdata } =
        await getCommunities(
          JSON.parse(await AsyncStorage.getItem("user")).accessToken
        );
      const { isOk: eventsOk, allEvents: eventsdata } = await getAllEvents(
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );

      if (communitiesOk && eventsOk) {
        setcommunites(communitiesdata);
        setEvents(eventsdata);

        hideAnimation();
      } else {
        showAnimation("error", "An error occurred, please try again");

        setTimeout(() => {
          hideAnimation();
        }, 3500);
      }
    } else {
      await getAuthFromJSON();
    }
  };

  useEffect(() => {
    onFetchCommunitiesEvents();
  }, []);

  return (
    <SafeAreaView style={[container, styles.container]}>
      <AppHeader rendersIcon={false} pageTitle={communites[0]?.title} />

      {renderanimation ? (
        <>
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
        </>
      ) : (
        <View style={styles.middleSection}>
          <CommunityScreen communityId={communites[0]?._id} />
        </View>
      )}

      <BottomNavBar selectedScreen="Home" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: 0,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  middleSection: {
    ...container,
    flexDirection: "column",
    marginBottom: 48,
    gap: 10,
  },
  bottomSection: {
    width: SCREENWIDTH,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 6,
  },
});
