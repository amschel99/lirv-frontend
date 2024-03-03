import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { useAuth } from "../../context/authcontext";
import { NotificationIcon, ZeroNotificationIcon } from "../../assets/icons";
import { SCREENWIDTH, colors, lighttext } from "../../assets/constants";
import { getLoggedInUser } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotification } from "../../context/notificationctx";

export interface AppHeaderProps {
  rendersIcon: boolean;
  pageTitle?: string;
  xtrastyles?: {};
}

const appicon: any = require("../../assets/images/icon.png");

export const AppHeader = ({
  rendersIcon,
  pageTitle,
}: AppHeaderProps): JSX.Element => {
  const { localAuthHistory } = useAuth();
  const { profile, setProfile } = useNotification();

  const OnGetUser = async (): Promise<void> => {
    const { user } = await getLoggedInUser(
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    setProfile(user?.profileImage);
  };

  useEffect(() => {
    OnGetUser();
  }, []);

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [hasNewNotification, setHasNewNotification] = useState(true);

  return (
    <View style={styles.headContainer}>
      {rendersIcon ? (
        <Image source={appicon} style={styles.appicon} />
      ) : (
        <Text style={styles.appTitle}>{pageTitle}</Text>
      )}

      <View style={styles.rightGroup}>
        <TouchableOpacity style={styles.notificationIconContainer}>
          {hasNewNotification ? <NotificationIcon /> : <ZeroNotificationIcon />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("profilescreen")}>
          <Image
            source={profile ? { uri: profile } : appicon}
            style={styles.imageIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    width: SCREENWIDTH,
    paddingHorizontal: 8,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appicon: {
    width: 42,
    height: 42,
    borderRadius: 6,
  },
  appTitle: {
    ...lighttext,
    fontSize: 22,
    display: "flex",
  },
  rightGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  notificationIconContainer: {
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 76,
    backgroundColor: colors.content_bg_light,
  },
  imageIcon: {
    width: 44,
    height: 44,
    borderRadius: 88,
  },
});
