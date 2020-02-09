// package: pj.sakuchin.percussion.proto
// file: proto/areaService.proto

import * as jspb from "google-protobuf";
import * as proto_area_pb from "../proto/area_pb";

export class AddAreaRequest extends jspb.Message {
  getAreaname(): string;
  setAreaname(value: string): void;

  getPrefecture(): proto_area_pb.PrefectureMap[keyof proto_area_pb.PrefectureMap];
  setPrefecture(value: proto_area_pb.PrefectureMap[keyof proto_area_pb.PrefectureMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddAreaRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddAreaRequest): AddAreaRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddAreaRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddAreaRequest;
  static deserializeBinaryFromReader(message: AddAreaRequest, reader: jspb.BinaryReader): AddAreaRequest;
}

export namespace AddAreaRequest {
  export type AsObject = {
    areaname: string,
    prefecture: proto_area_pb.PrefectureMap[keyof proto_area_pb.PrefectureMap],
  }
}

export class AddAreaResponse extends jspb.Message {
  hasArea(): boolean;
  clearArea(): void;
  getArea(): proto_area_pb.Area | undefined;
  setArea(value?: proto_area_pb.Area): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddAreaResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddAreaResponse): AddAreaResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddAreaResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddAreaResponse;
  static deserializeBinaryFromReader(message: AddAreaResponse, reader: jspb.BinaryReader): AddAreaResponse;
}

export namespace AddAreaResponse {
  export type AsObject = {
    area?: proto_area_pb.Area.AsObject,
  }
}

export class GetAreaResponse extends jspb.Message {
  clearAreasList(): void;
  getAreasList(): Array<proto_area_pb.Area>;
  setAreasList(value: Array<proto_area_pb.Area>): void;
  addAreas(value?: proto_area_pb.Area, index?: number): proto_area_pb.Area;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAreaResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAreaResponse): GetAreaResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAreaResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAreaResponse;
  static deserializeBinaryFromReader(message: GetAreaResponse, reader: jspb.BinaryReader): GetAreaResponse;
}

export namespace GetAreaResponse {
  export type AsObject = {
    areasList: Array<proto_area_pb.Area.AsObject>,
  }
}

