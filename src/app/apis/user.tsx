import { SignupUserRequest, SignupUserResponse } from "../proto/userService_pb";
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
