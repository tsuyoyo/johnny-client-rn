import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { User, UserProfile } from '../proto/user_pb';
import { getUserProfile } from '../apis/user';
import { ProfileActiveAreasList } from './profile/ProfileActiveAreasList';
import { Button } from 'native-base';

const IMAGE_SIZE = 72;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingStart: 16,
  },
  textInput: {
    fontSize: 24,
  },
  textView: {
    fontSize: 32,
  },
  userImage : {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginEnd: 16,
    marginTop: 16,
    marginBottom: 32,
    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: 'lightblue',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerUserName: {
    flex: 1,
    fontSize: 24,
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

  const renderBoarder = () => (
    <View style={{
      height: 0.5,
      backgroundColor: '#000000',
      alignSelf: 'stretch',
      marginTop: 16,
      marginBottom: 16,
    }}/>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: props.user.getPhoto()}}
          style={styles.userImage}
        />
        <Text style={styles.headerUserName}>{props.user.getName()}</Text>
      </View>
      {renderBoarder()}
      <ProfileActiveAreasList
        areas={props.userProfile.getActivecitiesList()}
        onEditClicked={launchActiveAreaEdit}
      />
    </View>
  );
}
