import React from 'react';
import { City } from "../../proto/area_pb";
import { CityListItem } from './CityListItem';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Text } from 'native-base';

export interface CityListProps {
  cities: City[];
  onItemClicked(city: City): void;
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
      keyExtractor={(_city, index) => props.cities[index].getId()}
      renderItem={({item}) => renderCityListItem(item)}
    />
  );
}