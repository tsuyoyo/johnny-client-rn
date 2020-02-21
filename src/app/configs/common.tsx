import {Platform} from 'react-native';

export const API_BASE_URL = Platform.OS === 'ios'
  ? "http://localhost:3000"
  : "http://10.0.2.2:3000";

export const COMMON_REQUEST_HEADERS = {
  'Content-Type': 'application/protobuf'
}

export const COMMON_AXIOS_CONFIG = {
  headers: COMMON_REQUEST_HEADERS,
}