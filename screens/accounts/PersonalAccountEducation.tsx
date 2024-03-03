import React, { JSX, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { updatePersonalAccEducation } from "../../api/authentication";
import { RootStackParamList } from "../../navigation";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { DropDown } from "../../components/global/DropDown";
import { CheckBox } from "../../components/global/CheckBox";
import { ArrowRightIcon } from "../../assets/icons";
import { colors, container, lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkipOrHome from "../../components/Skip";

export default function PersonalAccountEducationScreen(): JSX.Element {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [selectedLevel, setselectedLevel] = useState("");
  const [progTitle, setprogTitle] = useState("");
  const [instituition, setinstituition] = useState("");
  const [startdate, setstartdate] = useState("08-10-2023");
  const [enddate, setenddate] = useState("08-10-2023");
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onContinueToPersonalEducation = async (): Promise<void> => {
    showAnimation("loading", "Updating your academics...");

    getAuthFromJSON();

    const { isOk } = await updatePersonalAccEducation(
      selectedLevel,
      progTitle,
      startdate,
      enddate,
      checkboxSelected,
      instituition,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    if (isOk) {
      hideAnimation();
      navigation.navigate("personalaccskills");
    } else {
      showAnimation("error", "An unexpected error occurred, plaese try again");

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  const closeAllDropDowns = () => {
    setShowDropDown(false);
  };

  const toggleCheckbox = () => {
    setCheckboxSelected((prev) => !prev);
  };

  const toggleShowDropDown = () => {
    setShowDropDown((prev) => !prev);
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
          <Text style={[lighttext, { fontSize: 18 }]}>
            Tell us about your academic background
          </Text>
          
          <View style={styles.inputArea}>
            <DropDown
              list={["pHd", "Masters", "Degree", "Diploma", "Certificate"]}
              setSelecteOption={setselectedLevel}
              showDropDown={showDropDown}
              toggleShowDropDown={toggleShowDropDown}
              placeHolder="Level"
              selectedValue={selectedLevel}
            />

            <TextInput
              style={styles.input}
              placeholder="Program Title (Computer Science)"
              value={progTitle}
              onChangeText={(text) => setprogTitle(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Institution"
              value={instituition}
              onChangeText={(text) => setinstituition(text)}
            />

            <View style={styles.dateArea}>
              <Text style={lighttext}>Start Date</Text>
              <TextInput
                style={styles.input}
                placeholder="9-20-2020"
                value={startdate}
                onChangeText={(text) => setstartdate(text)}
              />
            </View>

            <CheckBox
              dpText="I am still taking this program"
              isSelected={checkboxSelected}
              toggleSelected={toggleCheckbox}
            />

            {!checkboxSelected && (
              <View style={styles.dateArea}>
                <Text style={lighttext}>End Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="08-01-2023"
                  value={enddate}
                  onChangeText={(text) => setenddate(text)}
                />
              </View>
            )}
          </View>
        </View>

        <LargeTouchableButton
          onPressFunc={() => onContinueToPersonalEducation()}
          dpText={"Continue"}
          dpIcon={<ArrowRightIcon />}
          isDisabled={
            selectedLevel == "" ||
            progTitle == "" ||
            instituition == "" ||
            startdate == "" ||
            enddate == "" ||
            renderanimation
          }
        />
             <SkipOrHome navigation={navigation}/>
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
  dateArea: {
    display: "flex",
    gap: 8,
  },
  dateInput: {
    fontSize: 14,
    color: "red",
    justifyContent: "center",
  },
});
