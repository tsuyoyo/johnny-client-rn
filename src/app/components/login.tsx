import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { User } from '../proto/user_pb';
import { SignupUserRequest, SignupUserResponse } from '../proto/userService_pb';
import * as twitterWrapper from '../apis/twitter';
import * as UserApi from '../apis/user';

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
        props.updateLoginInfo(response.getUser(), token)
      });
  }

  const twitterSignIn = () => {
    twitterWrapper.getFirebaseIdToken()
      .then((token: string) => signup(token))
      .catch(error => {
        console.log(`Error - ${error.message}`);
      });
  };

  return(
    <View style={styles.container}>
      <Button
        onPress={() => {
          console.log(`LoginComponent - ${JSON.stringify(props)}`)
          twitterSignIn()
        }}
        title="Signup"
        color="#841584"
      />
      <Text>{props.user.getName()}</Text>
  </View>
  );
}