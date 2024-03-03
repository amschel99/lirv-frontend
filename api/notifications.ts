import { BASE_URL } from "./config";

export const sendNotification = async (
  accessToken: string
): Promise<{ isOk: boolean }> => {
  const URL = BASE_URL + `/api/notifications/newPost`;

  const res: Response = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};
