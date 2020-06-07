import React, {  } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { City } from '../../proto/area_pb';
import { SelectedCitiesListItem } from '../area/SelectedCitiesListItem';
import { View, Button, Text, Row } from 'native-base';

export interface ActiveAreaProps {
  areas: Array<City>
  onEditClicked: () => void
}

export const ProfileActiveAreasList = (props: ActiveAreaProps) => {

  const renderArea = (city: City) => (
    <SelectedCitiesListItem
      city={city}
      onClick={() => console.log(`On area tapped - ${city.getName()}`)} />
  );

  const styles = StyleSheet.create({
    container: {
      // flex:1,
      flexDirection: 'row',
      // flexWrap:'wrap',
      // alignSelf: 'stretch',
      // backgroundColor: '#0F0',
      // alignItems: 'flex-start',
      // justifyContent: 'space-around',
    },
    areaList: {
      // alignSelf: 'stretch',
      // alignItems: 'stretch',
      // flex:1,
      // width:200,
      // backgroundColor: '#00F',
    },
    editButton: {
      marginStart: 12,
      // flex:1,
      // width:100,
    }
  })

  // {
  //   props.areas.forEach((c: City) => {
  //     (
  //       <SelectedCitiesListItem
  //         city={c}
  //         onClick={null}
  //         />
  //     )
  //   })
  // }

  return (
    <View style={styles.container}>
      <FlatList
          style={styles.areaList}
          data={props.areas}
          horizontal
          renderItem={({item}) => renderArea(item)}
          keyExtractor={(_, index) => index.toString()}
        />
      <Button
        style={styles.editButton}
        onPress={props.onEditClicked}
      >
         <Text>Edit area</Text>
      </Button>
    </View>
  );
}