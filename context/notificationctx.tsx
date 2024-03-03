import React, {
  JSX,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { socket } from "../api/config";
import messaging from "@react-native-firebase/messaging";

type notificationctxtype = {
  setPosts: Dispatch<SetStateAction<any[]>>;
  posts: any[];
  setEvents: Dispatch<SetStateAction<any[]>>;
  events: any[];
  profile: string;
  setProfile: Dispatch<SetStateAction<string>>;
  postImage: string;
  setPostImage: Dispatch<SetStateAction<string>>;
};

const notificationcontext = createContext<notificationctxtype>(
  {} as notificationctxtype
);

interface notificationProviderprops {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: notificationProviderprops): JSX.Element => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const [events, setEvents] = useState<Array<any>>([]);
  const [profile, setProfile] = useState<string>("");
  const [postImage, setPostImage] = useState<string>("");

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
    messaging().onMessage(async (remoteMessage) => {});
    {
      /* */
    }
    socket.on("newPost", ({ post }) => {
      // Check if there is any post with the same _id as the new post
      const isExistingPost = posts.some(
        (existingPost) => existingPost._id === post._id
      );

      // If there isn't any post with the same _id, update the state
      if (!isExistingPost) {
        setPosts((prevPosts: any) => [...prevPosts, post]);
      }
    });

    socket.on("newEvent", ({ event }) => {
      setEvents((prevEvents: any) => [...prevEvents, event]);
    });
  }, []);

  return (
    <notificationcontext.Provider
      value={{
        setPosts,
        posts,
        setEvents,
        events,
        profile,
        setProfile,
        postImage,
        setPostImage,
      }}
    >
      {children}
    </notificationcontext.Provider>
  );
};

export const useNotification = (): notificationctxtype =>
  useContext<notificationctxtype>(notificationcontext);
