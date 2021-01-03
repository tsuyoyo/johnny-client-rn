import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, COMMON_REQUEST_HEADERS } from '../configs/common';
import * as AsyncStorageKey from '../consts/asyncStorageKey';
import AsyncStorage from '@react-native-community/async-storage';
import { decode } from "base64-arraybuffer";
import { firebase } from "@react-native-firebase/auth";
import { default as proto } from "../proto/johnnyproto";

function createAxios(): Promise<AxiosInstance> {
  return Promise.all([
    AsyncStorage.getItem(AsyncStorageKey.USER_ID),
    firebase.auth().currentUser.getIdToken(true),
  ]).then(([userId, token]) => axios.create(
    {
      baseURL: API_BASE_URL,
      headers: {
        ...COMMON_REQUEST_HEADERS,
        'x-api-token': token,
        'x-user-id': userId,
        'Content-Type': "application/protobuf",
      },
    }
  ))
  .then(axiosInstance => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        throw proto.PercussionApiError.decode(
          new Uint8Array(decode(error.response.data))
        )
      }
    );
    return axiosInstance;
  });
}

export function get(
  path: string,
  params: object = {}
): Promise<Uint8Array> {
  return createAxios().then(axiosInstance =>
    axiosInstance
      .get(path, { params: params })
      .then(response => new Uint8Array(decode(response.data)))
  );
}

export function post(
  path: string,
  request: Uint8Array
): Promise<Uint8Array> {
  console.log(`Login request - ${request.length}`)
  var s = "";
  request.forEach(d => s += `${d},`);
  console.log(s);

  return createAxios().then(axiosInstance =>
    axiosInstance
      .post(path, request)
      .then(response => new Uint8Array(decode(response.data)))
  );
}

export function put(
  path: string,
  request: Uint8Array
): Promise<Uint8Array> {
  return createAxios().then(axiosInstance =>
    axiosInstance
      .put(path, request)
      .then(response => new Uint8Array(decode(response.data)))
  );
}
