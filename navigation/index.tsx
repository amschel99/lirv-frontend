import React, { JSX } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/Onboarding";
import AccountSelectionScreen from "../screens/accounts/AccountSelection";
import PersonalAccountDetailsScreen from "../screens/accounts/PersonalAccountDetails";
import PersonalAccountEducationScreen from "../screens/accounts/PersonalAccountEducation";
import BusinessAccountDetailsScreen from "../screens/accounts/BusinessAccountDetails";
import AddLinksScreen from "../screens/accounts/AddLinks";
import AccountVerificationScreen from "../screens/accounts/AccountVerification";
import LoginScreen from "../screens/accounts/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PersonalAccountExperienceScreen from "../screens/accounts/PersonalAccountExperience";
import PersonalAccountSkillsScreen from "../screens/accounts/PersonalAccountSkills";
import { CommunitiesScreen } from "../screens/CommunitiesScreen";
import { JobsScreen } from "../screens/JobsScreen";
import { CommunityScreen } from "../components/communities/CommunityScreen";
import CreateEventScreen from "../screens/fab/CreateEventScreen";
import CreateCommunityScreen from "../screens/fab/CreateComunityScreen";
import EventsScreen from "../screens/EventsScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  onboarding: undefined;
  accountselection: undefined;
  personaleducationdetails: undefined;
  personalaccdetails: undefined;
  businessaccdetails: undefined;
  addaccountlinks: { accType: number | null };
  accountverification: undefined;
  loginscreen: undefined;
  homescreen: undefined;
  personalaccexperience: undefined;
  personalaccskills: undefined;
  communitiesScreen: undefined;
  community: { communityId: string | null };
  conversationsScreen: undefined;
  jobsScreen: undefined;
  createevent: undefined;
  createcommunity: undefined;
  eventsscreen: undefined;
  eventdetails: { eventId: string | undefined };
  profilescreen: undefined;
};

interface navigationprops {
  isAuthenticated: boolean;
  showsOnboardingScreens: boolean;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Home = () => {
  return (
    <>
      <Stack.Screen name="homescreen" component={HomeScreen} />
      <Stack.Screen name="communitiesScreen" component={CommunitiesScreen} />
      <Stack.Screen
        name="community"
        component={CommunityScreen}
        initialParams={{ communityId: null }}
      />
      <Stack.Screen name="jobsScreen" component={JobsScreen} />
      <Stack.Screen name="createevent" component={CreateEventScreen} />
      <Stack.Screen name="createcommunity" component={CreateCommunityScreen} />
      <Stack.Screen name="eventsscreen" component={EventsScreen} />
      <Stack.Screen
        name="eventdetails"
        component={EventDetailScreen}
        initialParams={{ eventId: null }}
      />
      <Stack.Screen name="profilescreen" component={ProfileScreen} />
    </>
  );
};

export const Navigation = ({
  isAuthenticated,
  showsOnboardingScreens,
}: navigationprops): JSX.Element => {
  const [token, setToken] = React.useState<string | null>(null);

  const [tokenFetched, setTokenFetched] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchToken = async () => {
      setToken(JSON.parse(await AsyncStorage.getItem("user")).accessToken);
      setTokenFetched(true);
    };
    fetchToken();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
        animationTypeForReplace: "pop",
      }}
    >
      {showsOnboardingScreens ? (
        <>
          <Stack.Screen
            name="accountselection"
            component={AccountSelectionScreen}
          />
          <Stack.Screen
            name="personaleducationdetails"
            component={PersonalAccountEducationScreen}
          />
          <Stack.Screen
            name="personalaccdetails"
            component={PersonalAccountDetailsScreen}
          />
          <Stack.Screen
            name="businessaccdetails"
            component={BusinessAccountDetailsScreen}
          />
          <Stack.Screen
            name="addaccountlinks"
            component={AddLinksScreen}
            initialParams={{ accType: null }}
          />
          <Stack.Screen
            name="accountverification"
            component={AccountVerificationScreen}
          />
          <Stack.Screen
            name="personalaccexperience"
            component={PersonalAccountExperienceScreen}
          />
          <Stack.Screen
            name="personalaccskills"
            component={PersonalAccountSkillsScreen}
          />
          <Stack.Screen name="homescreen" component={HomeScreen} />
          <Stack.Screen
            name="communitiesScreen"
            component={CommunitiesScreen}
          />

          <Stack.Screen
            name="community"
            component={CommunityScreen}
            initialParams={{ communityId: null }}
          />
          <Stack.Screen name="jobsScreen" component={JobsScreen} />
          <Stack.Screen name="createevent" component={CreateEventScreen} />
          <Stack.Screen
            name="createcommunity"
            component={CreateCommunityScreen}
          />
          <Stack.Screen name="eventsscreen" component={EventsScreen} />
          <Stack.Screen
            name="eventdetails"
            component={EventDetailScreen}
            initialParams={{ eventId: null }}
          />
          <Stack.Screen name="profilescreen" component={ProfileScreen} />
        </>
      ) : token ? (
        <>
          <Stack.Screen name="homescreen" component={HomeScreen} />
          <Stack.Screen
            name="communitiesScreen"
            component={CommunitiesScreen}
          />
          <Stack.Screen
            name="community"
            component={CommunityScreen}
            initialParams={{ communityId: null }}
          />
          <Stack.Screen name="jobsScreen" component={JobsScreen} />
          <Stack.Screen name="createevent" component={CreateEventScreen} />
          <Stack.Screen
            name="createcommunity"
            component={CreateCommunityScreen}
          />
          <Stack.Screen name="eventsscreen" component={EventsScreen} />
          <Stack.Screen
            name="eventdetails"
            component={EventDetailScreen}
            initialParams={{ eventId: null }}
          />
          <Stack.Screen name="profilescreen" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="onboarding" component={OnboardingScreen} />
          <Stack.Screen name="loginscreen" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
