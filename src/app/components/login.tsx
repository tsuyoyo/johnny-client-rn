import React, { useState } from 'react';
import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
import Toast from 'react-native-simple-toast';
import { TwitterLoginButton } from './twitterLoginButton';
import { TwitterSignupButton } from './twitterSignupButton';
import * as proto from "../proto/johnnyproto";

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
  user: proto.IUser
}

export interface LoginDispatchProps {
  updateLoginInfo(user: proto.IUser, accessToken: string): void
}

export interface LoginProps extends LoginStateProps, LoginDispatchProps {
}

export const LoginComponent = (props: LoginProps) => {

  const [isProcessing, setIsProcessing] = useState(false);

  const showAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK' }],
      {cancelable: true},
    );
  }

  const renderLoading = (show: boolean) => {
    if (show) {
      return(<ActivityIndicator size="large" color="#0000ff" />)
    } else {
      return null
    }
  }

  const onTwitterSignUpSuccess = (user: proto.IUser, token: string) => {
    Toast.show(`${user.name}さん、ようこそ`);
    props.updateLoginInfo(user, token);
  }

  const onTwitterSignUpError = (error: proto.PercussionApiError) => {
    showAlert('登録エラー', error.message);
  }

  const onTwitterLoginSuccess = (user: proto.IUser, token: string) => {
    Toast.show(`${user.name}さん、ログインしました`);
    props.updateLoginInfo(user, token);
  }

  const onTwitterLoginError = (error: proto.PercussionApiError) => {
    showAlert('ログインエラー', error.message);
  }

  return(
    <View style={styles.container}>
      <TwitterSignupButton
        onProcessing={setIsProcessing}
        onTwitterSignupSuccess={onTwitterSignUpSuccess}
        onTwitterSignupError={onTwitterSignUpError}
      />
      <TwitterLoginButton
        onProcessing={setIsProcessing}
        onTwitterLoginSuccess={onTwitterLoginSuccess}
        onTwitterLoginError={onTwitterLoginError}
      />
      <Text>{props.user.name}</Text>
      {renderLoading(isProcessing)}
    </View>
  );
}