import React from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { Event, EventProps } from "./Event";
import { largetext, boldtext } from "../../assets/constants";

interface eventsProps {
  events: any;
}

export const EventsForYou = ({ events }: eventsProps): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderEvent = ({
    item,
    index,
  }: {
    item: EventProps;
    index: number;
  }) => (
    <Event
      key={index}
      _id={item._id}
      date={item.date}
      description={item.description}
      photo={item.photo}
    />
  );

  return (
    <View style={{ borderRadius: 8 }}>
      <View style={styles.titleContainer}>
        <Text style={{ ...largetext, paddingBottom: 10 }}>Events for you</Text>

        <TouchableOpacity onPress={() => navigation.navigate("eventsscreen")}>
          <Text style={{ ...boldtext, paddingBottom: 10 }}>SEE ALL</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ borderRadius: 8 }}
        data={events}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderEvent}
        contentContainerStyle={styles.eventFlatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eventFlatList: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    gap: 16,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
