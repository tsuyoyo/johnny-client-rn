import React from 'react';
import { ListItem, Text } from 'native-base';
import { default as proto } from "../../proto/johnnyproto";

export interface CityListItemProps {
  city: proto.ICity;
  onItemClicked(city: proto.ICity): void;
}

export const CityListItem = (props: CityListItemProps) => {
  return(
    <ListItem onPress={() => props.onItemClicked(props.city)}>
      <Text>{props.city.name}</Text>
    </ListItem>
  );
}