import React from 'react'
import { Text, Button} from 'native-base'
import { StyleSheet } from 'react-native'
import { City } from '../../proto/area_pb'

export interface SelectedCitiesListItemProps {
  city: City;
  onClick?: (city: City) => void;
}

const styles = StyleSheet.create({
  container: {
    marginRight:4,
    marginLeft:4,
  },
  textView: {
    fontSize: 32,
  },
});

export const SelectedCitiesListItem = (props: SelectedCitiesListItemProps) => {
  return (
    <Button rounded
      style={styles.container}
      onPress={() => {
        if (props.onClick) {
          props.onClick(props.city);
        }
      }}>
      <Text>{props.city.getName()}</Text>
    </Button>
  );
}
