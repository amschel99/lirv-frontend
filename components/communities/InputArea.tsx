import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Image,
} from "react-native";
import { colors, boldtext } from "../../assets/constants";
import {
  CallIcon,
  CancelIcon,
  PlusIcon,
  SendMessageIcon,
  UploadFileIcon,
  UploadImageIcon,
  UploadVideoIcon,
  VideoIcon,
} from "../../assets/icons";
import { useAuth } from "../../context/authcontext";
import { userPostInCommunity } from "../../api/communities";
import { sendNotification } from "../../api/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uploadToFirebase } from "../../utils/fileUploader";
import { updateAccProfilePic } from "../../api/authentication";
import { useAnimation } from "../../context/animationctx";
import * as DocumentPicker from "expo-document-picker";
import { useNotification } from "../../context/notificationctx";

export const InputArea = ({ community }): JSX.Element => {
  const { postImage: postimage, setPostImage } = useNotification();

  const [showExtraOptions, setShowExtraOptions] = useState(false);
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const [postContent, setPostContent] = useState<string>("");
  const { showAnimation, hideAnimation } = useAnimation();
  const handleShowExtraOptions = () => {
    setShowExtraOptions(!showExtraOptions);
  };
  const onPressBack = (): boolean => {
    setShowExtraOptions(false);
    return true;
  };

  const handlePost = async (): Promise<void> => {
    setPostContent("");

    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      const { isOk } = await userPostInCommunity(
        postContent,

        JSON.parse(await AsyncStorage.getItem("user")).accessToken,
        community,
        postimage
      );

      if (isOk) {
        sendNotification(
          JSON.parse(await AsyncStorage.getItem("user")).accessToken
        );
        console.log("postimage is" + postimage);
        setPostImage("");
      }
    } else {
      getAuthFromJSON();
    }
  };

  const UploadImage = async (): Promise<void> => {
    showAnimation("loading", "processing the image");

    let res = await DocumentPicker.getDocumentAsync({
      type: "image/*",
      multiple: false,
    });

    if (!res.canceled) {
      const { uri } = res.assets[0];
      const fileName = uri.split("/").pop();
      const uploadRes = await uploadToFirebase(uri, fileName);

      showAnimation("success", "processed the image");
      console.log(uploadRes.downloadUrl);
      setPostImage(uploadRes.downloadUrl);

      setTimeout(() => {
        hideAnimation();
      }, 1000);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);
  useEffect(() => {
    console.log("postimage updated:", postimage);
  }, [postimage]);

  return (
    <View
      style={[styles.container, showExtraOptions && styles.largerContainer]}
    >
      <View style={styles.normalOptions}>
        <TextInput
          placeholder="Share your insights, ask a question, start a discussion..."
          value={postContent}
          onChangeText={(text) => {
            setPostContent(text);
          }}
        />
        {postimage && (
          <Image source={{ uri: postimage }} style={styles.selectedImage} />
        )}

        <View style={styles.buttonArea}>
          <View style={styles.rightSide}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={handleShowExtraOptions}
            >
              {showExtraOptions ? <CancelIcon /> : <PlusIcon />}
            </TouchableOpacity>

            {/** */}
            <View style={styles.callArea}>
              <TouchableOpacity style={styles.callbutton}>
                <CallIcon />
                <Text style={{ ...boldtext }}>Audio</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.callbutton}>
                <Text style={{ ...boldtext }}>Video</Text>
                <VideoIcon />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handlePost}>
            <SendMessageIcon />
          </TouchableOpacity>
        </View>
      </View>
      {showExtraOptions && (
        <View style={styles.extraOptionsContainer}>
          {/* 
          <TouchableOpacity style={styles.extraOptionsIcons}>
            <UploadFileIcon />
            
          </TouchableOpacity>
          */}
          <TouchableOpacity
            style={styles.extraOptionsIcons}
            onPress={UploadImage}
          >
            <UploadImageIcon />
          </TouchableOpacity>

          {/* 
          <TouchableOpacity style={styles.extraOptionsIcons}>
            <UploadVideoIcon />
           
          </TouchableOpacity>
           */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 127,
    display: "flex",
    padding: 10,
    borderTopColor: colors.divider_bg_light,
    borderTopWidth: 0.5,
    marginBottom: 20,
  },
  largerContainer: {
    height: 230,
  },
  normalOptions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 127,
  },
  buttonArea: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    gap: 10,
  },
  rightSide: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  plusButton: {
    width: 44,
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 88,
    backgroundColor: colors.navy_blue,
  },
  callArea: {
    width: 195,
    height: 41,
    paddingHorizontal: 13.5,
    backgroundColor: colors.popup_bg_light,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: colors.divider_bg_light,
    borderRadius: 88,
  },
  callbutton: {
    display: "flex",
    flexDirection: "row",
    gap: 8.18,
  },
  sendButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  extraOptionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 48,
  },
  extraOptionsIcons: {
    width: 60,
    height: 60,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.popup_bg_light,
  },
  selectedImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
});
