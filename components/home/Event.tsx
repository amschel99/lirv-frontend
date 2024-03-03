import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { SCREENWIDTH, boldtext, colors } from "../../assets/constants";
import { ShareIcon } from "../../assets/icons";

export interface EventProps {
  _id: string;
  date: string;
  photo: string;
  description: string;
}

export const Event = ({
  _id,
  date,
  description,
  photo,
}: EventProps): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("eventdetails", { eventId: _id })}
      style={styles.container}
    >
      <Image source={{ uri: photo }} style={styles.eventImage} />

      <View style={styles.rightSide}>
        <View style={styles.rightSideTop}>
          <Text style={{ ...boldtext }}>{date}</Text>

          <TouchableOpacity>
            <ShareIcon color={colors.text_primary_light} />
          </TouchableOpacity>
        </View>

        <Text style={{ ...boldtext }}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREENWIDTH - 16,
    height: 76,
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.popup_bg_light,
    gap: 8,
  },
  eventImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  rightSide: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rightSideTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
