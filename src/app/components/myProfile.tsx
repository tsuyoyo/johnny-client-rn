import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { User, UserProfile } from '../proto/user_pb';
import { getUserProfile } from '../apis/user';
import { ActiveArea } from './activeAreas';

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
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    getUserProfile("id_a")//props.user.getId())
      .then(response => {
        console.log(`User's active area - ${response.getUserprofile().getActivityareasList().length}`)

        const areas = response.getUserprofile().getActivityareasList();
        for (let i=0; i<areas.length; i++) {
          console.log(`${i} - ${areas[i].getName()}`)
        }
        setAreas(response.getUserprofile().getActivityareasList())

        props.updateUserProfile(response.getUserprofile())
      });
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.textView}>This is profile page.</Text>
        <Image
          source={{uri: props.user.getPhoto()}}
          style={{ width: 66, height: 58, backgroundColor: 'lightblue' }}/>
        <Text>{props.user.getName()}</Text>
        <ActiveArea
          areas={areas}
        />
      </View>
  );
}
