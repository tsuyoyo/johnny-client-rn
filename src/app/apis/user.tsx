import {
  SignupUserRequest,
  SignupUserResponse,
  PostUserLoginRequest,
  PostUserLoginResponse,
  GetUserProfileResponse,
  PutUserCityRequest
} from "../proto/userService_pb";
import * as httpClient from './httpClient';

export function postUserSignup(
  request: SignupUserRequest
): Promise<SignupUserResponse> {
  return httpClient
    .post("/user/signup", request)
    .then((binary: Uint8Array) => new Promise((resolve) => {
      resolve(SignupUserResponse.deserializeBinary(binary));
    }));
}

export function postUserLogin(
  request: PostUserLoginRequest
): Promise<PostUserLoginResponse> {
  return httpClient
    .post("/user/login", request)
    .then((binary: Uint8Array) => new Promise((resolve) => {
      resolve(PostUserLoginResponse.deserializeBinary(binary));
    }));
}

export function getUserProfile(
  userId: string
): Promise<GetUserProfileResponse> {
  return httpClient
  .get(`/user/${userId}/profile`)
  .then((binary: Uint8Array) => new Promise((resolve) =>
    resolve(GetUserProfileResponse.deserializeBinary(binary))
  ));
}

export function putUserProfileArea(
  userId: string,
  request: PutUserCityRequest
): Promise<number> {
  return httpClient
  .put(`/user/${userId}/profile/city`, request)
  .then((binary: Uint8Array) => new Promise((resolve) =>
    resolve(0)
  ));
}
