import "expo-dev-client";
import React, { JSX, useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as ExpoSplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createUserAccount, userLogin } from "./api/authentication";
import { AuthProvider, useAuth } from "./context/authcontext";
import { FabProvider } from "./context/fabcontext";
import { AnimationProvider, useAnimation } from "./context/animationctx";
import { NotificationProvider } from "./context/notificationctx";
import { Navigation } from "./navigation";
import { Animations } from "./components/global/Animations";

import AsyncStorage from "@react-native-async-storage/async-storage";

function App(): JSX.Element {
  const {
    authenticated,
    idToken,
    updateAuthJSON,
    userEmail,
    userUid,
    showsOnboardingScreens,
    accountIsChecked,
  } = useAuth();
  const {
    showAnimation,
    hideAnimation,
    renderanimation,
    typeofanimation,
    animationmessage,
  } = useAnimation();

  const attemptBgUserLogin = async (): Promise<void> => {
    if (authenticated && idToken) {
      showAnimation("loading", "...");

      const { status } = await createUserAccount(userEmail, userUid);

      if (status == 409) {
        const { isOk, account } = await userLogin(userEmail, userUid);

        if (isOk && (await account).accessToken) {
          const accessToken: string = (await account).accessToken;
          const refreshToken: string = (await account).refreshToken;
          await AsyncStorage.setItem("user", JSON.stringify(await account));
          await updateAuthJSON({
            currAccessToken: accessToken,
            currRefreshToken: refreshToken,
          });

          hideAnimation();
        }
      } else {
        const { isOk, account } = await userLogin(userEmail, userUid);

        if (isOk && (await account).accessToken) {
          const accessToken: string = (await account).accessToken;
          const refreshToken: string = (await account).refreshToken;
          await AsyncStorage.setItem("user", JSON.stringify(await account));

          await updateAuthJSON({
            currAccessToken: accessToken,
            currRefreshToken: refreshToken,
          });

          hideAnimation();
        }
      }
    }
  };

  useEffect(() => {
    attemptBgUserLogin();
  }, [authenticated, accountIsChecked, idToken]);

  const [fontsLoaded] = useFonts({
    "ops-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "ops-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  const onLayoutRootView: () => Promise<void> = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Navigation
          showsOnboardingScreens={
            authenticated && idToken && showsOnboardingScreens
          }
          isAuthenticated={authenticated && idToken && accountIsChecked}
        />
      </NavigationContainer>

      {renderanimation && (
        <Animations
          animationType={typeofanimation}
          animationmessage={animationmessage}
        />
      )}
      <StatusBar style="dark" animated={true} backgroundColor="transparent" />
    </SafeAreaProvider>
  );
}

export default function AppProvider(): JSX.Element {
  return (
    <AuthProvider>
      <AnimationProvider>
        <FabProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </FabProvider>
      </AnimationProvider>
    </AuthProvider>
  );
}
