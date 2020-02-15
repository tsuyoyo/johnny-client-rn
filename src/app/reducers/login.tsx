import {LoginStateProps, LoginDispatchProps, LoginComponent} from '../components/login';
import { User } from '../proto/user_pb';
import { LoginAction, LoginActionType, UpdateLoginInfo } from '../actions/login';

const initialState: LoginStateProps = {
  user: new User(),
  accessToken: "------",
}

export function reducer(
  state: LoginStateProps = initialState,
  action: LoginAction,
): LoginStateProps {
  console.log(`login's reducer - ${JSON.stringify(state)} : ${action.type.toString()}`)
  switch (action.type) {
    case LoginActionType.UPDATE_LOGIN_INFO:
      return {
        ...state,
        user: (action as UpdateLoginInfo).user,
        accessToken: (action as UpdateLoginInfo).accessToken,
      };
    case LoginActionType.CLEAR_LOGIN_INFO:
      return {
        ...state,
        user: initialState.user,
        accessToken: initialState.accessToken,
      };
    default:
      return state;
  }
}