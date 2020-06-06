import React, { useEffect, useState } from 'react';
import { ListView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { City } from '../proto/area_pb';

export interface ActiveAreaProps {
  areas: Array<City>
}

export const ActiveArea = (props: ActiveAreaProps) => {

  const renderItem = (rowData) => {
    if (rowData.item instanceof City) {
      return (<Text>{(rowData.item as City).getName()}</Text>);
    } else {
      return (<Text>Active areaを追加する</Text>);
    }
  };

  const getDataSource = (areas) => {
    const data = areas.slice();
    data.push({});
    return data;
  }

  return (
    <FlatList
        data={getDataSource(props.areas)}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
  );
}