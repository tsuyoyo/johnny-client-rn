import {
  GetAreaCityResponse,
} from "../proto/areaService_pb";
import * as httpClient from './httpClient';

export function getAreaPrefectureCities(
  prefectureId: number
): Promise<GetAreaCityResponse> {
  return httpClient
    .get(`/area/prefecture/${prefectureId}/cities`)
    .then((binary: Uint8Array) => new Promise((resolve) =>
      resolve(GetAreaCityResponse.deserializeBinary(binary))
    ));
}
