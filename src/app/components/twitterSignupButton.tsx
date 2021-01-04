import React, { useState } from 'react';
import { Button } from 'react-native';
import * as twitterWrapper from '../apis/twitter';
import * as UserApi from '../apis/user';
import { default as proto } from "../proto/johnnyproto";

export interface TwitterSignupButtonProps {
  onProcessing(isProcessing: boolean): void;
  onTwitterSignupSuccess(user: proto.IUser, token: string): void;
  onTwitterSignupError(error: proto.PercussionApiError): void;
}

export const TwitterSignupButton = (props: TwitterSignupButtonProps) => {

  const [isEnabled, setIsEnabled] = useState(true);

  const getSignupUserRequest = (token: string) => {
    return new proto.SignupUserRequest({
      token
    });
  }

  const signup = (token: string) => UserApi
    .postUserSignup(getSignupUserRequest(token))
    .then((response: proto.SignupUserResponse) => {
      props.onTwitterSignupSuccess(response.user, token);
    });

  const onLoginProcessing = (isProcessing: boolean) => {
    props.onProcessing(isProcessing)
    setIsEnabled(!isProcessing)
  }

  const handleSignupError = (error) => {
    if (error instanceof proto.PercussionApiError) {
      props.onTwitterSignupError(error as proto.PercussionApiError);
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