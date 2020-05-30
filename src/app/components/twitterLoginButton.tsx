import React, { useState } from 'react';
import { Button } from 'react-native';
import { PostUserLoginRequest, PostUserLoginResponse } from '../proto/userService_pb';
import * as twitterWrapper from '../apis/twitter';
import * as UserApi from '../apis/user';
import { User } from '../proto/user_pb';
import { PercussionApiError } from '../proto/error_pb';

export interface TwitterLoginButtonProps {
  onProcessing(isProcessing: boolean): void;
  onTwitterLoginSuccess(user: User, token: string): void;
  onTwitterLoginError(error: PercussionApiError): void;
};

export const TwitterLoginButton = (props: TwitterLoginButtonProps) => {

  const [isEnabled, setIsEnabled] = useState(true);

  const postUserLoginRequest = (token: string) => {
    const request = new PostUserLoginRequest();
    request.setToken(token);
    return request;
  }

  const login = (token: string) => UserApi
    .postUserLogin(postUserLoginRequest(token))
    .then((response: PostUserLoginResponse) =>
      props.onTwitterLoginSuccess(response.getUser(), token)
    )

  const handleLoginError = (error) => {
    if (error instanceof PercussionApiError) {
      props.onTwitterLoginError(error as PercussionApiError);
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