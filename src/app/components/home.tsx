import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {HomeProps} from '../containers/home';

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

export function Home(props: HomeProps) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => props.incrementCount(props.count)}
        title="Increase count"
        color="#841584"
      />
      <Text style={styles.textView}>{props.count}</Text>
    </View>
  );
}
