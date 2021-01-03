import { default as proto } from "../proto/johnnyproto";
import * as httpClient from './httpClient';

export function getSuggestedCities(
  partOfZipCode: string
): Promise<proto.GetSuggestCityResponse> {
  return httpClient
    .get(`/suggestion/city`, { zipCode: partOfZipCode })
    .then((binary: Uint8Array) => new Promise((resolve) => {
      resolve(proto.GetSuggestCityResponse.decode(binary))
    }));
}
