import { MyProfileStateProps } from "../components/myProfile";
import { UserProfile } from "../proto/user_pb";
import { ActionBase } from "../actions/actionBase";
import { ActionType } from "../actions/actionTypes";
import { UpdateUserProfile } from "../actions/profile";
import { MyProfileState } from "../states/myProfile";

const initialState: MyProfileState = {
  userProfile: new UserProfile(),
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
        userProfile: new UserProfile(),
      }
    }
    default:
      return state;
  }
}
