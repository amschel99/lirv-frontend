import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  Auth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA7RbhSAj4pUgOm13tHl5zRBQgl35fV85U",
  authDomain: "nichlabs.firebaseapp.com",
  projectId: "nichlabs",
  storageBucket: "nichlabs.appspot.com",
  messagingSenderId: "614849235982",
  appId: "1:614849235982:web:1e68a9028573f7a2c8005f",
  measurementId: "G-TD1HXZ2J41",
};

export const firebaseapp: FirebaseApp = initializeApp(firebaseConfig);

export const firebaseauth: Auth = initializeAuth(firebaseapp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
