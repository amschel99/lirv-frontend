import React, { JSX } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFab } from "../context/fabcontext";
import { AppHeader } from "../components/global/AppHeader";
import { FABMenu } from "../components/global/fab/FABMenu";
import { FAB } from "../components/global/fab/FAB";
import { EventsTabsView } from "../components/events/EventsTabs";
import { BottomNavBar } from "../components/global/BottomNavBar";
import { container } from "../assets/constants";



export default function EventsScreen(): JSX.Element {
  const { rendersFabMenu } = useFab();

  return (
    <SafeAreaView style={[container, styles.container]}>
      <AppHeader rendersIcon={false} pageTitle="Events" />

      <EventsTabsView />

      {rendersFabMenu && <FABMenu />}
      {!rendersFabMenu && <FAB />}
      <BottomNavBar selectedScreen="none" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
});
