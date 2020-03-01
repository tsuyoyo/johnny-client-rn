import React, { useState } from 'react';
import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
import { User } from '../proto/user_pb';
import { PercussionApiError } from '../proto/error_pb';
import Toast from 'react-native-simple-toast';
import { TwitterLoginButton } from './twitterLoginButton';
import { TwitterSignupButton } from './twitterSignupButton';

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

  const onTwitterSignUpSuccess = (user: User, token: string) => {
    Toast.show(`${user.getName()}さん、ようこそ`);
    props.updateLoginInfo(user, token);
  }

  const onTwitterSignUpError = (error: PercussionApiError) => {
    showAlert('登録エラー', error.getMessage());
  }

  const onTwitterLoginSuccess = (user: User, token: string) => {
    Toast.show(`${user.getName()}さん、ログインしました`);
    props.updateLoginInfo(user, token);
  }

  const onTwitterLoginError = (error: PercussionApiError) => {
    showAlert('ログインエラー', error.getMessage());
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
      <Text>{props.user.getName()}</Text>
      {renderLoading(isProcessing)}
    </View>
  );
}