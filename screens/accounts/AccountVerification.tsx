import React, { JSX, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebaseauth } from "../../firebase/config";
import { useAnimation } from "../../context/animationctx";
import { useAuth } from "../../context/authcontext";

import {
  requestPhoneVerificationCode,
  verifyPhoneNumber,
  addDevicePushToken,
} from "../../api/authentication";

import { LargeTouchableButton } from "../../components/global/Buttons";
import { ArrowRightIcon, LockIcon, VerifyPhoneIcon } from "../../assets/icons";
import {
  SCREENHEIGHT,
  SCREENWIDTH,
  boldtext,
  colors,
  container,
  lighttext,
} from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkipOrHome from "../../components/Skip";

export default function AccountVerificationScreen({ navigation }): JSX.Element {
  const { getAuthFromJSON, localAuthHistory, updateToGoHome } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [pushToken, setPushToken] = useState<string>("");
  const [requestedCode, setrequestedCode] = useState<boolean>(false);
  const [phoneNumber, setphoneNumber] = useState<string>("");
  const [vrfCode, setVrfCode] = useState<string>("");

  const onGetVerificationCode = async (): Promise<void> => {
    showAnimation(
      "loading",
      "Please wait as we get you a verification code..."
    );

    await getAuthFromJSON();

    const { isOk } = await requestPhoneVerificationCode(
      `+254${phoneNumber}`,
      localAuthHistory.currAccessToken
    );

    if (isOk) {
      showAnimation(
        "success",
        "Use the verification code to verify your account"
      );
      //BAD CODE
      navigation.navigate("homescreen");

      setTimeout(() => hideAnimation(), 3500);
      setrequestedCode(true);
    } else {
      //BAD CODE
      navigation.navigate("homescreen");
      showAnimation(
        "error",
        "We were unable to get you a verification code, please try again"
      );

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  const onVerifyPhoneumber = async (): Promise<void> => {
    showAnimation("loading", "Verifying your account");

    await getAuthFromJSON();

    const { isOk } = await verifyPhoneNumber(
      `+254${phoneNumber}`,
      vrfCode,
      JSON.parse(await AsyncStorage.getItem("user")).accessToken
    );

    if (isOk) {
      hideAnimation();
      navigation.navigate("homescreen");
    } else {
      showAnimation(
        "error",
        "Unable to verification your account, please try again"
      );

      setTimeout(() => {
        hideAnimation();
      }, 3500);
    }
  };

  return (
    <SafeAreaView style={container}>
      <Text style={[lighttext, { fontSize: 18, marginBottom: 32 }]}>
        One last step, confirm your identity by phone
      </Text>

      <View style={styles.contentctr}>
        <View style={styles.lockiconctr}>
          <LockIcon />
        </View>

        <View style={styles.phoneinputctr}>
          <Text style={lighttext}>+254</Text>
          <View style={styles.divider} />
          <TextInput
            keyboardType="phone-pad"
            maxLength={9}
            placeholder="7123456789"
            value={phoneNumber}
            onChangeText={(text) => setphoneNumber(text)}
            cursorColor={colors.text_primary_light}
            style={[lighttext, styles.phoneinput]}
          />
        </View>

        {requestedCode && (
          <Text style={[boldtext, { width: "100%", marginTop: 32 }]}>
            Verification Code
          </Text>
        )}

        {requestedCode && (
          <View style={styles.verificationcodesctr}>
            <TextInput
              keyboardType="number-pad"
              returnKeyType="next"
              maxLength={1}
              placeholder="0"
              onChangeText={(text) =>
                setVrfCode((prvcode) => `${prvcode}${text}`)
              }
              cursorColor={colors.text_primary_light}
              style={[lighttext, styles.vrcodeinput]}
            />
            <TextInput
              keyboardType="number-pad"
              returnKeyType="next"
              maxLength={1}
              placeholder="0"
              onChangeText={(text) =>
                setVrfCode((prvcode) => `${prvcode}${text}`)
              }
              cursorColor={colors.text_primary_light}
              style={[lighttext, styles.vrcodeinput]}
            />
            <TextInput
              keyboardType="number-pad"
              returnKeyType="next"
              maxLength={1}
              placeholder="0"
              onChangeText={(text) =>
                setVrfCode((prvcode) => `${prvcode}${text}`)
              }
              cursorColor={colors.text_primary_light}
              style={[lighttext, styles.vrcodeinput]}
            />
            <TextInput
              keyboardType="number-pad"
              returnKeyType="next"
              maxLength={1}
              placeholder="0"
              onChangeText={(text) =>
                setVrfCode((prvcode) => `${prvcode}${text}`)
              }
              cursorColor={colors.text_primary_light}
              style={[lighttext, styles.vrcodeinput]}
            />
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              placeholder="0"
              onChangeText={(text) =>
                setVrfCode((prvcode) => `${prvcode}${text}`)
              }
              cursorColor={colors.text_primary_light}
              style={[lighttext, styles.vrcodeinput]}
            />
            <TextInput
              keyboardType="number-pad"
              returnKeyType="done"
              maxLength={1}
              placeholder="0"
              onChangeText={(text) =>
                setVrfCode((prvcode) => `${prvcode}${text}`)
              }
              cursorColor={colors.text_primary_light}
              style={[lighttext, styles.vrcodeinput]}
            />
          </View>
        )}

        <LargeTouchableButton
          dpText={requestedCode ? "Verify my phone" : "Get a verification code"}
          dpIcon={requestedCode ? <VerifyPhoneIcon /> : <ArrowRightIcon />}
          onPressFunc={
            requestedCode ? onVerifyPhoneumber : onGetVerificationCode
          }
          isDisabled={
            (requestedCode && vrfCode.length < 6) ||
            phoneNumber.length < 9 ||
            renderanimation
          }
          xtraStyles={{ marginTop: 32 }}
        />
          <SkipOrHome navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentctr: {
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    padding: 8,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
  },
  lockiconctr: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 500,
    borderColor: colors.divider_bg_light,
    backgroundColor: colors.content_bg_light,
  },
  phoneinputctr: {
    width: "100%",
    height: 48,
    marginTop: 16,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: colors.divider_bg_light,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.content_bg_light,
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: colors.divider_bg_light,
  },
  phoneinput: { width: "85%" },
  verificationcodesctr: {
    width: "100%",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vrcodeinput: {
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 500,
    borderColor: colors.divider_bg_light,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: colors.content_bg_light,
  },
});
