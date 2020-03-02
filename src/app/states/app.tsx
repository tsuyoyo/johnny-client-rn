import {HomeState} from "./home";
import { LoginState } from "./login";
import { MyProfileState } from "./myProfile";

/**
 * This class is to define states which are shared in whole of app.
 */
export interface JohnnyAppState {
  home: HomeState, // <-- TODO : Delete it later
  login: LoginState,
  profile: MyProfileState,
}