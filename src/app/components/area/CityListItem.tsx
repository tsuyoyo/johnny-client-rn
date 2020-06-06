import React from 'react';
import { City } from "../../proto/area_pb";
import { ListItem, Text } from 'native-base';

export interface CityListItemProps {
  city: City;
  onItemClicked(city: City): void;
}

export const CityListItem = (props: CityListItemProps) => {
  return(
    <ListItem onPress={() => props.onItemClicked(props.city)}>
      <Text>{props.city.getName()}</Text>
    </ListItem>
  );
}