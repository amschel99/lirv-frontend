import React, { JSX, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import {
  useEmailAndPasswordAuth,
  useGoogleAuth,
} from "../../utils/firebaseauthentication";
import { RootStackParamList } from "../../navigation";
import { LargeTouchableButton } from "../../components/global/Buttons";
import { ArrowRightIcon, GitHubIcon, FacebookIcon } from "../../assets/icons";
import { boldtext, colors, lighttext } from "../../assets/constants";

export const AuthenticationModal = (): JSX.Element => {
  const { signInWithGoogle } = useGoogleAuth();
  const { updateToShowOnboardings } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();

  const [usrEmail, setUsrEmail] = useState<string>("");
  const [usrPasswrd, setUsrPasswrd] = useState<string>("");

  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const CreateAccWithEmailAndPassword = async (): Promise<void> => {
    showAnimation("loading", "Creating your account, please wait...");

    useEmailAndPasswordAuth(usrEmail, usrPasswrd);

    setTimeout(() => {
      hideAnimation();
      updateToShowOnboardings();
    }, 3500);
  };

  const onGoogleSignin = () => {
    showAnimation("loading", "Signin you in with Google");

    signInWithGoogle()
      .then(() => {
        showAnimation("success", "You successfully singed in with Google");

        setTimeout(() => {
          hideAnimation();
        }, 3500);
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

  const onGoToSignIn = (): void => navigation.navigate("loginscreen");

  return (
    <View style={styles.authcontainer}>
      <View style={styles.container}>
        <Text style={boldtext}>Setup your account with Email and Password</Text>

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
          onPressFunc={() => CreateAccWithEmailAndPassword()}
          dpText="Continue with Account Setup"
          dpIcon={<ArrowRightIcon />}
          isDisabled={usrEmail == "" || usrPasswrd == "" || renderanimation}
          xtraStyles={{ marginVertical: 24 }}
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

        <TouchableOpacity
          onPress={onGoToSignIn}
          style={{ width: "100%", marginBottom: 18 }}
        >
          <Text
            style={[boldtext, { textAlign: "left", color: colors.links_color }]}
          >
            Already have an account, Sign in ?
          </Text>
        </TouchableOpacity>

        <View style={styles.termsofservice}>
          <Text style={lighttext}>
            By signing in to NichLabs, you agree to NichLabs’
          </Text>
          <Text style={[lighttext, { color: colors.links_color }]}>
            Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authcontainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary_bg_light_faint,
  },
  container: {
    width: "100%",
    padding: 8,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: colors.divider_bg_light,
    backgroundColor: colors.primary_bg_light,
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
