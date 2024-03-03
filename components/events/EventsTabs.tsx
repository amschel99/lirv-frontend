import React, { JSX, useEffect, useState } from "react";
import { useWindowDimensions, FlatList, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { getAllEvents } from "../../api/events";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { Event } from "./Event";
import { colors, lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotification } from "../../context/notificationctx";

const AllEvents = (): JSX.Element => {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();
  const { events, setEvents } = useNotification();

  const onFetchCommunitiesEvents = async (): Promise<void> => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      showAnimation("loading", "Getting the latest events for you...");

      const { isOk: eventsOk, allEvents: eventsdata } = await getAllEvents(
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );

      if (eventsOk) {
        setEvents(eventsdata);
        hideAnimation();
      } else {
        hideAnimation();
      }
    } else {
      await getAuthFromJSON();
    }
  };

  useEffect(() => {
    onFetchCommunitiesEvents();
  }, []);

  return (
    <FlatList
      style={styles.flatlist}
      data={events}
      keyExtractor={(item: any) => item?._id}
      showsVerticalScrollIndicator={false}
      numColumns={1}
      renderItem={({ item }) => (
        <Event
          id={item?._id}
          description={item?.description}
          imageURL={item?.photo}
          date={item?.date}
        />
      )}
    />
  );
};

const RecommendedEvents = (): JSX.Element => {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { events, setEvents } = useNotification();

  const onFetchCommunitiesEvents = async (): Promise<void> => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      const { isOk: eventsOk, allEvents: eventsdata } = await getAllEvents(
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );

      if (eventsOk) {
        setEvents(eventsdata);
      }
    } else {
      await getAuthFromJSON();
    }
  };

  useEffect(() => {
    onFetchCommunitiesEvents();
  }, []);

  return (
    <FlatList
      style={styles.flatlist}
      data={events}
      keyExtractor={(item: any) => item?._id}
      showsVerticalScrollIndicator={false}
      numColumns={1}
      renderItem={({ item }) => (
        <Event
          id={item?._id}
          description={item?.description}
          imageURL={item?.photo}
          date={item?.date}
        />
      )}
    />
  );
};

const CreatedEvents = (): JSX.Element => {
  const { getAuthFromJSON, localAuthHistory } = useAuth();

  const [events, setEvents] = useState<[]>([]);

  const onFetchCommunitiesEvents = async (): Promise<void> => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      const { isOk: eventsOk, allEvents: eventsdata } = await getAllEvents(
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );

      if (eventsOk) {
        setEvents(eventsdata);
      }
    } else {
      await getAuthFromJSON();
    }
  };

  useEffect(() => {
    onFetchCommunitiesEvents();
  }, []);

  return (
    <FlatList
      style={styles.flatlist}
      data={events}
      keyExtractor={(item: any) => item?._id}
      showsVerticalScrollIndicator={false}
      numColumns={1}
      renderItem={({ item }) => (
        <Event
          id={item?._id}
          description={item?.description}
          imageURL={item?.photo}
          date={item?.date}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 2,
    marginBottom: 44,
  },
});

const renderScene = SceneMap({
  first: AllEvents,
  second: RecommendedEvents,
  third: CreatedEvents,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    labelStyle={{
      ...lighttext,
      textTransform: "capitalize",
      color: colors.text_faint_light,
    }}
    indicatorStyle={{ backgroundColor: colors.divider_bg_light }}
    activeColor={colors.text_primary_light}
    style={{ backgroundColor: colors.primary_bg_light }}
  />
);

export const EventsTabsView = (): JSX.Element => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: "first", title: "All" },
    { key: "second", title: "For you" },
    { key: "third", title: "By you" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};
