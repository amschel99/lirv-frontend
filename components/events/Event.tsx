import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ShareIcon } from "../../assets/icons";
import { SCREENWIDTH, boldtext, colors } from "../../assets/constants";
import { RootStackParamList } from "../../navigation";

export interface EventProps {
  id: string;
  date: string;
  imageURL: string;
  description: string;
}
export const Event = ({
  id,
  date,
  description,
  imageURL,
}: EventProps): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onGoToEventDetails = (): void =>
    navigation.navigate("eventdetails", { eventId: id });
  return (
    <TouchableOpacity onPress={onGoToEventDetails} style={styles.container}>
      <Image source={{ uri: imageURL }} style={styles.eventImage} />

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
    width: SCREENWIDTH,
    height: 76,
    marginBottom: 8,
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  eventImage: {
    width: 52,
    height: 52,
    borderRadius: 500,
  },
  rightSide: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rightSideTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
