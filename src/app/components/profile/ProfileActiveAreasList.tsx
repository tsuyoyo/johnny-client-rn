import React, {  } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SelectedCitiesListItem } from '../area/SelectedCitiesListItem';
import { View, Button, Text, Row } from 'native-base';
import * as proto from "../../proto/johnnyproto";

export interface ActiveAreaProps {
  areas: Array<proto.ICity>
  onEditClicked: () => void
}

export const ProfileActiveAreasList = (props: ActiveAreaProps) => {

  const styles = StyleSheet.create({
    container: {
      // flex:1,
      // flexDirection: 'row',
      flexWrap:'wrap',
      // alignSelf: 'stretch',
      // backgroundColor: '#0F0',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    areaList: {
      flex:1,
      flexDirection: 'row',
      flexWrap:'wrap',
    },
    areaItem: {
      margin: 8,
    },
    editButton: {

    },
    areaTitle: {
      flex: 1,
      fontWeight: 'bold',
    },
  })

  const renderAreaItem = ((c: proto.ICity) => (
    <SelectedCitiesListItem
    city={c}
    onClick={null}
    />
  ));

  const renderAreaList = () => (
    <View style={styles.areaList}>
      { props.areas.map((c: proto.ICity) => renderAreaItem(c)) }
    </View>
  );

  const renderHeader = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.areaTitle}>活動エリア</Text>
      <Button
        transparent
        small
        style={styles.editButton}
        onPress={props.onEditClicked}>
        <Text>変更する</Text>
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderAreaList()}
    </View>
  );
}
