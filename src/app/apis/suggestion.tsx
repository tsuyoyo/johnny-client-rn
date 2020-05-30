import {
  GetSuggestCityResponse,
} from "../proto/suggestService_pb";
import * as httpClient from './httpClient';

export function getSuggestedCities(
  partOfZipCode: string
): Promise<GetSuggestCityResponse> {
  return httpClient
    .get(`/suggestion/city`, { zipCode: partOfZipCode })
    .then((binary: Uint8Array) => new Promise((resolve) => {
      resolve(GetSuggestCityResponse.deserializeBinary(binary))
    }));
}
