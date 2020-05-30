import React, { useState, useReducer } from 'react';
import * as SuggestionApi from '../../apis/suggestion';
import { StyleSheet, View, Text, TextInput, } from 'react-native';
// import { ListItem, } from 'native-base';
import { GetSuggestCityResponse } from '../../proto/suggestService_pb';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import Ripple from 'react-native-material-ripple';

export interface AreaSelectionStateProps {
}

export interface AreaSelectionDispatchProps {
}

export interface AreaSelectionProps extends AreaSelectionStateProps, AreaSelectionDispatchProps {
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    fontSize: 24,
  },
  textView: {
    fontSize: 32,
  },
});

const cityOptionStyles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingEnd: 16,
  },
});

export const AreaSelectionScreenComponent = () => {
  const [cities, setSuggestedCities] = useState([]);

  const fetchSuggestedCities = async (zipCode: string) => {
    if (zipCode.length == 0) {
      setSuggestedCities([]);
    } else {
      SuggestionApi
        .getSuggestedCities(zipCode)
        .then((response: GetSuggestCityResponse) => {
          setSuggestedCities(response.getCitiesList());
        })
        .catch((e) => console.log(`Suggestion error - ${e.message}`));
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Input zip code'}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={fetchSuggestedCities}
        keyboardType={'numeric'}
        maxLength={7}
      />
      <SafeAreaView>
        <FlatList
          data={cities}
          keyExtractor={city => city.id}
          renderItem={({item}) =>
              <Ripple style={cityOptionStyles.container}>
                <Text>{item.getName()}</Text>
              </Ripple>
          }/>
      </SafeAreaView>
      {/* <Text>Len of cities = {cities.length}</Text> */}

    </View>
  );
}
