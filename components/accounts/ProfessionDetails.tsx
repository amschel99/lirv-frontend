import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { updateAccTitle } from "../../api/authentication";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { RootStackParamList } from "../../navigation";
import { LargeTouchableButton } from "../global/Buttons";
import { ArrowRightIcon } from "../../assets/icons";
import { boldtext, colors, lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DropDown } from "../../components/global/DropDown";
import { majorCareers } from "../../utils/careers";
import { SCREENHEIGHT } from "../../assets/constants";


export const ProfessionDetails = () => {
  const [selectedLevel, setselectedLevel] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const { getAuthFromJSON } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();
  const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onGoToPersonalAccDetails = async (): Promise<void> => {
    showAnimation("loading", "Updating your professional details...");

    const { isOk } = await updateAccTitle(selectedLevel, JSON.parse(await AsyncStorage.getItem("user")).accessToken);

    if (isOk) {
      hideAnimation();
      navigation.navigate("personalaccdetails");
    } else {
      showAnimation("error", "An unexpected error occurred, please try again");

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  useEffect(() => {
    getAuthFromJSON();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DropDown
          list={majorCareers}
          setSelecteOption={setselectedLevel}
          showDropDown={showDropDown}
          toggleShowDropDown={() => setShowDropDown(!showDropDown)}
          placeHolder="Select Career Field"
          selectedValue={selectedLevel}
        />
      </ScrollView>
      <LargeTouchableButton
        dpText="Continue"
        onPressFunc={onGoToPersonalAccDetails}
        dpIcon={<ArrowRightIcon />}
        isDisabled={selectedLevel === "" || renderanimation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_bg_light,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
    bottom:SCREENHEIGHT*35/100
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
