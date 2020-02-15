import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

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
  count: number
}

export interface HomeDispatchProps {
  incrementCount(count: number): void;
  resetCount(): void;
}

export interface HomeProps extends HomeStateProps, HomeDispatchProps {}

// メモ : React.Componentの型param -->
// 1st:this.propsの型 (app全体で共有する状態)
// 2nd:this.stateの型 (this.stateはこのcomponent localのもの)
// stateが変更されると (setStateで変更する) renderが走るらしい https://qiita.com/sekikawa_a/items/8ab70f457ef73871419f
export class HomeComponent extends React.Component<HomeProps> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.incrementCount(this.props.count)}
          title="Increase count"
          color="#841584"
        />
        <Text style={styles.textView}>{this.props.count}</Text>
      </View>
    );
  }
}
