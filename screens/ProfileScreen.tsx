import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { SafeAreaView } from "react-native-safe-area-context";
import { getLoggedInUser } from "../api/user";
import { signOut } from "firebase/auth";
import { firebaseauth } from "../firebase/config";
import { useAuth } from "../context/authcontext";
import { useAnimation } from "../context/animationctx";
import { AppHeader } from "../components/global/AppHeader";
import { BottomNavBar } from "../components/global/BottomNavBar";
import { CompanyProfile } from "../components/profile/CompanyProfile";
import { PersonalProfile } from "../components/profile/PersonalProfile";
import { LargeTouchableButton } from "../components/global/Buttons";
import { HomeSkeleton } from "../components/global/skeletons/HomeSkeleton";
import {
  LaunchIcon,
  WebsiteIcon,
  LinkedinIcon,
  TwitterIcon,
  GitHubIcon,
  JoinLink,
} from "../assets/icons";
import { boldtext, colors, container } from "../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const { getAuthFromJSON, localAuthHistory, updateAuthJSON } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [userProfile, setUserProfile] = useState<any>(null);

  const onGetUserProfile = async (): Promise<void> => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      showAnimation("loading", "getting your profile...");

      const { isOk, user } = await getLoggedInUser(
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );

      if (isOk) {
        setUserProfile(user);
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

  const OpenLinkUrl = async (link: string) => {
    await WebBrowser.openBrowserAsync(link);
  };

  const onLogOut = async (): Promise<void> => {
    showAnimation("loading", "Signing you out, please wait...");

    await signOut(firebaseauth)
      .then(() => {
        hideAnimation();
      })
      .catch(() => {
        showAnimation(
          "error",
          "An unexpected error occurred, please try again"
        );

        setTimeout(() => {
          hideAnimation();
        }, 3500);
      });
  };

  useEffect(() => {
    onGetUserProfile();
  }, []);

  return (
    <SafeAreaView style={[container, { paddingHorizontal: 0 }]}>
      <AppHeader rendersIcon={false} pageTitle="My profile" />

      {renderanimation ? (
        <HomeSkeleton />
      ) : (
        <>
          <ScrollView
            style={{ marginBottom: 50 }}
            showsVerticalScrollIndicator={false}
          >
            {userProfile?.accountType == 0 ? (
              <PersonalProfile accProfile={userProfile} />
            ) : (
              <CompanyProfile accProfile={userProfile} />
            )}

            <Text style={styles.ctrtitle}>Online presence</Text>
            <View style={styles.linksctr}>
              <TouchableOpacity
                onPress={() => OpenLinkUrl(userProfile?.links?.web)}
                style={styles.link}
              >
                <View style={styles.linkicon}>
                  <WebsiteIcon />
                  <Text style={boldtext}>Website</Text>
                </View>

                <View style={styles.removeicon}>
                  <LaunchIcon />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => OpenLinkUrl(userProfile?.links?.linkedin)}
                style={styles.link}
              >
                <View style={styles.linkicon}>
                  <LinkedinIcon />
                  <Text style={boldtext}>LinkedIn</Text>
                </View>

                <View style={styles.removeicon}>
                  <LaunchIcon />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => OpenLinkUrl(userProfile?.links?.twitter)}
                style={styles.link}
              >
                <View style={styles.linkicon}>
                  <TwitterIcon />
                  <Text style={boldtext}>X</Text>
                </View>

                <View style={styles.removeicon}>
                  <LaunchIcon />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => OpenLinkUrl(userProfile?.links?.github)}
                style={styles.link}
              >
                <View style={styles.linkicon}>
                  <GitHubIcon />
                  <Text style={boldtext}>GitHub</Text>
                </View>

                <View style={styles.removeicon}>
                  <LaunchIcon />
                </View>
              </TouchableOpacity>
            </View>

            <LargeTouchableButton
              dpText="Sign Out"
              dpIcon={<JoinLink color={colors.text_primary_dark} />}
              onPressFunc={() => onLogOut()}
              xtraStyles={{
                width: "96%",
                marginTop: 24,
                alignSelf: "center",
                justifyContent: "center",
                gap: 10,
              }}
              largeText={false}
            />
          </ScrollView>
        </>
      )}
      <BottomNavBar selectedScreen="none" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profilepicctr: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  updatepic: {
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 6,
    backgroundColor: colors.content_bg_light,
  },
  ctrtitle: { ...boldtext, marginTop: 8, paddingHorizontal: 8 },
  mystory: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  experiencectr: {
    marginTop: 8,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.popup_bg_light,
  },
  removeicon: {
    padding: 4,
  },
  linksctr: {},
  link: {
    marginTop: 8,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.popup_bg_light,
  },
  linkicon: {
    flexDirection: "row",
    gap: 8,
  },
});
