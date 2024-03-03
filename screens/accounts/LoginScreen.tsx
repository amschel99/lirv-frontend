import React, { JSX, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useEmailAndPwdSignIn,
  useGoogleAuth,
} from "../../utils/firebaseauthentication";
import { useAnimation } from "../../context/animationctx";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { container, lighttext, boldtext, colors } from "../../assets/constants";
import { ArrowRightIcon, FacebookIcon, GitHubIcon } from "../../assets/icons";

export default function LoginScreen(): JSX.Element {
  const { signInWithGoogle } = useGoogleAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [usrEmail, setUsrEmail] = useState<string>("");
  const [usrPasswrd, setUsrPasswrd] = useState<string>("");

  const SignInWithEmailAndPassword = async (): Promise<void> => {
    showAnimation("loading", "Signing you in with your email...");

    useEmailAndPwdSignIn(usrEmail, usrPasswrd);

    hideAnimation();
  };

  const onGoogleSignin = () => {
    showAnimation("loading", "Signing you in with Google...");

    signInWithGoogle()
      .then(() => {
        hideAnimation();
      })
      .catch(() => {
        showAnimation(
          "error",
          "An unexpected error occurred, please try again"
        );

        setTimeout(() => {
          hideAnimation();
        }, 3500);
      });
  };

  return (
    <SafeAreaView style={[container, styles.container]}>
      <Text style={boldtext}>Sign in to your account</Text>

      <TextInput
        keyboardType="email-address"
        placeholder="Email address"
        value={usrEmail}
        onChangeText={(text) => setUsrEmail(text)}
        style={[lighttext, styles.textinput, { marginVertical: 12 }]}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={usrPasswrd}
        onChangeText={(text) => setUsrPasswrd(text)}
        style={[lighttext, styles.textinput]}
      />

      <LargeTouchableButton
        onPressFunc={() => SignInWithEmailAndPassword()}
        dpText="Sign in with Email"
        dpIcon={<ArrowRightIcon />}
        isDisabled={usrEmail == "" || usrPasswrd == "" || renderanimation}
        xtraStyles={{ marginTop: 24, marginBottom: 32 }}
      />

      <Text style={boldtext}>Or Sign in with</Text>

      <View style={styles.authoptions}>
        <TouchableOpacity onPress={onGoogleSignin} style={styles.authoption}>
          <Image
            source={require("../../assets/icons/google.png")}
            style={{ width: 26, height: 26 }}
          />
        </TouchableOpacity>
        {/* 
        <TouchableOpacity
          style={[
            styles.authoption,
            { backgroundColor: colors.primary_bg_dark },
          ]}
        >
          <GitHubIcon color={colors.text_primary_dark} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.authoption, { backgroundColor: colors.fb_bg_light }]}
        >
          <FacebookIcon />
        </TouchableOpacity>
        */}
      </View>

      <View style={styles.termsofservice}>
        <Text style={lighttext}>
          By signing in to NichLabs, you agree to NichLabs’
        </Text>

        <Text style={[lighttext, { color: colors.links_color }]}>
          Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    width: "100%",
    padding: 8,
    paddingVertical: 4,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderColor: colors.divider_bg_light,
  },
  authoptions: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  authoption: {
    width: 48,
    height: 48,
    marginTop: 24,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.content_bg_light,
  },
  termsofservice: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
