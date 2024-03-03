import { io } from "socket.io-client";

export const BASE_URL: string = "https://4e4e-196-216-86-84.ngrok-free.app";

const AUTH_BASE_URL: string = `${BASE_URL}/api/auth`;
export const USER_BASE_URL = `${BASE_URL}/api/user`;
export const socket = io(BASE_URL);

export const FILES_BASE_URL: string = `https://veestream2.p.rapidapi.com`;
export const FILES_API_KEY: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bW15LWVtYWlsQG1haWwuY29tIiwiZXhwIjoxNzA5NTMwNjUyLCJpYXQiOjE3MDY5Mzg2NTJ9.M-yWlpiw_XXZLxJbA7QsnInXcfLnryk2LugrCrzrSt4`;

export const authurls = {
  signup: `${AUTH_BASE_URL}/emailSignup`,
  update: `${USER_BASE_URL}/updateProfile`,
  login: `${AUTH_BASE_URL}/emailLogin`,
  refresh: `${AUTH_BASE_URL}/refreshToken`,
  sendVerification: `${AUTH_BASE_URL}/sendVerification`,
  verify: `${AUTH_BASE_URL}/verify`,
};

export const userurls = {
  postevent: `${USER_BASE_URL}/event`,
  getevents: `${USER_BASE_URL}/events`,
  singleevent: `${USER_BASE_URL}/event/:eventId`,
  attendevent: `${USER_BASE_URL}/event/:eventId/attend`,
  communities: `${USER_BASE_URL}/communities`,
  createcommunity: `${USER_BASE_URL}/community`,
  createPost: `${USER_BASE_URL}/community/:communityId/post`,
  deletePost: `${USER_BASE_URL}/community/:communityId/delete`,
  getPosts: `${USER_BASE_URL}/community/:communityId/posts`,
  getPost: `${USER_BASE_URL}/community/post/:postId`,
  getUser: `${USER_BASE_URL}/singleUser`,
};
