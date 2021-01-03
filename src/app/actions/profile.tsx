import { ActionBase } from "./actionBase";
import { ActionType } from "./actionTypes";
import { default as proto } from "../proto/johnnyproto";

export interface UpdateUserProfile extends ActionBase {
  userProfile: proto.UserProfile;
}

export function updateUserProfile(userProfile: proto.UserProfile): UpdateUserProfile {
  return{
    type: ActionType.UPDATE_USER_PROFILE,
    userProfile: userProfile,
  }
};
