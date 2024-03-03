import React, { JSX, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { updatePersonalExperience } from "../../api/authentication";
import { RootStackParamList } from "../../navigation";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { CheckBox } from "../../components/global/CheckBox";
import { ArrowRightIcon } from "../../assets/icons";
import { colors, container, lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkipOrHome from "../../components/Skip";

export default function PersonalAccountExperienceScreen(): JSX.Element {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [position, setposition] = useState<string>("");
  const [jobtype, setjobtype] = useState<string>("");
  const [company, setcompany] = useState<string>("");
  const [startdate, setstartdate] = useState<string>("");
  const [enddate, setenddate] = useState<string>("");
  const [checkboxSelected, setCheckboxSelected] = useState(false);

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toggleCheckbox = () => {
    setCheckboxSelected((prev) => !prev);
  };

  const onContinueToAddAccountLinks = async (): Promise<void> => {
    showAnimation("loading", "Updating your experiences...");

    getAuthFromJSON();

    const { isOk } = await updatePersonalExperience(
      jobtype,
      position,
      company,
      startdate,
      enddate,
      checkboxSelected,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    if (isOk) {
      hideAnimation();
      navigation.navigate("addaccountlinks", { accType: 0 });
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
          Tell us about your career journey
        </Text>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Position (Architect, Lawyer, UI/UX designer...)"
            value={position}
            onChangeText={(text) => setposition(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Job type (full time, part time, internship)"
            value={jobtype}
            onChangeText={(text) => setjobtype(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Company"
            value={company}
            onChangeText={(text) => setcompany(text)}
          />

          <View style={styles.dateArea}>
            <Text style={lighttext}>Start Date</Text>
            <TextInput
              style={styles.input}
              placeholder="8-04-2020"
              value={startdate}
              onChangeText={(text) => setstartdate(text)}
            />
          </View>

          <CheckBox
            dpText="I am still working here"
            isSelected={checkboxSelected}
            toggleSelected={toggleCheckbox}
          />

          {!checkboxSelected && (
            <View style={styles.dateArea}>
              <Text style={lighttext}>End Date</Text>
              <TextInput
                style={styles.input}
                placeholder="8-10-2023"
                value={enddate}
                onChangeText={(text) => setenddate(text)}
              />
            </View>
          )}
        </View>
      </View>

      <LargeTouchableButton
        onPressFunc={onContinueToAddAccountLinks}
        dpText={"Continue"}
        dpIcon={<ArrowRightIcon />}
        isDisabled={
          position == "" ||
          jobtype == "" ||
          company == "" ||
          startdate == "" ||
          renderanimation
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
