import { USER_BASE_URL, userurls } from "./config";

export const createEvent = async (
  photo: string,
  date: string,
  title: string,
  description: string,
  type: string,
  accessToken: string,
  link?: string
): Promise<{ isOk: boolean; createdEvent: any }> => {
  const URL: string = userurls.postevent;

  const res: Response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ photo, date, title, description, type, link }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const createdEvent: Promise<any> = await res.json();

  return { isOk: res.ok, createdEvent };
};

export const getAllEvents = async (
  accessToken: string
): Promise<{ isOk: boolean; allEvents: any }> => {
  const URL: string = userurls.getevents;

  const res: Response = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const allEvents: Promise<any> = await res.json();

  return { isOk: res.ok, allEvents };
};

export const getAnEvent = async (
  eventId: string,
  accessToken: string
): Promise<{ isOk: boolean; event: any }> => {
  const URL: string = USER_BASE_URL + `/event/${eventId}`;

  const res: Response = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const event: Promise<any> = await res.json();

  return { isOk: res.ok, event };
};

export const attendEvent = async (
  eventId: string,
  accessToken: string
): Promise<{ isOk: boolean }> => {
  const URL: string = USER_BASE_URL + `/event/${eventId}/attend`;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};
