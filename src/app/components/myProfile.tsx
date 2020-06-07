import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { User, UserProfile } from '../proto/user_pb';
import { getUserProfile } from '../apis/user';
import { ProfileActiveAreasList } from './profile/ProfileActiveAreasList';
import { Button } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex:1,
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

export interface MyProfileStateProps {
  user: User,
  userProfile: UserProfile,
}

export interface MyProfileDispatchProps {
  updateUserProfile(userProfile: UserProfile): void
}

export interface MyProfileProps extends MyProfileStateProps, MyProfileDispatchProps {
}

export const MyProfileComponent = (props: MyProfileProps) => {

  useEffect(() => {
    getUserProfile(props.user.getId())
      .then(response => {
        console.log(`Feched user profile - ${response.getUser().getName()}`)
        props.updateUserProfile(response.getUserprofile())
      });
  }, []);

  const launchActiveAreaEdit = () => {
    props.navigation.navigate('AreaSelection');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.textView}>This is profile page.</Text>
        <Image
          source={{uri: props.user.getPhoto()}}
          style={{ width: 66, height: 58, backgroundColor: 'lightblue' }}/>
        <Text>{props.user.getName()}</Text>
        <ProfileActiveAreasList
          areas={props.userProfile.getActivecitiesList()}
          onEditClicked={launchActiveAreaEdit}
        />
      </View>
  );
}
