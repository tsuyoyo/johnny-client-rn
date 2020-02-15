import {HomeState} from "./home";
import { LoginState } from "./login";

/**
 * This class is to define states which are shared in whole of app.
 */
export interface JohnnyAppState {
  // TODO : Delete it later
  home: HomeState,
  login: LoginState,
}