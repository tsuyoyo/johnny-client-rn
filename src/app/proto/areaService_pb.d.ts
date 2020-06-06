// package: pj.sakuchin.percussion.proto
// file: proto/areaService.proto

import * as jspb from "google-protobuf";
import * as proto_area_pb from "../proto/area_pb";

export class GetAreaCityResponse extends jspb.Message {
  clearCitiesList(): void;
  getCitiesList(): Array<proto_area_pb.City>;
  setCitiesList(value: Array<proto_area_pb.City>): void;
  addCities(value?: proto_area_pb.City, index?: number): proto_area_pb.City;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAreaCityResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAreaCityResponse): GetAreaCityResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAreaCityResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAreaCityResponse;
  static deserializeBinaryFromReader(message: GetAreaCityResponse, reader: jspb.BinaryReader): GetAreaCityResponse;
}

export namespace GetAreaCityResponse {
  export type AsObject = {
    citiesList: Array<proto_area_pb.City.AsObject>,
  }
}

