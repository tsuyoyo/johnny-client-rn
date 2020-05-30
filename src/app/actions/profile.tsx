import { ActionBase } from "./actionBase";
import { UserProfile } from "../proto/user_pb";
import { ActionType } from "./actionTypes";

export interface UpdateUserProfile extends ActionBase {
  userProfile: UserProfile;
}

export function updateUserProfile(userProfile: UserProfile): UpdateUserProfile {
  return{
    type: ActionType.UPDATE_USER_PROFILE,
    userProfile: userProfile,
  }
};
