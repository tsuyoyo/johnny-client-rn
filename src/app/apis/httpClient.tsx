import { Message } from "google-protobuf";
import axios from 'axios';
import { API_BASE_URL, COMMON_AXIOS_CONFIG } from '../configs/common';

function getBinaryData(response): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const dataSize = response.data.length;
    var binaryData = new Uint8Array(new ArrayBuffer(dataSize));
    for (var i = 0, strLen = dataSize; i < strLen; i++) {
      binaryData[i] = response.data.charCodeAt(i);
    }
    resolve(binaryData);
  });
}

export function post(
  path: string,
  request: Message,
  config = COMMON_AXIOS_CONFIG
): Promise<Uint8Array> {
  return axios
    .post(`${API_BASE_URL}${path}`, request.serializeBinary(), config)
    .then(response => getBinaryData(response));
}
