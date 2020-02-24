import React from 'react';
import {StyleSheet, Text, View, Button, Alert, AlertButton} from 'react-native';
import { User } from '../proto/user_pb';
import { SignupUserRequest, SignupUserResponse, PostUserLoginRequest, PostUserLoginResponse } from '../proto/userService_pb';
import * as twitterWrapper from '../apis/twitter';
import * as UserApi from '../apis/user';
import { PercussionApiError } from '../proto/error_pb';
import Toast from 'react-native-simple-toast';

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
  updateLoginInfo(user: User, accessToken: string): void
}

export interface LoginProps extends LoginStateProps, LoginDispatchProps {
}

export const LoginComponent = (props: LoginProps) => {

  function signup(token: string) {
    const request = new SignupUserRequest();
    request.setToken(token);

    return UserApi.postUserSignup(request)
      .then((response: SignupUserResponse) => {
        Toast.show('登録が完了しました');
        props.updateLoginInfo(response.getUser(), token)
      });
  }

  function login(token: string) {
    const request = new PostUserLoginRequest();
    request.setToken(token);
    return UserApi.postUserLogin(request)
      .then((response: PostUserLoginResponse) => {
        Toast.show('ログインが完了しました');
        props.updateLoginInfo(response.getUser(), token);
      });
  }

  const twitterSignIn = () => {
    twitterWrapper.getFirebaseIdToken()
      .then((token: string) => signup(token))
      .catch(error => {
        if (error instanceof PercussionApiError) {
          const apiError = error as PercussionApiError
          if (apiError.getErrorcode() == PercussionApiError.ErrorCode.USER_HAS_BEEN_ALREADY_REGISTERED) {
            Alert.alert(
              'Signup error',
              "このアカウントは登録済みです。Loginしてください。",
              [{ text: 'OK' }],
              {cancelable: true},
            );
            console.log("Already registered")
          }
        }
      });
  };

  const twitterLogin = () => {
    twitterWrapper.getFirebaseIdToken()
      .then((token: string) => login(token))
      .catch(error => {
        if (error instanceof PercussionApiError) {
          const apiError = error as PercussionApiError;
          Alert.alert(
            'Login error',
            "Loginに失敗しました。まだ登録してない場合は登録してください。",
            [{ text: 'OK' }],
            {cancelable: true},
          );
          console.log("Already registered")
        }
      });
  }

  return(
    <View style={styles.container}>
      <Button
        onPress={() => twitterSignIn()}
        title="Signup"
        color="#841584"
      />
      <Button
        onPress={() => twitterLogin()}
        title="Login"
        color="#841584"
      />
      <Text>{props.user.getName()}</Text>
  </View>
  );
}