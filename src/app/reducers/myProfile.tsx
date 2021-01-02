import { MyProfileStateProps } from "../components/myProfile";
import { ActionBase } from "../actions/actionBase";
import { ActionType } from "../actions/actionTypes";
import { UpdateUserProfile } from "../actions/profile";
import { MyProfileState } from "../states/myProfile";
import * as proto from "../proto/johnnyproto";

const initialState: MyProfileState = {
  userProfile: new proto.UserProfile(),
}

export function reducer(
  state: MyProfileState = initialState,
  action: ActionBase
): MyProfileState {
  switch (action.type) {
    case ActionType.UPDATE_USER_PROFILE: {
      return {
        ...state,
        userProfile: (action as UpdateUserProfile).userProfile,
      };
    }
    case ActionType.CLEAR_USER_PROFILE: {
      return {
        ...state,
        userProfile: new proto.UserProfile(),
      }
    }
    default:
      return state;
  }
}
