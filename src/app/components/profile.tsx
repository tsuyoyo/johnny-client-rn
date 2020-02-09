import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container} from 'native-base';

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

export function Profile() {
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.textView}>This is profile page.</Text>
      </View>
    </Container>
  );
}
