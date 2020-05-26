import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export interface AreaSelectionStateProps {
}

export interface AreaSelectionDispatchProps {
}

export interface AreaSelectionProps extends AreaSelectionStateProps, AreaSelectionDispatchProps {
}

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

export const AreaSelectionScreenComponent = () => {
  return(
    <View style={styles.container}>
      <Text>aaaaaaaaaaaaaaaaaaaa</Text>
    </View>
  );
}