import { Message } from "google-protobuf";
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, COMMON_REQUEST_HEADERS } from '../configs/common';
import { PercussionApiError } from "../proto/error_pb";
import * as AsyncStorageKey from '../consts/asyncStorageKey';
import AsyncStorage from '@react-native-community/async-storage';

function createAxios(): Promise<AxiosInstance> {
  return Promise.all([
    AsyncStorage.getItem(AsyncStorageKey.USER_ID),
    AsyncStorage.getItem(AsyncStorageKey.TOKEN)
  ]).then(([userId, token]) => axios.create(
    {
      responseType: 'arraybuffer', // NOTE : Without responseType, response is coverted to string.
      baseURL: API_BASE_URL,
      headers: {
        ...COMMON_REQUEST_HEADERS,
        'x-api-token': token,
        'x-user-id': userId
      },
    }
  )).then(axiosInstance => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => { throw PercussionApiError.deserializeBinary(error.response.data) }
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
      .then(response => response.data)
  );
}

export function post(
  path: string,
  request: Message
): Promise<Uint8Array> {
  return createAxios().then(axiosInstance =>
    axiosInstance
      .post(path, request.serializeBinary())
      .then(response => response.data)
  );
}
