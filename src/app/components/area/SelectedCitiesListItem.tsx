import React from 'react'
import { Text, Button} from 'native-base'
import { StyleSheet } from 'react-native'
import * as proto from "../../proto/johnnyproto";

export interface SelectedCitiesListItemProps {
  city: proto.ICity;
  onClick?: (city: proto.ICity) => void;
}

const styles = StyleSheet.create({
  container: {
    marginRight:4,
    marginLeft:4,
    marginTop: 2,
    marginBottom: 2,
  },
  textView: {
    color: '#000000',
  },
});

export const SelectedCitiesListItem = (props: SelectedCitiesListItemProps) => {
  return (
    <Button
      bordered
      rounded
      small
      style={styles.container}
      onPress={() => {
        if (props.onClick) {
          props.onClick(props.city);
        }
      }}>
      <Text style={styles.textView}>{props.city.name}</Text>
    </Button>
  );
}
