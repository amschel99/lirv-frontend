import React, { JSX, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { updatePersonalSkills } from "../../api/authentication";
import { RootStackParamList } from "../../navigation";
import { LargeTouchableButton } from "../../components/global/Buttons";
import {
  MultiSelectOption,
  MultipleSelectDropDown,
} from "../../components/global/MultipleSelectDropDown";
import { ArrowRightIcon } from "../../assets/icons";
import { colors, container, lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkipOrHome from "../../components/Skip";

export default function PersonalAccountProficienciesScreen(): JSX.Element {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  let selectedskills: string[] = [];

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showDropDown, setShowDropDown] = useState(false);

  const [dropDownValues, setDropDownValues] = useState<MultiSelectOption[]>([
    { name: "Communication", selected: false },
    { name: "Programming", selected: false },
    { name: "Rust", selected: false },
    { name: "Java", selected: false },
    { name: "Golang", selected: false },
    { name: "Python", selected: false },
    { name: "Javascript", selected: false },
    { name: "Typescript", selected: false },
  ]);

  const toggleShowDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  dropDownValues.map((val) => {
    if (val.selected) selectedskills.push(val.name);
  });

  const onContinueToPersonalExp = async (): Promise<void> => {
    showAnimation("loading", "Updating your skills...");

    getAuthFromJSON();

    const { isOk } = await updatePersonalSkills(
      selectedskills,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    if (isOk) {
      hideAnimation();
      navigation.navigate("personalaccexperience");
    } else {
      showAnimation("error", "An unexpected error occurred, plaese try again");

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  return (
    <SafeAreaView style={[container, styles.container]}>
      <View>
        <Text style={[lighttext, { fontSize: 18 }]}>
          Tell us about your proficiencies
        </Text>

        <View style={styles.inputArea}>
          <MultipleSelectDropDown
            label={"Choose a skill"}
            optionList={dropDownValues}
            setOptionList={setDropDownValues}
            showDropDown={showDropDown}
            toggleShowDropDown={toggleShowDropDown}
          />
        </View>
      </View>

      <LargeTouchableButton
        onPressFunc={() => onContinueToPersonalExp()}
        dpText={"Continue"}
        dpIcon={<ArrowRightIcon />}
        isDisabled={selectedskills.length == 0 || renderanimation}
      />
        <SkipOrHome navigation={navigation}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  inputArea: {
    paddingTop: 32,
    display: "flex",
    gap: 20,
  },
  input: {
    ...lighttext,
    height: 43,
    paddingVertical: 12,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: colors.divider_bg_light,
  },
});
