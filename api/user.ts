import { USER_BASE_URL, userurls } from "./config";

export const getUser = async (
  accessToken: string,
  userId: string
): Promise<{ isOk: boolean; user: any }> => {
  const URL: string = userurls.getUser;

  const res: Response = await fetch(URL + `/${userId}`, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const user: Promise<any> = await res.json();

  return { isOk: res.ok, user };
};

export const getLoggedInUser = async (
  accessToken: string
): Promise<{ isOk: boolean; user: any }> => {
  const URL: string = `${USER_BASE_URL}/loggedInUser`;

  const res: Response = await fetch(URL, {
    method: "GET",

    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const user: Promise<any> = await res.json();

  return { isOk: res.ok, user };
};
