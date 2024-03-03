import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { CommunitiesProp } from "./RecommendedCommunities";
import { boldtext, colors, lighttext } from "../../assets/constants";
import { CommunitiesIcon } from "../../assets/icons";
import { SCREENWIDTH } from "../../assets/constants";

export const Communities = ({
  _id,
  title,
  description,
  image,
  members,
  tags,
}: CommunitiesProp): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("community", { communityId: _id })}
    >
      <View style={styles.topSection}>
        <View style={styles.topLeftSection}>
          <Image source={{ uri: image }} style={styles.communityIcon} />

          <View style={styles.numberOfCommunityMembers}>
            <CommunitiesIcon iconWidth={20} iconHeight={14} />

            <Text style={lighttext}>{members?.length}</Text>
          </View>
        </View>

        <View style={styles.topRightSection}>
          <Text style={styles.topRightTitle}>{title}</Text>
          <Text style={styles.topRightText}>{description} </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        {tags.map((tag, index) => (
          <Text key={index} style={{ ...boldtext }}>
            {tag}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREENWIDTH,
    height: 200,
    padding: 20,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: colors.popup_bg_light,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    gap: 19,
  },
  topLeftSection: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  numberOfCommunityMembers: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  topRightSection: {
    display: "flex",
    width: 189,
    gap: 8,
  },
  topRightTitle: {
    ...boldtext,
  },
  topRightText: {
    ...lighttext,
    width: "100%",
  },
  bottomSection: {
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});
