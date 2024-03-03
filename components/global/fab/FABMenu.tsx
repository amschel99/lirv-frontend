import React, { JSX, useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  Text,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation";
import { useFab } from "../../../context/fabcontext";
import {
  ResourceIcon,
  JobPostingIcon,
  CommunitiesIcon,
  EventIcon,
} from "../../../assets/icons";
import {
  SCREENHEIGHT,
  SCREENWIDTH,
  colors,
  boldtext,
} from "../../../assets/constants";

export const FABMenu = (): JSX.Element => {
  const { hideFabMenu } = useFab();

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onGoToCreateCommunity = (): void => {
    hideFabMenu();
    navigation.navigate("createcommunity");
  };

  const onGoToCreateEvents = (): void => {
    hideFabMenu();
    navigation.navigate("createevent");
  };

  const onPressBack = (): boolean => {
    hideFabMenu();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/** 
      <View style={styles.row}>
        <Text style={boldtext}>Create a community</Text>

        <TouchableOpacity style={styles.action} onPress={onGoToCreateCommunity}>
          <CommunitiesIcon />
        </TouchableOpacity>
      </View>
      */}

      <View style={styles.row}>
        <Text style={boldtext}>Create an event</Text>

        <TouchableOpacity style={styles.action} onPress={onGoToCreateEvents}>
          <EventIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    paddingRight: 8,
    paddingBottom: 62,
    position: "absolute",
    bottom: 0,
    left: 0,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: 20,
    backgroundColor: colors.popup_bg_light,
    zIndex: 10000,
  },
  action: {
    width: 48,
    height: 48,
    borderWidth: 0.5,
    borderRadius: 500,
    borderColor: colors.divider_bg_light,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.content_bg_light,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
