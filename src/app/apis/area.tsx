import { default as proto } from "../proto/johnnyproto";
import * as httpClient from './httpClient';

export function getAreaPrefectureCities(
  prefectureId: number
): Promise<proto.GetAreaCityResponse> {
  return httpClient
    .get(`/area/prefecture/${prefectureId}/cities`)
    .then((binary: Uint8Array) => new Promise((resolve) =>
      resolve(proto.GetAreaCityResponse.decode(binary))
    ));
}
