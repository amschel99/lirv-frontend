import React, { JSX, useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthenticationModal } from "../components/authentication/AuthenticationModal";
import { CarouselIndicators } from "../components/onboarding/CarouselIndicators";
import { LargeTouchableButton } from "../components/global/Buttons";
import { ArrowRightIcon } from "../assets/icons";
import { boldtext, colors, container, lighttext } from "../assets/constants";

const appicon: any = require("../assets/images/icon.png");

export default function OnboardingScreen(): JSX.Element {
  const [currIdx, setcurrIdx] = useState<number>(0);
  const [showAuthModal, setshowAuthModal] = useState<boolean>(false);

  const carouseldata: {
    idx: number;
    title: string;
    text: string;
    bgimage: any;
  }[] = [
    {
      idx: 0,
      title: "Welcome to NichLabs",
      text: "A networking and collaboration platform designed for the rapidly growing professional community in Africa.",
      bgimage: `https://ibb.co/wS5tynw`
    },
    {
      idx: 1,
      title: "Network",
      text: "Open doors to valuable opportunities, connect with like-minded peers, mentors, potential clients and/or partners.",
      bgimage: `https://ibb.co/m5zYHbt`
    },
    {
      idx: 2,
      title: "Collaborate",
      text: "Harnesses collective knowledge and resources, innovate, problem-solve, and achieve goals more effectively.",
      bgimage:`https://ibb.co/Jr6hhcy`
    },
    {
      idx: 3,
      title: "Learn",
      text: "Expand your knowledge base, skills, and become more competitive in a rapidly changing world.",
      bgimage:`https://ibb.co/rpYsfcm`
    },
    {
      idx: 4,
      title: "Hire & Get hired",
      text: `We prioritize trust and accuracy in the hiring process. We verify the skills and backgrounds of our users, ensuring that employers connect with qualified candidates and job seekers find the right opportunities.`,
      bgimage: `https://ibb.co/rpYsfcm`
    },
  ];

  const onGoToNext = (): void => {
    if (currIdx == carouseldata.length - 1) {
      setshowAuthModal(true);
    } else {
      setcurrIdx((prevIdx) => prevIdx + 1);
    }
  };

  const onPressBack = (): boolean => {
    setshowAuthModal(false);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);


  {/*

https://ibb.co/Jr6hhcy
https://ibb.co/wS5tynw
https://ibb.co/m5zYHbt
https://ibb.co/rpYsfcm
https://ibb.co/SNk6V3m
*/}
  return (
    <SafeAreaView style={[container, styles.container]}>
      <ImageBackground
        source={{uri:carouseldata[currIdx]?.bgimage}}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, styles.carouselcontainer]}
      >
        <Image source={appicon} style={styles.appicon} />

        <View style={styles.textcontainer}>
          <View>
            <CarouselIndicators currIdx={currIdx} />

            <Text style={[boldtext, styles.textcenter, styles.carouseltitle]}>
              {carouseldata[currIdx]?.title}
            </Text>

            <Text
              style={[lighttext, styles.textcenter, styles.carouselcontent]}
            >
              {carouseldata[currIdx]?.text}
            </Text>
          </View>

          <LargeTouchableButton
            onPressFunc={onGoToNext}
            dpText={
              currIdx == 0
                ? "Get started"
                : currIdx < carouseldata.length - 1
                ? "Continue"
                : "Setup my Account"
            }
            dpIcon={<ArrowRightIcon />}
          />
        </View>
      </ImageBackground>

      {showAuthModal && <AuthenticationModal />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  carouselcontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  appicon: {
    width: 120,
    height: 120,
    marginBottom: 250,
    borderRadius: 8,
    opacity: 0.75,
  },
  textcontainer: {
    width: "100%",
    height: "52%",
    padding: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    justifyContent: "space-between",
    backgroundColor: colors.primary_bg_light_faint,
  },
  textcenter: {
    textAlign: "center",
  },
  carouseltitle: {
    marginTop: 48,
    marginBottom: 8,
    fontSize: 18,
  },
  carouselcontent: {
    fontSize: 16,
  },
});
