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

  const getSignupUserRequest = (token: string) => {
    const request = new SignupUserRequest();
    request.setToken(token);
    return request;
  }

  const postUserLoginRequest = (token: string) => {
    const request = new PostUserLoginRequest();
    request.setToken(token);
    return request;
  }

  function signup(token: string) {
    return UserApi
      .postUserSignup(getSignupUserRequest(token))
      .then((response: SignupUserResponse) => {
        Toast.show('登録が完了しました');
        props.updateLoginInfo(response.getUser(), token)
      });
  }

  function login(token: string) {
    return UserApi
      .postUserLogin(postUserLoginRequest(token))
      .then((response: PostUserLoginResponse) => {
        Toast.show('ログインが完了しました');
        props.updateLoginInfo(response.getUser(), token);
      });
  }

  const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK' }],
      {cancelable: true},
    );
  }

  const twitterSignIn = () => {
    twitterWrapper.getFirebaseIdToken()
      .then((token: string) => signup(token))
      .catch(error => {
        if (error instanceof PercussionApiError) {
          showAlert('Signup error', (error as PercussionApiError).getMessage());
        }
      });
  };

  const twitterLogin = () => {
    twitterWrapper.getFirebaseIdToken()
      .then((token: string) => login(token))
      .catch(error => {
        if (error instanceof PercussionApiError) {
          const apiError = error as PercussionApiError;
          if (apiError.getErrorcode() == PercussionApiError.ErrorCode.AUTHENTICATION_ERROR) {
            Toast.show(apiError.getMessage())
          } else {
            showAlert('Login error', apiError.getMessage());
          }
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