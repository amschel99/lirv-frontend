import React, { JSX, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { updateBusinessDetails } from "../../api/authentication";
import { DropDown } from "../../components/global/DropDown";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { ArrowRightIcon } from "../../assets/icons";
import { colors, container, lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BusinessAccountDetailsScreen(): JSX.Element {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [bnsName, setBnsName] = useState<string>("");
  const [bnsStroy, setBnsStory] = useState<string>("");
  const [bnsLocation, setBnsLocation] = useState<string>("");
  const [selectedCompanySizeValue, setSelectedCompanySizeValue] =
    useState(null);
  const [selectedIndustryValue, setSelectedIndustryValue] = useState(null);
  /*track dropdowns*/
  const [showCompanySizeDropDown, setShowCompanySizeDropDown] = useState(false);
  const [showIndustryValue, setShowIndustryValue] = useState(false);

  const closeAllDropDowns = () => {
    setShowCompanySizeDropDown(false);
    setShowIndustryValue(false);
  };

  const toggleShowIndustryValue = () => {
    setShowIndustryValue((prev) => !prev);

    setShowCompanySizeDropDown(false);
  };

  const toggleShowCompanySizeDropDown = () => {
    setShowCompanySizeDropDown((prev) => !prev);

    setShowIndustryValue(false);
  };

  const onGoToLinksScreen = async (): Promise<void> => {
    showAnimation("loading", "Updating your business details...");

    await getAuthFromJSON();

    const { isOk } = await updateBusinessDetails(
      bnsName,
      selectedIndustryValue,
      bnsStroy,
      bnsLocation,
      selectedCompanySizeValue,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    if (isOk) {
      hideAnimation();
      navigation.navigate("addaccountlinks", { accType: 1 });
    } else {
      showAnimation("error", "An unexpected error occurred, please try again");

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  return (
    <SafeAreaView style={[container, styles.container]}>
      <Pressable
        style={[container, styles.pressable]}
        onPress={(event) =>
          event.target == event.currentTarget && closeAllDropDowns()
        }
      >
        <View>
          <Text style={[lighttext, { fontSize: 18, marginBottom: 32 }]}>
            Tell us more about your business
          </Text>

          <TextInput
            placeholder="Your Business/Company Name"
            value={bnsName}
            onChangeText={(text) => setBnsName(text)}
            cursorColor={colors.text_primary_light}
            style={[lighttext, styles.textInput]}
          />

          <View style={styles.dropdown}>
            <DropDown
              list={["Education", "Consumer goods", "Technology"]}
              setSelecteOption={setSelectedIndustryValue}
              selectedValue={selectedIndustryValue}
              showDropDown={showIndustryValue}
              toggleShowDropDown={toggleShowIndustryValue}
              placeHolder="What Industry do you operate in ?"
            />
          </View>

          <View style={{ gap: 8 }}>
            <Text style={lighttext}>Share your story</Text>
            <TextInput
              multiline
              placeholder="Business/Company x is a..."
              value={bnsStroy}
              onChangeText={(text) => setBnsStory(text)}
              cursorColor={colors.text_primary_light}
              style={[lighttext, styles.multilineinput]}
            />
          </View>

          <TextInput
            placeholder="Where are you located"
            value={bnsLocation}
            onChangeText={(text) => setBnsLocation(text)}
            cursorColor={colors.text_primary_light}
            style={[lighttext, styles.textInput, { marginVertical: 20 }]}
          />

          <View style={styles.dropdown}>
            <DropDown
              list={["small", "medium", "large"]}
              setSelecteOption={setSelectedCompanySizeValue}
              selectedValue={selectedCompanySizeValue}
              showDropDown={showCompanySizeDropDown}
              toggleShowDropDown={toggleShowCompanySizeDropDown}
              placeHolder="What is the size of your company ?"
            />
          </View>
        </View>

        <LargeTouchableButton
          dpText="Continue"
          dpIcon={<ArrowRightIcon />}
          onPressFunc={() => onGoToLinksScreen()}
          isDisabled={
            bnsName == "" ||
            selectedIndustryValue == null ||
            selectedCompanySizeValue == null ||
            bnsStroy == "" ||
            bnsLocation == "" ||
            renderanimation
          }
        />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  pressable: {
    justifyContent: "space-between",
    padding: 0,
  },
  textInput: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.divider_bg_light,
  },
  dropdown: {
    marginVertical: 20,
  },
  multilineinput: {
    height: 150,
    padding: 8,
    borderWidth: 0.5,
    borderColor: colors.divider_bg_light,
    borderRadius: 4,
    textAlignVertical: "top",
  },
});
