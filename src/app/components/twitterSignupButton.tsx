import React, { useState } from 'react';
import { Button } from 'react-native';
import { User } from '../proto/user_pb';
import { SignupUserRequest, SignupUserResponse } from '../proto/userService_pb';
import * as twitterWrapper from '../apis/twitter';
import * as UserApi from '../apis/user';
import { PercussionApiError } from '../proto/error_pb';

export interface TwitterSignupButtonProps {
  onProcessing(isProcessing: boolean): void;
  onTwitterSignupSuccess(user: User, token: string): void;
  onTwitterSignupError(error: PercussionApiError): void;
}

export const TwitterSignupButton = (props: TwitterSignupButtonProps) => {

  const [isEnabled, setIsEnabled] = useState(true);

  const getSignupUserRequest = (token: string) => {
    const request = new SignupUserRequest();
    request.setToken(token);
    return request;
  }

  const signup = (token: string) => UserApi
    .postUserSignup(getSignupUserRequest(token))
    .then((response: SignupUserResponse) => {
      props.onTwitterSignupSuccess(response.getUser(), token);
    });

  const onLoginProcessing = (isProcessing: boolean) => {
    props.onProcessing(isProcessing)
    setIsEnabled(!isProcessing)
  }

  const handleSignupError = (error) => {
    if (error instanceof PercussionApiError) {
      props.onTwitterSignupError(error as PercussionApiError);
    }
  }

  const twitterSignUp = () => {
    onLoginProcessing(true)
    twitterWrapper.getFirebaseIdToken()
      .then(signup)
      .catch(handleSignupError)
      .finally(() => onLoginProcessing(false));
  };

  return(
    <Button
      onPress={twitterSignUp}
      title="Twitterアカウントで登録する"
      color="#841584"
      disabled={!isEnabled}
    />
  )
}