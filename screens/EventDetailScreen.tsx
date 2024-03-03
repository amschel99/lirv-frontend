import React, { JSX, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
  Text,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { ProfilePicFlatList } from "../components/global/ProfilePicFlatList";
import { getAnEvent, attendEvent } from "../api/events";
import { getUser } from "../api/user";
import { useAuth } from "../context/authcontext";
import { useAnimation } from "../context/animationctx";
import { AppHeader } from "../components/global/AppHeader";
import { LargeTouchableButton } from "../components/global/Buttons";
import { getDateTimediff, formatDate } from "../utils/dates";
import { AutoAwesomeIcon, JoinLink } from "../assets/icons";
import { EventSkeleton } from "../components/global/skeletons/EventSkeleton";
import {
  container,
  lighttext,
  colors,
  fonts,
  boldtext,
} from "../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

type eventDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "eventdetails"
>;

export default function EventDetailScreen({
  route,
  navigation,
}: eventDetailsProps): JSX.Element {
  const eventId = route.params.eventId;

  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [event, setEvent] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userimages, setUserImages] = useState<any[]>([]);

  const openMeetingLink = async (meetingLink: string): Promise<void> => {
    await WebBrowser.openBrowserAsync(meetingLink);
  };

  const reserveSpot = async (): Promise<void> => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      showAnimation("loading", "please wait as we add you to the event...");

      const { isOk } = await attendEvent(
        route.params.eventId,
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );

      if (isOk) {
        showAnimation("success", "You were added to this event's attendes");

        setTimeout(() => {
          hideAnimation();
        }, 3500);
      } else {
        showAnimation(
          "error",
          "an unexpected error occurred, please try again"
        );

        setTimeout(() => {
          hideAnimation();
        }, 3500);
      }
    } else {
      await getAuthFromJSON();
    }
  };

  const fetchEvent = async (): Promise<void> => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      showAnimation("loading", "hold on as we get the event details...");

      const { isOk: eventOK, event } = await getAnEvent(
        eventId,
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );
      const { user, isOk: userOK } = await getUser(
        JSON.parse(await AsyncStorage.getItem("user")).accessToken,
        event?.postedBy
      );

      if (eventOK && userOK) {
        setEvent(event);
        setUser(user);

        hideAnimation();
      } else {
        showAnimation("error", "an unexpected error occurred");

        setTimeout(() => {
          hideAnimation();
        }, 3500);

        navigation.navigate("eventsscreen");
      }
    } else {
      getAuthFromJSON();
    }
  };

  const fetchUserImages = async () => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      event?.attending?.map(async (userId: string) => {
        const { user } = await getUser(
          JSON.parse(await AsyncStorage.getItem("user")).accessToken,
          userId
        );

        setUserImages((prevUrls) => [...prevUrls, user?.profileImage]);
      });
    } else {
      getAuthFromJSON();
    }
  };

  useEffect(() => {
    fetchEvent();
    fetchUserImages();
  }, []);

  return (
    <SafeAreaView style={[container, { paddingHorizontal: 0 }]}>
      <AppHeader pageTitle="Event" rendersIcon={false} />

      {renderanimation ? (
        <EventSkeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.postedByContainer}>
            <View style={styles.authorDetails}>
              <Text style={{ ...lighttext }}>By </Text>
              <Text style={{ ...boldtext }}>{user?.firstname}</Text>
            </View>

            <Image
              style={styles.profilePhoto}
              source={{ uri: event?.photo && event?.photo }}
            ></Image>
          </View>

          <ImageBackground
            source={{ uri: event?.photo && event?.photo }}
            style={styles.eventHeader}
          >
            <Text style={[boldtext, { padding: 8, fontSize: 18 }]}>
              {event?.title}
            </Text>

            <Text style={[boldtext, { padding: 8, fontSize: 16 }]}>
              {event?.type === "Physical" ? "Physical" : "Virtual"}
            </Text>
          </ImageBackground>

          <View style={styles.eventDetails}>
            <Text style={[lighttext, { fontSize: 16 }]}>About this event</Text>
            <Text style={[boldtext, { marginTop: 5 }]}>
              {event?.description}
            </Text>
          </View>

          <View style={styles.dateArea}>
            <Text style={boldtext}>Date</Text>

            <Text style={[boldtext, { marginTop: 10 }]}>
              {event?.date && formatDate(event?.date)}
            </Text>

            <Text style={lighttext}>
              {event?.date && getDateTimediff(event?.date)}
            </Text>
          </View>

          {event?.type === "Online" && (
            <View style={styles.eventType}>
              <Text style={{ ...lighttext }}>Virtual Meeting</Text>

              <TouchableOpacity
                onPress={() => openMeetingLink(event?.link)}
                style={styles.joinMeeting}
              >
                <Text style={{ ...lighttext, marginHorizontal: 3 }}>
                  Join this meeting
                </Text>

                <JoinLink />
              </TouchableOpacity>
            </View>
          )}

          {event?.attending?.length > 0 && (
            <View style={{ marginTop: 32, paddingHorizontal: 8 }}>
              <Text style={[boldtext, { marginBottom: 8 }]}>Attending</Text>

              <ProfilePicFlatList imageURLs={userimages} />
            </View>
          )}

          <LargeTouchableButton
            onPressFunc={reserveSpot}
            dpText={"Reserve my slot"}
            dpIcon={<AutoAwesomeIcon />}
            isDisabled={renderanimation}
            xtraStyles={{
              width: "97%",
              marginTop: 32,
              justifyContent: "center",
              alignSelf: "center",
              gap: 10,
            }}
            largeText={false}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  postedByContainer: {
    marginBottom: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorDetails: {
    flexDirection: "row",
  },
  profilePhoto: {
    width: 44,
    height: 44,
    borderRadius: 88,
    backgroundColor: colors.content_bg_light,
  },
  AuthorTextColor: {
    color: colors.text_primary_light,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  eventHeader: {
    height: 180,
    opacity: 0.55,
    justifyContent: "space-between",
  },
  eventDetails: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  dateArea: {
    marginTop: 10,
    paddingHorizontal: 8,
  },
  dateInput: {
    justifyContent: "center",
    fontSize: 14,
    color: "red",
  },
  eventType: {
    marginTop: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
  },
  joinMeeting: {
    padding: 10,
    flexDirection: "row",
    borderRadius: 8,
    gap: 4,
    backgroundColor: colors.content_bg_light,
  },
  reserveSpot: {
    padding: 7,
  },
});
