import React, { JSX, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  Text,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { uploadFile } from "../../utils/fileUploader";
import { createCommunity } from "../../api/communities";
import { AppHeader } from "../../components/global/AppHeader";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { BottomNavBar } from "../../components/global/BottomNavBar";
import { boldtext, colors, container, lighttext } from "../../assets/constants";
import { AutoAwesomeIcon, ImageIcon } from "../../assets/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateCommunityScreen(): JSX.Element {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { renderanimation, showAnimation, hideAnimation } = useAnimation();

  const [localfileURI, setlocalfileURI] = useState<string>("");
  const [communityImage, setcommunityImage] = useState<string>("");
  const [communityName, setcommunityName] = useState<string>("");
  const [communityTags, setcommunityTags] = useState<string>("");
  const [aboutCommunity, setaboutCommunity] = useState<string>("");
  const [allowJoin, setallowJoin] = useState<boolean>(true);
  const [allowMessaging, setallowMessaging] = useState<boolean>(true);

  const onUploadCommunityImage = async (): Promise<void> => {
    let res = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });

    if (!res.canceled) {
      setlocalfileURI(res.assets[0]?.uri);
      const fileUrl = await uploadFile(res.assets[0]);
      setcommunityImage(fileUrl?.url);
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

  const onCreateCommunity = async (): Promise<void> => {
    showAnimation("loading", "creating your event");

    const { isOk } = await createCommunity(
      communityImage,
      aboutCommunity,
      communityName,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    if (isOk) {
      hideAnimation();

      navigation.navigate("communitiesScreen");
    } else {
      showAnimation("error", "an unexpected error occurred, try again");

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  useEffect(() => {
    getAuthFromJSON();
  }, []);

  return (
    <SafeAreaView style={[container, styles.container]}>
      <AppHeader rendersIcon={false} pageTitle="Create a community" />

      {localfileURI ? (
        <Image source={{ uri: localfileURI }} style={styles.icon} />
      ) : (
        <TouchableOpacity style={styles.icon} onPress={onUploadCommunityImage}>
          <ImageIcon />
        </TouchableOpacity>
      )}

      <TextInput
        style={styles.inputctr}
        placeholder="Give your community a name"
        value={communityName}
        onChangeText={(text) => setcommunityName(text)}
      />

      <TextInput
        style={styles.inputctr}
        placeholder="Add community tags"
        value={communityTags}
        onChangeText={(text) => setcommunityTags(text)}
      />

      <Text
        style={[lighttext, { marginTop: 8, marginLeft: 8, marginBottom: 8 }]}
      >
        Inform others what this community is about
      </Text>

      <TextInput
        style={[styles.inputctr, styles.multiline]}
        multiline
        placeholder="This is a community of..."
        value={aboutCommunity}
        onChangeText={(text) => setaboutCommunity(text)}
      />

      <View style={styles.evnttype}>
        <View>
          <Text style={lighttext}>Joining Activity</Text>
          <Text style={boldtext}>Allow others to join this community</Text>
        </View>

        <Switch
          disabled
          value={allowJoin}
          onValueChange={() => setallowJoin(!allowJoin)}
        />
      </View>

      <View style={styles.evnttype}>
        <View>
          <Text style={lighttext}>Messaging Activity</Text>
          <Text style={boldtext}>
            Allow others to send messages in this community
          </Text>
        </View>

        <Switch
          disabled
          value={allowMessaging}
          onValueChange={() => setallowMessaging(!allowMessaging)}
        />
      </View>

      <LargeTouchableButton
        dpIcon={<AutoAwesomeIcon />}
        dpText="Create Community"
        onPressFunc={onCreateCommunity}
        isDisabled={
          communityName == "" || aboutCommunity == "" || renderanimation
        }
        xtraStyles={{ width: "96%", marginTop: 32, alignSelf: "center" }}
      />

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
  icon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 8,
    top: 90,
    borderWidth: 0.5,
    borderRadius: 96,
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
    marginTop: 20,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
