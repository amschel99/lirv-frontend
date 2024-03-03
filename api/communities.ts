import { userurls, USER_BASE_URL } from "./config";

export const getCommunities = async (
  accessToken: string
): Promise<{ isOk: boolean; communities: any }> => {
  const URL: string = userurls.communities;

  const res: Response = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const communities: Promise<any> = await res.json();

  return { isOk: res.ok, communities };
};

export const getCommunity = async (
  accessToken: string,
  communityId: string
): Promise<{ isOk: boolean; community: any }> => {
  const URL: string = `${USER_BASE_URL}/community/${communityId}`;

  const res: Response = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const community: Promise<any> = await res.json();

  return { isOk: res.ok, community };
};

export const createCommunity = async (
  image: string,
  description: string,
  title: string,
  accessToken: string
): Promise<{ isOk: boolean; communityInfo: any }> => {
  const URL: string = userurls.createcommunity;

  const res: Response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({ image, description, title }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const communityInfo: Promise<any> = res.json();

  return { isOk: res.ok, communityInfo };
};

export const userJoinCommunity = async (
  communityId: string,
  accessToken: string
): Promise<{ isOk: boolean }> => {
  const URL: string = USER_BASE_URL + `/${communityId}`;

  const res: Response = await fetch(URL, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const userLeaveCommunity = async (
  communityId: string,
  accessToken: string
): Promise<{ isOk: boolean }> => {
  const URL: string = USER_BASE_URL + `/${communityId}`;

  const res: Response = await fetch(URL, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return { isOk: res.ok };
};

export const userPostInCommunity = async (
  postContent: string,
  accessToken: string,
  community: string,
  postImage?: string,
  createdAt?: string
): Promise<{ isOk: boolean; post: any }> => {
  const URL: string = USER_BASE_URL + `/community/${community}/post`;

  const res: Response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      postContent,
      postImage,
      createdAt: new Date(),
      community,
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const post: Promise<any> = res.json();

  return { isOk: res.ok, post };
};

export const getPostsInCommunity = async (
  community: string,
  accessToken: string
): Promise<{ isOk: boolean; communityPosts: any }> => {
  const URL: string = USER_BASE_URL + `/community/${community}/posts`;

  const res: Response = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const communityPosts: Promise<any> = await res.json();
  return { isOk: res.ok, communityPosts };
};

export const getPostInCommunity = async (
  postId: string,
  accessToken: string
): Promise<{ isOk: boolean; post: any }> => {
  const URL: string = USER_BASE_URL + `/community/post/${postId}`;

  const res: Response = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const post: Promise<any> = res.json();

  return { isOk: res.ok, post };
};
export const deleteCommunityPost = async (
  postId: string,
  community: string,
  accessToken: string
): Promise<{ isOk: boolean; communityPosts: any }> => {
  const URL: string = USER_BASE_URL + `/community/${community}/delete`;

  const res: Response = await fetch(URL, {
    method: "DELETE",
    body: JSON.stringify({ postId }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const communityPosts: Promise<any> = res.json();

  return { isOk: res.ok, communityPosts };
};
