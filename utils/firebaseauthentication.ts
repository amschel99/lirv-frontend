import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseauth } from "../firebase/config";

WebBrowser.maybeCompleteAuthSession();

export const useEmailAndPasswordAuth = (email: string, password: string) => {
  createUserWithEmailAndPassword(firebaseauth, email, password)
    .then(async () => {
      await signInWithEmailAndPassword(firebaseauth, email, password);
    })
    .catch(() => {
      alert("Email and password sign in error, please try again");
    });
};

export const useEmailAndPwdSignIn = (email: string, password: string) => {
  signInWithEmailAndPassword(firebaseauth, email, password)
    .then(() => {})
    .catch(() => {
      alert("Email and password sign in error, please try again");
    });
};

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "614849235982-g3ltavllh1nsiirdfij5bta1mjdn6jan.apps.googleusercontent.com",
    androidClientId:
      "614849235982-g3ltavllh1nsiirdfij5bta1mjdn6jan.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response?.params;

      if (!id_token) {
        alert("Google sign in error, please try again");
      }

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(firebaseauth, credential);
    }
  }, [response]);

  return { request, response, signInWithGoogle: promptAsync };
};
