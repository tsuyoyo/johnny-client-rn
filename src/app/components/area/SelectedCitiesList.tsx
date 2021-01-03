import React from 'react';
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { SelectedCitiesListItem } from './SelectedCitiesListItem';
import { default as proto } from "../../proto/johnnyproto";

export interface SelectedCitiesHorizontalListProps {
  cities: proto.ICity[];
  onCityClicked?: (city: proto.ICity) => void;
}

export const SelectedCitiesHorizontalList = (props: SelectedCitiesHorizontalListProps) => {
  return (
    // Memo : Intentionally react-native's View is used here
    // (If I use native-base's View, "VirtualizedList: You have a large list that is slow to update" is warned)
    <View style={{backgroundColor: '#FFF', paddingBottom:8, paddingTop:8}}>
      <FlatList
        data={props.cities}
        keyExtractor={(_city, index) => props.cities[index].id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <SelectedCitiesListItem 
            city={item}
            onClick={props.onCityClicked}/>
        )}
      />
    </View>
  );
}
