// package: pj.sakuchin.percussion.proto
// file: proto/area.proto

import * as jspb from "google-protobuf";

export class Area extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getPrefecture(): PrefectureMap[keyof PrefectureMap];
  setPrefecture(value: PrefectureMap[keyof PrefectureMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Area.AsObject;
  static toObject(includeInstance: boolean, msg: Area): Area.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Area, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Area;
  static deserializeBinaryFromReader(message: Area, reader: jspb.BinaryReader): Area;
}

export namespace Area {
  export type AsObject = {
    id: number,
    name: string,
    prefecture: PrefectureMap[keyof PrefectureMap],
  }
}

export interface PrefectureMap {
  UNKNOWN: 0;
  HOKKAIDO: 1;
  AOMORI: 2;
  IWATE: 3;
  MIYAGI: 4;
  AKITA: 5;
  YAMAGATA: 6;
  FUKUSHIMA: 7;
  IBARAKI: 8;
  TOCHIGI: 9;
  GUNNMA: 10;
  SAITAMA: 11;
  CHIBA: 12;
  TOKYO: 13;
  KANAGAWA: 14;
  NIIGATA: 15;
  TOYAMA: 16;
  ISHIKAWA: 17;
  FUKUI: 18;
  YAMANASHI: 19;
  NAGANO: 20;
  GIFU: 21;
  SHIZUOKA: 22;
  AICHI: 23;
  MIE: 24;
  SHIGA: 25;
  KYOTO: 26;
  OSAKA: 27;
  HYOGO: 28;
  NARA: 29;
  WAKAYAMA: 30;
  TOTTORI: 31;
  SHIMANE: 32;
  OKAYAMA: 33;
  HIROSHIMA: 34;
  YAMAGUCHI: 35;
  TOKUSHIMA: 36;
  KAGAWA: 37;
  EHIME: 38;
  KOCHI: 39;
  FUKUOKA: 40;
  SAGA: 41;
  NAGASAKI: 42;
  KUMAMOTO: 43;
  OITA: 44;
  MIYAZAKI: 45;
  KAGOSHIMA: 46;
  OKINAWA: 47;
}

export const Prefecture: PrefectureMap;

