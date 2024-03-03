import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DownloadIcon, ShareIcon } from "../../assets/icons";
import { getDateTimediff } from "../../utils/dates";
import { useAuth } from "../../context/authcontext";
import { getUser } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../assets/constants";

export interface MessageProps {
  postContent: string;
  postImage: string;
  profileImage: string;
  postedBy: string;
  createdAt: string;
}

export const Message = ({
  postContent,
  postImage,
  postedBy,
  createdAt,
}: MessageProps): JSX.Element => {
  const { getAuthFromJSON } = useAuth();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const userJson = await AsyncStorage.getItem("user");
        const { accessToken } = JSON.parse(userJson || "{}");

        if (accessToken) {
          const { user: fetchedUser, isOk: userOK } = await getUser(
            accessToken,
            postedBy
          );

          if (userOK) {
            setUser(fetchedUser);
          }
        } else {
          getAuthFromJSON();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            user?.profileImage
              ? { uri: user.profileImage }
              : require("../../assets/images/icon.png")
          }
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user?.firstname}</Text>
          <Text style={styles.time}>
            {createdAt && getDateTimediff(createdAt)}
          </Text>
        </View>
      </View>
      <Text style={styles.content}>{postContent}</Text>
      {postImage && (
        <>
          <Image source={{ uri: postImage }} style={styles.image} />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action}>
              <ShareIcon color={colors.text_primary_light} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <DownloadIcon color={colors.text_primary_light} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.popup_bg_light,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    fontSize: 14,
    color: "#777", // Adjust color as per your design
  },
  content: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  action: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_bg_light,
    borderRadius: 10,
    marginLeft: 10,
  },
});
