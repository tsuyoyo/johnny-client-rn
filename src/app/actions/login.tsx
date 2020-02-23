import {Action} from 'redux';
import { User } from '../proto/user_pb';
import {ActionType} from '../actions/actionTypes';
import {ActionBase} from '../actions/actionBase';
import { AsyncStorage } from 'react-native';
import * as AsyncStorageKey from '../consts/asyncStorageKey';

export interface UpdateLoginInfo extends ActionBase {
  user: User;
  accessToken: string;
}

function persistLoginInfo(user: User, accessToken: string) {
  AsyncStorage.setItem(AsyncStorageKey.USER_ID, user.getId());
  AsyncStorage.setItem(AsyncStorageKey.USER_NAME, user.getName());
  AsyncStorage.setItem(AsyncStorageKey.USER_PHOTO, user.getPhoto());
  AsyncStorage.setItem(AsyncStorageKey.TOKEN, accessToken);
}

export function updateLoginInfo(user: User, accessToken: string): UpdateLoginInfo {
  persistLoginInfo(user, accessToken);
  return {
    type: ActionType.UPDATE_LOGIN_INFO,
    user: user,
    accessToken: accessToken,
  };
}

export function clearLoginInfo() : ActionBase {
  return {
    type: ActionType.CLEAR_LOGIN_INFO,
  };
}
