import {Action} from 'redux';
import { User } from '../proto/user_pb';

export enum LoginActionType {
  UPDATE_LOGIN_INFO = 'UPDATE_LOGIN_INFO',
  CLEAR_LOGIN_INFO = 'CLEAR_LOGIN_INFO'
}

export interface LoginAction extends Action<LoginActionType> {}

export interface UpdateLoginInfo extends LoginAction {
  user: User,
  accessToken: string,
}

export function updateLoginInfo(
  user: User,
  accessToken: string
): UpdateLoginInfo {
  return {
    type: LoginActionType.UPDATE_LOGIN_INFO,
    user: user,
    accessToken: accessToken,
  }
}

export function clearLoginInfo() : LoginAction {
  return {
    type: LoginActionType.CLEAR_LOGIN_INFO,
  }
}

