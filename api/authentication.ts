import { authurls } from "./config";

export const createUserAccount = async (
  usremail: string,
  usrpassword: string
): Promise<{
  status: number;
}> => {
  const URL = authurls.signup;

  const res: Response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ email: usremail, password: usrpassword }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return { status: res.status };
};

export const userLogin = async (
  usremail: string,
  usrpassword: string
): Promise<{
  isOk: boolean;
  account: Promise<{
    _id: string;
    accessToken: string;
    accountType: string;
    email: string;
    refreshToken: string;
  }>;
}> => {
  const URL = authurls.login;

  const res: Response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ email: usremail, password: usrpassword }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const usraccount: Promise<{
    _id: string;
    accessToken: string;
    accountType: string;
    email: string;
    refreshToken: string;
  }> = await res.json();

  return { isOk: res.ok, account: usraccount };
};

export const usrRefreshToken = async (
  tokenForRefresh: string
): Promise<{
  isOk: boolean;
  tokens: Promise<any>;
}> => {
  const URL = authurls.refresh;

  const res: Response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ refresh: tokenForRefresh }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const usrtokens: Promise<any> = res.json();
  return { isOk: res.ok, tokens: usrtokens };
};

export const requestPhoneVerificationCode = async (
  phoneNumber: string,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.sendVerification;

  const res: Response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ phone: phoneNumber }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const verifyPhoneNumber = async (
  phoneNumber: string,
  veriicationCode: string,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.verify;

  const res: Response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ phone: phoneNumber, code: veriicationCode }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

/*update personal account*/
export const updateAccType = async (
  accType: number,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({ accountType: accType }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const updateAccTitle = async (
  userTitle: string,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({ title: userTitle }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const updatePersonalAccDetails = async (
  firstName: string,
  lastName: string,
  usrStory: string,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      story: usrStory,
    }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const updatePersonalAccEducation = async (
  level: string,
  title: string,
  start: string,
  end: string,
  currentlyHere: boolean,
  institution: string,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;

  const previousAcademics = {
    level,
    title,
    start,
    end,
    currentlyHere,
    institution,
  };

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({ previousAcademics }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const updatePersonalSkills = async (
  proficiencies: string[],
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({
      proficiencies,
    }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const updatePersonalExperience = async (
  type: string,
  position: string,
  company: string,
  start: string,
  end: string,
  currentlyWorkingHere: boolean,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;

  const previousJobs = {
    type,
    position,
    company,
    start,
    end,
    currentlyWorkingHere,
  };

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({ previousJobs }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const addAccountLinks = async (
  github: string,
  web: string,
  linkedin: string,
  twitter: string,
  authToken: string,
  pushToken?: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;
  const links = {
    github,
    web,
    linkedin,
    twitter,
  };

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({ links, pushToken }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const updateAccProfilePic = async (
  profileImage: string,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({ profileImage }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const addDevicePushToken = async (
  pushToken: string,
  authToken: string
): Promise<{ isOk: boolean }> => {
  const URL = authurls.update;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({ pushToken }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

/*business details*/
export const updateBusinessDetails = async (
  businessName: string,
  industry: string,
  aboutBusiness: string,
  bnsLocation: string,
  businessSize: string,
  authToken: string
) => {
  const URL = authurls.update;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    body: JSON.stringify({
      businessSize: businessSize,
      businessLocation: bnsLocation,
      industry: industry,
      businessDescription: aboutBusiness,
      businessName: businessName,
    }),
    headers: {
      authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};
