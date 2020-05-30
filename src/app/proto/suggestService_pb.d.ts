// package: pj.sakuchin.percussion.proto
// file: proto/suggestService.proto

import * as jspb from "google-protobuf";
import * as proto_area_pb from "../proto/area_pb";

export class GetSuggestCityResponse extends jspb.Message {
  clearCitiesList(): void;
  getCitiesList(): Array<proto_area_pb.City>;
  setCitiesList(value: Array<proto_area_pb.City>): void;
  addCities(value?: proto_area_pb.City, index?: number): proto_area_pb.City;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSuggestCityResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSuggestCityResponse): GetSuggestCityResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSuggestCityResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSuggestCityResponse;
  static deserializeBinaryFromReader(message: GetSuggestCityResponse, reader: jspb.BinaryReader): GetSuggestCityResponse;
}

export namespace GetSuggestCityResponse {
  export type AsObject = {
    citiesList: Array<proto_area_pb.City.AsObject>,
  }
}

