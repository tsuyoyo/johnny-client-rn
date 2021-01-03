import {LoginStateProps, LoginDispatchProps, LoginComponent} from '../components/login';
import { UpdateLoginInfo } from '../actions/login';
import { ActionBase } from '../actions/actionBase';
import { ActionType } from '../actions/actionTypes';
import { default as proto } from "../proto/johnnyproto";

const initialState: LoginStateProps = {
  user: new proto.User(),
  accessToken: "------",
}

export function reducer(
  state: LoginStateProps = initialState,
  action: ActionBase,
): LoginStateProps {
  switch (action.type) {
    case ActionType.UPDATE_LOGIN_INFO: {
      return {
        ...state,
        user: (action as UpdateLoginInfo).user,
        accessToken: (action as UpdateLoginInfo).accessToken,
      };
    }
    case ActionType.CLEAR_LOGIN_INFO:
      return {
        ...state,
        user: initialState.user,
        accessToken: initialState.accessToken,
      };
    default:
      return state;
  }
}