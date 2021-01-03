import { default as proto } from "../proto/johnnyproto";
import * as httpClient from './httpClient';

export function postUserSignup(
  request: proto.SignupUserRequest
): Promise<proto.SignupUserResponse> {
  return httpClient
    .post("/user/signup", proto.SignupUserRequest.encode(request).finish())
    .then((binary: Uint8Array) => new Promise((resolve) => {
      resolve(proto.SignupUserResponse.decode(binary));
    }));
}

export function postUserLogin(
  request: proto.PostUserLoginRequest
): Promise<proto.PostUserLoginResponse> {
  // console.log(`Login request - ${proto.PostUserLoginRequest.encode(request).finish()}`)
  // var b = proto.PostUserLoginRequest.encode(request).finish();
  // var s = "";
  // b.forEach(d => s += `${d},`);
  // console.log(s);
  return httpClient
    .post("/user/login", proto.PostUserLoginRequest.encode(request).finish())
    .then((binary: Uint8Array) => new Promise((resolve) => {
      resolve(proto.PostUserLoginResponse.decode(binary));
    }));
}

export function getUserProfile(
  userId: string
): Promise<proto.GetUserProfileResponse> {
  return httpClient
  .get(`/user/${userId}/profile`)
  .then((binary: Uint8Array) => new Promise((resolve) =>
    resolve(proto.GetUserProfileResponse.decode(binary))
  ));
}

export function putUserProfileArea(
  userId: string,
  request: proto.PutUserCityRequest
): Promise<number> {
  return httpClient
  .put(`/user/${userId}/profile/city`, proto.PutUserCityRequest.encode(request).finish())
  .then((binary: Uint8Array) => new Promise((resolve) =>
    resolve(0)
  ));
}
