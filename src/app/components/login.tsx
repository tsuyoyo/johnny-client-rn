import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { User } from '../proto/user_pb';
import {TwitterButton} from '../components/twitterbutton';

import { NativeModules } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import {TWITTER_AUTH_TOKEN, TWITTER_AUTH_TOKEN_SECRET} from "../const/secrets"
const { RNTwitterSignIn } = NativeModules;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 24,
  },
  textView: {
    fontSize: 32,
  },
});

export interface LoginStateProps {
  accessToken: string,
  user: User
}

export interface LoginDispatchProps {
  updateLoginInfo(): void
}

export interface LoginProps extends LoginStateProps, LoginDispatchProps {
}

export const LoginComponent = (props: LoginProps) => {

  let twitterSignIn = () => {
    RNTwitterSignIn.init(TWITTER_AUTH_TOKEN, TWITTER_AUTH_TOKEN_SECRET);
    RNTwitterSignIn.logIn()
      .then(loginData => {
        const { authToken, authTokenSecret } = loginData
        const credential = firebase.auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
        return firebase.auth().signInWithCredential(credential)
      })
      .then(credential => credential.user.getIdToken(false))
      .then(idToken => console.log(`aaaaaaaaaaa - ${idToken}`));
  };

  return(
    <View style={styles.container}>
      <Button
        onPress={() => {
          console.log(`LoginComponent - ${JSON.stringify(props)}`)
          twitterSignIn()
        }}
        title={`token - ${props.accessToken}`}
        color="#841584"
      />
  </View>
  );
}