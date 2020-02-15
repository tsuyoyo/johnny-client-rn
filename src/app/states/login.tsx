import {User} from "../proto/user_pb"

export interface LoginState {
  accessToken: string;
  user: User;
}
