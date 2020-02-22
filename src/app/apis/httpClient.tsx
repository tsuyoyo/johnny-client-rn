import { Message } from "google-protobuf";
import axios from 'axios';
import { API_BASE_URL, COMMON_AXIOS_CONFIG } from '../configs/common';
import { PercussionApiError } from "../proto/error_pb";

function getBinaryData(response): Uint8Array {
  const dataSize = response.data.length;
  var binaryData = new Uint8Array(new ArrayBuffer(dataSize));
  for (var i = 0, strLen = dataSize; i < strLen; i++) {
    binaryData[i] = response.data.charCodeAt(i);
  }
  return binaryData;
}

export function post(
  path: string,
  request: Message,
  config = COMMON_AXIOS_CONFIG
): Promise<Uint8Array> {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      throw PercussionApiError.deserializeBinary(
        getBinaryData(error.response)
      );
    }
  );
  return axios
    .post(`${API_BASE_URL}${path}`, request.serializeBinary(), config)
    .then(response => new Promise(resolve => resolve(getBinaryData(response))));
}
