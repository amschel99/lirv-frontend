import React, {
  JSX,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseauth } from "../firebase/config";
import {
  storagetypes,
  FILENAME,
  getFileInfo,
  readFile,
  writeFile,
} from "../utils/storage";

type authctxtype = {
  authenticated: boolean;
  userUid: string;
  idToken: string;
  userEmail: string;
  accountIsChecked: boolean;
  updateToGoHome: () => void;
  showsOnboardingScreens: boolean;
  updateToShowOnboardings: () => void;
  getAuthFromJSON: () => Promise<void>;
  updateAuthJSON: ({
    firstTimeUse,
    currAccessToken,
    currRefreshToken,
  }: storagetypes) => Promise<void>;
  localAuthHistory: storagetypes;
};

const authcontext = createContext<authctxtype>({} as authctxtype);

interface authproviderprops {
  children: ReactNode;
}

export const AuthProvider = ({ children }: authproviderprops): JSX.Element => {
  const [authenticated, setauthenticated] = useState<boolean>(false);
  const [userUid, setUserUid] = useState<string>("");
  const [idToken, setidToken] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [accountIsChecked, setaccountIsChecked] = useState<boolean>(false);
  const [showsOnboardingScreens, setshowsOnboardingScreens] =
    useState<boolean>(false);
  const [localAuthHistory, setlocalAuthHistory] = useState<storagetypes>(
    {} as storagetypes
  );

  const getAuthFromJSON = async (): Promise<void> => {
    try {
      const fileInfo = await getFileInfo(FILENAME);

      if (!fileInfo.exists) {
        await writeFile(FILENAME, {} as storagetypes);
      }

      const data: storagetypes = await readFile();

      setlocalAuthHistory(data);
    } catch (e) {}
  };

  const updateAuthJSON = async ({
    firstTimeUse,
    currAccessToken,
    currRefreshToken,
  }: storagetypes): Promise<void> => {
    try {
      await writeFile(FILENAME, {
        firstTimeUse,
        currAccessToken,
        currRefreshToken,
      });
    } catch (e) {}
  };

  const updateToShowOnboardings = (): void => {
    setshowsOnboardingScreens(true);
  };

  const updateToGoHome = (): void => {
    setauthenticated(true);
    setaccountIsChecked(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseauth, async (user) => {
      if (user) {
        const token: string = await user?.getIdToken(true);

        setUserUid(user.uid);
        setidToken(token);
        setUserEmail(user.email);
        setauthenticated(true);
      } else {
        setauthenticated(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <authcontext.Provider
      value={{
        authenticated,
        userUid,
        idToken,
        userEmail,
        accountIsChecked,
        updateToGoHome,
        showsOnboardingScreens,
        updateToShowOnboardings,
        getAuthFromJSON,
        updateAuthJSON,
        localAuthHistory,
      }}
    >
      {children}
    </authcontext.Provider>
  );
};

export const useAuth = (): authctxtype => useContext<authctxtype>(authcontext);
