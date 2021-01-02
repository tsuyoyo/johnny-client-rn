import {ActionType} from '../actions/actionTypes';
import {ActionBase} from '../actions/actionBase';
import AsyncStorage from '@react-native-community/async-storage';
import * as AsyncStorageKey from '../consts/asyncStorageKey';
import * as proto from "../proto/johnnyproto";

export interface UpdateLoginInfo extends ActionBase {
  user: proto.IUser;
  accessToken: string;
}

function persistLoginInfo(user: proto.IUser) {
  AsyncStorage.setItem(AsyncStorageKey.USER_ID, user.id);
  AsyncStorage.setItem(AsyncStorageKey.USER_NAME, user.name);
  AsyncStorage.setItem(AsyncStorageKey.USER_PHOTO, user.photo);
}

export function updateLoginInfo(user: proto.IUser): UpdateLoginInfo {
  persistLoginInfo(user);
  return {
    type: ActionType.UPDATE_LOGIN_INFO,
    user: user,
    accessToken: "",
  };
}

export function clearLoginInfo() : ActionBase {
  return {
    type: ActionType.CLEAR_LOGIN_INFO,
  };
}
