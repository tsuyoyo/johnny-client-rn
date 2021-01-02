import React from 'react';
import { CityListItem } from './CityListItem';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Text } from 'native-base';
import * as proto from "../../proto/johnnyproto";

export interface CityListProps {
  cities: proto.ICity[];
  onItemClicked(city: proto.ICity): void;
}

export const CityList = (props: CityListProps) => {

  const renderCityListItem = (city) => (
    <CityListItem
      city={city}
      onItemClicked={props.onItemClicked}
    />
  );

  return(
    <FlatList
      data={props.cities}
      keyExtractor={(_city, index) => props.cities[index].id}
      renderItem={({item}) => renderCityListItem(item)}
    />
  );
}