import React, { useState } from 'react';
import { Button } from 'react-native';
import * as twitterWrapper from '../apis/twitter';
import * as UserApi from '../apis/user';
import * as proto from "../proto/johnnyproto";

export interface TwitterLoginButtonProps {
  onProcessing(isProcessing: boolean): void;
  onTwitterLoginSuccess(user: proto.IUser, token: string): void;
  onTwitterLoginError(error: proto.PercussionApiError): void;
};

export const TwitterLoginButton = (props: TwitterLoginButtonProps) => {

  const [isEnabled, setIsEnabled] = useState(true);

  const postUserLoginRequest = (token: string) => {
    return new proto.PostUserLoginRequest({
      token
    });
  }

  const login = (token: string) => UserApi
    .postUserLogin(postUserLoginRequest(token))
    .then((response: proto.PostUserLoginResponse) =>
      props.onTwitterLoginSuccess(response.user, token)
    )

  const handleLoginError = (error) => {
    if (error instanceof proto.PercussionApiError) {
      props.onTwitterLoginError(error as proto.PercussionApiError);
    }
  }

  const onLoginProcessing = (isProcessing: boolean) => {
    props.onProcessing(isProcessing)
    setIsEnabled(!isProcessing)
  }

  const twitterLogin = () => {
    onLoginProcessing(true)
    twitterWrapper.getFirebaseIdToken()
      .then(login)
      .catch(handleLoginError)
      .finally(() => onLoginProcessing(false));
  }

  return(
    <Button
      onPress={() => twitterLogin()}
      title="Twitterアカウントでログイン"
      color="#841584"
      disabled={!isEnabled}
    />
  )
}