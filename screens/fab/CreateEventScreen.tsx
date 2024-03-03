import React, { JSX, useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Text,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../context/authcontext";
import { createEvent } from "../../api/events";
import { useAnimation } from "../../context/animationctx";
import { RootStackParamList } from "../../navigation";
import { uploadFile } from "../../utils/fileUploader";
import CalendarPicker from "react-native-calendar-picker";
import { AppHeader } from "../../components/global/AppHeader";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { BottomNavBar } from "../../components/global/BottomNavBar";
import { boldtext, colors, container, lighttext } from "../../assets/constants";
import { AutoAwesomeIcon, ImageIcon } from "../../assets/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateEventScreen(): JSX.Element {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [localfileURI, setlocalfileURI] = useState<string>("");
  const [evntName, setevntName] = useState<string>("");
  const [eventImage, seteventImage] = useState<string>("");
  const [evntStartDate, setevntStartDate] = useState<Date>(null);
  const [aboutEvnt, setaboutEvnt] = useState<string>("");
  const [evntIsVirtual, setevntIsVirtual] = useState<boolean>(true);
  const [evnttype, setevntType] = useState<string>("Online");
  const [evntLink, setEvntLink] = useState<string>("");

  const [showStartCalendar, setShowStartcalendar] = useState<boolean>(false);

  const onPressBack = (): boolean => {
    setShowStartcalendar(false);
    return true;
  };

  const onUploadCommunityImage = async (): Promise<void> => {
    let res = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });

    if (!res.canceled) {
      setlocalfileURI(res.assets[0]?.uri);

      const fileUrl = await uploadFile(res.assets[0]);
      seteventImage(fileUrl?.url);
    } else {
      showAnimation(
        "error",
        "there was an error with the image, please try again"
      );

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  const onCreateEvent = async (): Promise<void> => {
    showAnimation("loading", "creating your event");

    const { isOk, createdEvent } = await createEvent(
      eventImage,
      String(evntStartDate),
      evntName,
      aboutEvnt,
      evnttype,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken,
      evntLink
    );

    if (isOk) {
      hideAnimation();

      navigation.navigate("eventdetails", { eventId: createdEvent?._id });
    } else {
      showAnimation("error", "an unexpected error occurred, try again");

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);

  useEffect(() => {
    getAuthFromJSON();
  }, []);

  return (
    <SafeAreaView style={[container, styles.container]}>
      <AppHeader rendersIcon={false} pageTitle="Create an event" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 48 }}
      >
        {localfileURI ? (
          <Image source={{ uri: localfileURI }} style={styles.icon} />
        ) : (
          <TouchableOpacity
            style={styles.icon}
            onPress={onUploadCommunityImage}
          >
            <ImageIcon />
          </TouchableOpacity>
        )}

        <TextInput
          style={styles.inputctr}
          placeholder="Give your event a name"
          value={evntName}
          onChangeText={(text) => setevntName(text)}
        />

        <TouchableOpacity
          onPress={() => setShowStartcalendar(true)}
          style={styles.datectr}
        >
          <Text style={lighttext}>
            {evntStartDate
              ? String(evntStartDate)
              : "Set the date for the event"}
          </Text>
        </TouchableOpacity>

        <Text
          style={[lighttext, { marginTop: 8, marginLeft: 8, marginBottom: 8 }]}
        >
          Inform others what this event is about
        </Text>

        <TextInput
          style={[styles.inputctr, styles.multiline]}
          multiline
          placeholder="This is a metting for..."
          value={aboutEvnt}
          onChangeText={(text) => setaboutEvnt(text)}
        />

        <View style={styles.evnttype}>
          <View>
            <Text style={boldtext}>Event type</Text>
            <Text style={lighttext}>This is a virtual event</Text>
          </View>

          <Switch
            value={evntIsVirtual}
            onValueChange={() => {
              setevntIsVirtual(!evntIsVirtual);
              setevntType("Physical");
            }}
          />
        </View>

        {showStartCalendar && (
          <CalendarPicker
            minDate={new Date()}
            enableDateChange
            onDateChange={setevntStartDate}
          />
        )}

        {evntIsVirtual && (
          <TextInput
            style={[styles.inputctr, { marginTop: 8 }]}
            placeholder="Provide a link to the virtual meeting"
            value={evntLink}
            onChangeText={(text) => setEvntLink(text)}
          />
        )}

        <LargeTouchableButton
          dpIcon={<AutoAwesomeIcon />}
          dpText="Create Event"
          onPressFunc={() => onCreateEvent()}
          isDisabled={
            evntName == "" ||
         
            String(evntStartDate) == "" ||
            aboutEvnt == "" ||
            renderanimation
          }
          xtraStyles={{ width: "96%", marginTop: 32, alignSelf: "center" }}
        />
      </ScrollView>

      <BottomNavBar selectedScreen="none" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  inputctr: {
    ...lighttext,
    marginBottom: 8,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderBottomWidth: 0.5,
    borderColor: colors.divider_bg_light,
  },
  datectr: {
    marginBottom: 8,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderBottomWidth: 0.5,
    borderColor: colors.divider_bg_light,
  },
  icon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 8,
    top: 90,
    borderWidth: 0.5,
    borderRadius: 500,
    borderColor: colors.divider_bg_light,
    backgroundColor: colors.content_bg_light,
    zIndex: 1000,
  },
  icon_name: {
    flexDirection: "row-reverse",
  },
  multiline: {
    textAlignVertical: "top",
    padding: 4,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: colors.divider_bg_light,
    height: 120,
  },
  evnttype: {
    marginTop: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
