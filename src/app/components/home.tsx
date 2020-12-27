import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import * as AsyncStorageKey from '../consts/asyncStorageKey';
import AsyncStorage from '@react-native-community/async-storage';
import { User } from '../proto/user_pb';

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

export interface HomeStateProps {
  count: number,
  user: User,
  token: string
}

export interface HomeDispatchProps {
  incrementCount(count: number): void;
  resetCount(): void;
  initLoginState(user: User): void;
}

export interface HomeProps extends HomeStateProps, HomeDispatchProps {}

export class HomeComponent extends React.Component<HomeProps> {

  private initLoginState({id, name, photo}): void {
    const user = new User();
    user.setId(id)
    user.setName(name)
    user.setPhoto(photo)
    this.props.initLoginState(user);
  };

  private loadLoginState() {
    Promise.all([
      AsyncStorage.getItem(AsyncStorageKey.USER_ID),
      AsyncStorage.getItem(AsyncStorageKey.USER_NAME),
      AsyncStorage.getItem(AsyncStorageKey.USER_PHOTO),
    ]).then(results => {
      console.log(`Login state is loaded - ${results[1]}`)
      this.initLoginState(
        {id: results[0], name: results[1], photo: results[2]}
      );
    });
  }

  componentDidMount() {
    this.loadLoginState();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.incrementCount(this.props.count)}
          title="Increase count"
          color="#841584"
        />
        <Button
          onPress={() => this.loadLoginState()}
          title="load login state"
          color="#841584"
        />
        <Text style={styles.textView}>{this.props.count}</Text>
        <Text style={styles.textView}>{this.props.user.getName()}</Text>
      </View>
    );
  }
}
