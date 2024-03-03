import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getDateTimediff } from "../../utils/dates";
import { RootStackParamList } from "../../navigation";
import { lighttext } from "../../assets/constants";

const windowWidth = Dimensions.get("window").width;

interface CommunityPreviewProps {
  communityId: string;
  communityImage: string;
  communityTitle: string;
  communityDescription: string;
  createdAt: string;
}

export const CommunityPreview = ({
  communityId,
  communityImage,
  communityTitle,
  communityDescription,
  createdAt,
}: CommunityPreviewProps): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.previewContainer}
      onPress={() => {
        navigation.navigate("homescreen");
      }}
    >
      <View style={styles.leftSection}>
        <Image source={{ uri: communityImage }} style={styles.profileImage} />
      </View>

      <View style={styles.rightSection}>
        <View style={styles.topRightSection}>
          <Text style={lighttext}>{communityTitle}</Text>
          <Text style={lighttext}>
            {createdAt && getDateTimediff(createdAt)}
          </Text>
        </View>

        <Text style={[lighttext, { marginTop: 6, fontSize: 12 }]}>
          {communityDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 0.5,
  },
  leftSection: {
    justifyContent: "center",
    marginRight: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rightSection: {
    flex: 1,
    justifyContent: "center",
  },
  topRightSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
});
