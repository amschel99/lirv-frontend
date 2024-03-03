import React, { JSX, useEffect, useState } from "react";
import { BackHandler, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { RootStackParamList } from "../../navigation";
import { updateAccType } from "../../api/authentication";
import { AccountType } from "../../components/accounts/AccountType";
import { ProfessionDetails } from "../../components/accounts/ProfessionDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  boldtext,
  container,
  SCREENWIDTH,
  SCREENHEIGHT,
} from "../../assets/constants";

export default function AccountSelectionScreen(): JSX.Element {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [accountType, setaccountType] = useState<string>("");
  const [showProfessionalDetails, setshowProfessionalDetails] =
    useState<boolean>(false);

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onSelectCompany = async (): Promise<void> => {
    setaccountType("bns");
    showAnimation("loading", "Setting your account to a business account...");
    await getAuthFromJSON();
    if (!localAuthHistory?.currAccessToken) {
      await getAuthFromJSON();
      console.log(JSON.stringify(localAuthHistory));
    }
    console.log(JSON.stringify(localAuthHistory));
    const { isOk } = await updateAccType(
      1,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );
    if (isOk) {
      hideAnimation();
      navigation.navigate("businessaccdetails");
    } else {
      showAnimation("error", "An unexpected error occurred, please try again");
      setTimeout(() => {
        hideAnimation();
      }, 3500);
      setaccountType("");
    }
  };

  const onSelectIndividual = (): void => {
    setaccountType("ind");

    setshowProfessionalDetails(true);
  };

  const onPressBack = (): boolean => {
    setshowProfessionalDetails(false);
    setaccountType("");

    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);

  return (
    <SafeAreaView style={container}>
   
     

     <ProfessionDetails />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  acctypes: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
});
