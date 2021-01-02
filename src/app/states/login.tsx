import { pj } from "johnny-proto";
import proto = pj.sakuchin.percussion.proto;

export interface LoginState {
  accessToken: string;
  user: proto.User;
}
