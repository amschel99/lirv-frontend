import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { updateAccProfilePic } from "../../api/authentication";
import { uploadFile, uploadToFirebase } from "../../utils/fileUploader";
import { useAnimation } from "../../context/animationctx";
import { useAuth } from "../../context/authcontext";
import { ImageIcon, RemoveIcon } from "../../assets/icons";
import { boldtext, colors, lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotification } from "../../context/notificationctx";

interface profileProps {
  accProfile: any;
}

export const PersonalProfile = ({ accProfile }: profileProps) => {
  const { showAnimation, hideAnimation } = useAnimation();
  const { localAuthHistory } = useAuth();
  const { profile, setProfile } = useNotification();

  const UploadNewProfilePic = async (): Promise<void> => {
    showAnimation("loading", "Saving your new profile picture...");

    let res = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });

    if (!res.canceled) {
      const { uri } = res.assets[0];
      const fileName = uri.split("/").pop();
      const uploadRes = await uploadToFirebase(uri, fileName);

      console.log(JSON.stringify(uploadRes));
      const { isOk } = await updateAccProfilePic(
        uploadRes?.downloadUrl,
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );

      if (isOk) {
        showAnimation("success", "updated your profile picture");
        setProfile(uploadRes.downloadUrl);

        setTimeout(() => {
          hideAnimation();
        }, 3500);
      }
    }
  };
  useEffect(() => {
    setProfile(accProfile?.profileImage);
  }, []);
  return (
    <View>
      <View style={styles.profilepicctr}>
        <Image
          source={
            profile ? { uri: profile } : require("../../assets/images/icon.png")
          }
          style={styles.profilepic}
        />

        <TouchableOpacity
          onPress={() => UploadNewProfilePic()}
          style={styles.updatepic}
        >
          <ImageIcon />
          <Text style={lighttext}>Upload new picture</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.ctrtitle}>Contact</Text>
      <View style={styles.profilepicctr}>
        <View style={{ gap: 4 }}>
          <Text style={boldtext}>Email</Text>
          <Text style={lighttext}>{accProfile?.email}</Text>
        </View>

        <View style={{ gap: 4 }}>
          <Text style={boldtext}>Phone</Text>
          <Text style={lighttext}>{accProfile?.phone}</Text>
        </View>
      </View>

      <Text style={styles.ctrtitle}>My story</Text>
      <View style={styles.mystory}>
        <Text style={boldtext}>
          {accProfile?.firstname} {accProfile?.lastname}
        </Text>
        <Text style={lighttext}>{accProfile?.title}</Text>

        <Text style={[lighttext, { marginTop: 8, textAlign: "justify" }]}>
          {accProfile?.story}
        </Text>
      </View>

      <Text style={styles.ctrtitle}>My skills</Text>
      <View
        style={[styles.profilepicctr, { justifyContent: "flex-start", gap: 8 }]}
      >
        {accProfile?.proficiencies?.map((skill: string) => (
          <Text key={skill} style={lighttext}>
            {skill}
          </Text>
        ))}
      </View>

      <Text style={styles.ctrtitle}>My career journey</Text>
      {accProfile?.previousJobs?.map((prevjob: any) => (
        <View style={styles.experiencectr} key={prevjob?._id}>
          <View>
            <Text style={boldtext}>
              {prevjob?.position}, {prevjob?.company}
            </Text>
            <Text style={[boldtext, { marginTop: 4 }]}>
              {prevjob?.start},
              {prevjob?.currentlyWorkingHere ? "Present" : prevjob?.end}
            </Text>
          </View>

          <TouchableOpacity style={styles.removeicon}>
            <RemoveIcon />
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.ctrtitle}>My academic background</Text>
      {accProfile?.previousAcademics?.map((prevAcad: any) => (
        <View style={styles.experiencectr} key={prevAcad?._id}>
          <View>
            <Text style={boldtext}>{prevAcad?.institution}</Text>
            <Text style={[boldtext, { marginTop: 4 }]}>
              {prevAcad?.start},
              {prevAcad?.currentlyHere ? "Present" : prevAcad?.end}
            </Text>
          </View>

          <TouchableOpacity style={styles.removeicon}>
            <RemoveIcon />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  profilepicctr: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  profilepic: {
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  updatepic: {
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 6,
    backgroundColor: colors.content_bg_light,
  },
  ctrtitle: { ...boldtext, marginTop: 8, paddingHorizontal: 8 },
  mystory: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  experiencectr: {
    marginTop: 8,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.popup_bg_light,
  },
  removeicon: {
    padding: 4,
  },
  linksctr: {},
  link: {
    marginTop: 8,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.popup_bg_light,
  },
  linkicon: {
    flexDirection: "row",
    gap: 8,
  },
});
