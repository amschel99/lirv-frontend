import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, BackHandler, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { InputArea } from "./InputArea";
import { AppHeader } from "../../components/global/AppHeader";
import { ProfilePicFlatList } from "../../components/global/ProfilePicFlatList";
import { Message } from "../../components/global/Message";
import { CommunityPostSkeleton } from "../../components/global/skeletons/CommunityPostSkeleton";
import { RootStackParamList } from "navigation";
import { useAuth } from "../../context/authcontext";
import { useAnimation } from "../../context/animationctx";
import { useNotification } from "../../context/notificationctx";
import { getCommunity, getPostsInCommunity } from "../../api/communities";
import { SCREENWIDTH, container, colors } from "../../assets/constants";
import { lighttext } from "../../assets/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../../api/user";
import * as DocumentPicker from "expo-document-picker";

export const CommunityScreen = ({ communityId }): JSX.Element => {
  const { getAuthFromJSON, localAuthHistory } = useAuth();
  const { showAnimation, hideAnimation, renderanimation } = useAnimation();
  const { posts, setPosts } = useNotification();
  const [urls, setUrls] = useState([]);
  const [community, setCommunity] = useState<any>(null);
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const flatListRef = React.useRef<FlatList>(null);

  const filterMemberImages = async (members: Array<any>) => {
    const urls = [];
    members.map(async (member) => {
      let user = await getUser(
        JSON.parse(await AsyncStorage.getItem("user")).accessToken,
        member
      );

      setUrls((prev) => [...prev, user?.user?.profileImage]);
    });
    console.log(urls);
  };

  const renderMessages = ({ item, index }: { item: any; index: number }) => (
    <Message
      postContent={item.postContent}
      profileImage={item?.profileImage ?? ""}
      postedBy={item.postedBy}
      createdAt={item.createdAt}
      postImage={item?.postImage}
    />
  );
  const onPressBack = (): boolean => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    console.log(posts);
    BackHandler.addEventListener("hardwareBackPress", onPressBack);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressBack);
    };
  }, []);

  const fetchCommunity = async (): Promise<void> => {
    if (JSON.parse(await AsyncStorage.getItem("user")).accessToken) {
      const { isOk, community } = await getCommunity(
        JSON.parse(await AsyncStorage.getItem("user")).accessToken,
        communityId
      );
      const { isOk: isPostsOk, communityPosts } = await getPostsInCommunity(
        community?._id,
        JSON.parse(await AsyncStorage.getItem("user")).accessToken
      );

      if (isOk && isPostsOk) {
        setCommunity(community);
        setPosts(communityPosts);

        hideAnimation();
      } else {
        hideAnimation();
      }
    } else {
      getAuthFromJSON();
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  return (
    <>
      <View style={styles.topSection}>
        {/** 
        <ProfilePicFlatList
          imageURLs={
            community?.members && filterMemberImages(community?.members) && urls
          }
        />
        */}
      </View>

      {renderanimation ? (
        <>
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
          <CommunityPostSkeleton />
        </>
      ) : posts?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={renderMessages}
          keyExtractor={(_item) => _item?._id}
          contentContainerStyle={styles.messagesFlatList}
          onLayout={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />
      ) : (
        <Text style={{ ...lighttext, textAlign: "center", padding: 7 }}>
          Be the first to post in this community...
        </Text>
      )}
      <View style={styles.bottomSection}>
        <InputArea community={community?._id} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...container,
    flex: 1,
    paddingHorizontal: 0,
  },
  topSection: {
    display: "flex",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider_bg_light,
  },
  messagesFlatList: {
    paddingBottom: 217,
    paddingTop: 12,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    gap: 12,
  },
  bottomSection: {
    width: SCREENWIDTH,
    position: "absolute",
    display: "flex",
    bottom: 0,
    flexDirection: "column",
    backgroundColor: colors.primary_bg_light,
  },
});
