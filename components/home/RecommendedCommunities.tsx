import React from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { Communities } from "./Community";
import { largetext, boldtext } from "../../assets/constants";

export interface CommunitiesProp {
  _id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  members: string[];
  createdAt: string;
  numberofmemebrs?: number;
}

export interface RecommendedCommunities {
  communities: [];
}
export const RecommendedCommunities = ({
  communities,
}: RecommendedCommunities): JSX.Element => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderCommunity = ({
    item,
    index,
  }: {
    item: CommunitiesProp;
    index: number;
  }) => (
    <Communities
      key={item._id}
      _id={item._id}
      description={item.description}
      title={item.title}
      numberofmemebrs={item.members.length}
      image={item.image}
      tags={item.tags}
      members={item.members}
      createdAt={item.createdAt}
    />
  );

  return (
    <View style={{ borderRadius: 8 }}>
      <View style={styles.titleContainer}>
        <Text style={{ ...largetext, paddingBottom: 10 }}>My Communities</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("communitiesScreen")}
        >
          <Text style={{ ...boldtext, paddingBottom: 10 }}>SEE ALL</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ borderRadius: 8 }}
        data={communities}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderCommunity}
        contentContainerStyle={styles.communityFlatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  communityFlatList: {
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
