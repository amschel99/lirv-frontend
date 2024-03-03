import React, { JSX, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { updatePersonalAccDetails } from "../../api/authentication";
import { RootStackParamList } from "../../navigation";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { ArrowRightIcon } from "../../assets/icons";
import { container, lighttext, colors } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkipOrHome from "../../components/Skip";

export default function PersonalAccountDetailsScreen(): JSX.Element {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [usrStory, setUsrStory] = useState<string>("");

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onGoToPersonalEducationDetails = async (): Promise<void> => {
    showAnimation("loading", "Updating your account details...");

    await getAuthFromJSON();

    const { isOk } = await updatePersonalAccDetails(
      firstName,
      lastName,
      usrStory,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    if (isOk) {
      hideAnimation();
      navigation.navigate("personaleducationdetails");
    } else {
      showAnimation("error", "An unexpected error occurred, plaese try again");

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  return (
    <SafeAreaView style={[container, styles.container]}>
      <View style={{ gap: 20 }}>
        <Text style={[lighttext, { fontSize: 18 }]}>
          Tell us more about yourself
        </Text>

        <TextInput
          placeholder="Fisrt Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          cursorColor={colors.text_primary_light}
          style={[lighttext, styles.textinput]}
        />

        <TextInput
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
          cursorColor={colors.text_primary_light}
          style={[lighttext, styles.textinput]}
        />

        <View style={{ gap: 8 }}>
          <Text style={lighttext}>Share your story</Text>
          <TextInput
            multiline
            placeholder="I am a..."
            value={usrStory}
            onChangeText={(text) => setUsrStory(text)}
            cursorColor={colors.text_primary_light}
            style={[lighttext, styles.storyinput]}
          />
        </View>
      </View>

      <LargeTouchableButton
        dpText="Continue"
        dpIcon={<ArrowRightIcon />}
        onPressFunc={() => onGoToPersonalEducationDetails()}
        isDisabled={
          firstName == "" || lastName == "" || usrStory == "" || renderanimation
        }
      />
      {/**/ <SkipOrHome navigation={navigation} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  textinput: {
    paddingVertical: 6,
    color: colors.text_primary_light,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  storyinput: {
    height: 150,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: colors.divider_bg_light,
    textAlignVertical: "top",
  },
});
