import React, { JSX, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { RootStackParamList } from "../../navigation";
import { addAccountLinks } from "../../api/authentication";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { getNewFCMToken } from "../../notifications/hooks";
import {
  ArrowRightIcon,
  WebsiteIcon,
  TwitterIcon,
  GitHubIcon,
  LinkedinIcon,
} from "../../assets/icons";
import { colors, container, lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkipOrHome from "../../components/Skip";

type accountlinksProps = NativeStackScreenProps<
  RootStackParamList,
  "addaccountlinks"
>;

export default function AddLinksScreen({
  route,
  navigation,
}: accountlinksProps): JSX.Element {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [webLink, setwebLink] = useState<string>("");
  const [twitterLink, settwitterLink] = useState<string>("");
  const [githubLink, setgithubLink] = useState<string>("");
  const [linkedInLink, setlinkedInLink] = useState<string>("");

  const onGoToVerification = async (): Promise<void> => {
    showAnimation(
      "loading",
      route.params.accType == 0
        ? "Updating your details"
        : "Updating your business details..."
    );
    await getAuthFromJSON();

    const { isOk } = await addAccountLinks(
      githubLink,
      webLink,
      linkedInLink,
      twitterLink,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken,
      await getNewFCMToken()
    );

    if (isOk) {
      hideAnimation();
      navigation.navigate("accountverification");
    } else {
      showAnimation("error", "An unexpected error occurred, please try again");
      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  return (
    <SafeAreaView style={[container, styles.container]}>
      <View>
        <Text style={[lighttext, { fontSize: 18, marginBottom: 32 }]}>
          Add links where others can find you online
        </Text>

        <View style={styles.textinputctr}>
          <WebsiteIcon />
          <TextInput
            placeholder={
              route.params.accType == 0
                ? "my-website.com/"
                : "company-website.com/"
            }
            value={webLink}
            onChangeText={(text) => setwebLink(text)}
            cursorColor={colors.text_primary_light}
            style={[lighttext, styles.textinput]}
          />
        </View>

        <View style={styles.textinputctr}>
          <TwitterIcon />
          <TextInput
            placeholder="twitter.com/"
            value={twitterLink}
            onChangeText={(text) => settwitterLink(text)}
            cursorColor={colors.text_primary_light}
            style={[lighttext, styles.textinput]}
          />
        </View>

        <View style={styles.textinputctr}>
          <GitHubIcon />
          <TextInput
            placeholder="github.com/"
            value={githubLink}
            onChangeText={(text) => setgithubLink(text)}
            cursorColor={colors.text_primary_light}
            style={[lighttext, styles.textinput]}
          />
        </View>

        <View style={styles.textinputctr}>
          <LinkedinIcon />
          <TextInput
            placeholder="linked-in.com/"
            value={linkedInLink}
            onChangeText={(text) => setlinkedInLink(text)}
            cursorColor={colors.text_primary_light}
            style={[lighttext, styles.textinput]}
          />
        </View>
      </View>

      <LargeTouchableButton
        dpText="Continue"
        dpIcon={<ArrowRightIcon />}
        onPressFunc={() => onGoToVerification()}
        isDisabled={
         false
        }
      />
        <SkipOrHome navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  textinputctr: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  textinput: { width: "90%" },
});
