import { NativeModules } from "react-native";
import { TWITTER_AUTH_TOKEN, TWITTER_AUTH_TOKEN_SECRET } from "../configs/secrets";
import { firebase } from "@react-native-firebase/auth";
const { RNTwitterSignIn } = NativeModules;

export function getFirebaseIdToken(): Promise<string> {
  RNTwitterSignIn.init(
    TWITTER_AUTH_TOKEN, TWITTER_AUTH_TOKEN_SECRET
  );
  return RNTwitterSignIn.logIn()
    .then(({ authToken, authTokenSecret }) => {
      const credential = firebase.auth.TwitterAuthProvider
        .credential(authToken, authTokenSecret);

      return firebase.auth().signInWithCredential(credential)
    })
    .then(credential => credential.user.getIdToken(false))
}