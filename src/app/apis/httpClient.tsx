import { Message } from "google-protobuf";
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, COMMON_REQUEST_HEADERS } from '../configs/common';
import { PercussionApiError } from "../proto/error_pb";
import * as AsyncStorageKey from '../consts/asyncStorageKey';
import AsyncStorage from '@react-native-community/async-storage';
import { decode } from "base64-arraybuffer";
import { firebase } from "@react-native-firebase/auth";

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
        throw PercussionApiError.deserializeBinary(
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
  request: Message
): Promise<Uint8Array> {
  return createAxios().then(axiosInstance =>
    axiosInstance
      .post(path, request.serializeBinary())
      .then(response => new Uint8Array(decode(response.data)))
  );
}

export function put(
  path: string,
  request: Message
): Promise<Uint8Array> {
  return createAxios().then(axiosInstance =>
    axiosInstance
      .put(path, request.serializeBinary())
      .then(response => new Uint8Array(decode(response.data)))
  );
}
