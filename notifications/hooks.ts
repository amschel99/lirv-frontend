import messaging from "@react-native-firebase/messaging";
let token: string;
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    token = (await messaging().getToken()).toString();
  } else {
    console.log("REQUEST PERMISSION DENIED");
  }
};
export const getNewFCMToken = async () => {
  try {
    await requestUserPermission();
    console.log("Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting new FCM token:", error);
  }
};
