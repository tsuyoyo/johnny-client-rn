import React, { useEffect, useState } from 'react';
import { Area } from "../proto/area_pb";
import { ListView, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export interface ActiveAreaProps {
  areas: Array<Area>
}

export const ActiveArea = (props: ActiveAreaProps) => {

  const renderItem = (rowData) => {
    if (rowData.item instanceof Area) {
      return (<Text>{(rowData.item as Area).getName()}</Text>);
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