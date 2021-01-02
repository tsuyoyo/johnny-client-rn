import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import * as AsyncStorageKey from '../consts/asyncStorageKey';
import AsyncStorage from '@react-native-community/async-storage';
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

export interface HomeStateProps {
  count: number,
  user: proto.IUser,
  token: string
}

export interface HomeDispatchProps {
  incrementCount(count: number): void;
  resetCount(): void;
  initLoginState(user: proto.IUser): void;
}

export interface HomeProps extends HomeStateProps, HomeDispatchProps {}

export class HomeComponent extends React.Component<HomeProps> {

  private initLoginState({id, name, photo}): void {
    this.props.initLoginState(
      new proto.User({
        id,
        name,
        photo,
      })
    );
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
        <Text style={styles.textView}>{this.props.user.id}</Text>
      </View>
    );
  }
}
