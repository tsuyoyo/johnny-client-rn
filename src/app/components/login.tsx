import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { User } from '../proto/user_pb';
import {TwitterButton} from '../components/twitterbutton';

import { NativeModules } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import {TWITTER_AUTH_TOKEN, TWITTER_AUTH_TOKEN_SECRET} from "../const/secrets"
import { SignupUserRequest, SignupUserResponse } from '../proto/userService_pb';
const { RNTwitterSignIn } = NativeModules;
import axios from 'axios';

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
      .then(idToken => {
        console.log(`aaaaaaaaaaa - ${idToken}`)

        const request = new SignupUserRequest();
        request.setToken(idToken);
        return axios.post(
          'http://10.0.2.2:3000/user/signup',
          request.serializeBinary(),
          {
            headers: {
              'Content-Type': 'application/protobuf'
            }
        });
      })
      .then(response => {
        var buf = new ArrayBuffer(response.data.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = response.data.length; i < strLen; i++) {
          bufView[i] = response.data.charCodeAt(i);
        }
        const r = SignupUserResponse.deserializeBinary(new Uint8Array(buf));
        console.log(`Response - ${JSON.stringify(response)}`)
        console.log(`SignupUserResponse - ${r.getUser().getName()}`)
      });
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