import React from "react";
import { StyleSheet, FlatList, Image, ImageSourcePropType } from "react-native";

export interface ProfilePicFlatListProps {
  imageURLs: string[] | ImageSourcePropType[] | any;
}

export const ProfilePicFlatList = ({
  imageURLs,
}: ProfilePicFlatListProps): JSX.Element => {
  const renderProfilePic = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <Image
      source={item ? { uri: item } : require("../../assets/images/icon.png")}
      style={styles.profilePic}
    />
  );

  return (
    <FlatList
      data={imageURLs}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={renderProfilePic}
    />
  );
};

const styles = StyleSheet.create({
  profilePic: {
    width: 54,
    height: 54,
    marginRight: 4,
    borderRadius: 500,
  },
});
