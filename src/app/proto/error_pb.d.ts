// package: pj.sakuchin.percussion.proto
// file: proto/error.proto

import * as jspb from "google-protobuf";

export class PercussionApiError extends jspb.Message {
  getErrorcode(): PercussionApiError.ErrorCodeMap[keyof PercussionApiError.ErrorCodeMap];
  setErrorcode(value: PercussionApiError.ErrorCodeMap[keyof PercussionApiError.ErrorCodeMap]): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PercussionApiError.AsObject;
  static toObject(includeInstance: boolean, msg: PercussionApiError): PercussionApiError.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PercussionApiError, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PercussionApiError;
  static deserializeBinaryFromReader(message: PercussionApiError, reader: jspb.BinaryReader): PercussionApiError;
}

export namespace PercussionApiError {
  export type AsObject = {
    errorcode: PercussionApiError.ErrorCodeMap[keyof PercussionApiError.ErrorCodeMap],
    message: string,
  }

  export interface ErrorCodeMap {
    UNKNOWN: 0;
    NO_TOKEN: 1;
    INVALID_FIREBASE_TOKEN: 2;
    USER_HAS_BEEN_ALREADY_REGISTERED: 3;
    DB_ERROR: 4;
    INVALID_PARAMETER: 5;
  }

  export const ErrorCode: ErrorCodeMap;
}

