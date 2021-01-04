import React, { useState } from 'react';
import * as SuggestionApi from '../../apis/suggestion';
import * as UserApi from '../../apis/user';
import { StyleSheet, View, } from 'react-native';
import { Input, InputGroup, Button, Text } from 'native-base';
import { CityList } from './CityList';
import { SelectedCitiesHorizontalList } from './SelectedCitiesList';
import { StackActions } from 'react-navigation';
import { default as proto } from "../../proto/johnnyproto";

export interface AreaSelectionStateProps {
  user: proto.IUser,
  userProfile: proto.IUserProfile,
}

export interface AreaSelectionDispatchProps {
  updateUserProfile(userProfile: proto.IUserProfile): void
}

export interface AreaSelectionProps extends AreaSelectionStateProps, AreaSelectionDispatchProps {
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 1,
  },
  textView: {
    fontSize: 32,
  },
  saveButton: {
  },
});

export const AreaSelectionScreenComponent = (props: AreaSelectionProps) => {

  const [cities, setSuggestedCities] = useState([]);

  const [selectedCities, updateSelectedCities] =
    useState(props.userProfile.activeCities);

  const fetchSuggestedCities = async (zipCode: string) => {
    if (zipCode.length == 0) {
      setSuggestedCities([]);
    } else {
      SuggestionApi
        .getSuggestedCities(zipCode)
        .then((response: proto.GetSuggestCityResponse) => {
          setSuggestedCities(response.cities);
        })
        .catch((e) => console.log(`Suggestion error - ${e.message}`));
    }
  }

  const addCityToSelection = (city: proto.ICity) => {
    if (!selectedCities.includes(city)) {
      updateSelectedCities([...selectedCities, city]);
    }
  };

  const removeCityFromSelection = (city: proto.ICity) => {
    updateSelectedCities(selectedCities.filter((c) => c !== city));
  };

  const putUserProfileArea = (): Promise<number> => {
    const request = new proto.PutUserCityRequest({
      cities: selectedCities,
    });
    return UserApi.putUserProfileArea(props.user.id, request);
  }

  const fetchUserProfile = (): Promise<void> => {
    return UserApi
      .getUserProfile(props.user.id)
      .then((res: proto.GetUserProfileResponse) => props.updateUserProfile(res.userProfile));
  }

  const onSaveButtonClicked = (): void => {
    if (props.user) {
      putUserProfileArea()
        .then(() => fetchUserProfile())
        .then(() => props.navigation.goBack())
        .catch((e) => alert(e.message));
    } else {
      alert("Loginしてません");
    }
  };

  const renderSaveButton = () => {
    if (selectedCities.length != 0) {
      return (
        <Button
          style={styles.saveButton}
          onPress={onSaveButtonClicked}>
          <Text>Update</Text>
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <InputGroup
        style={styles.textInput}
        borderType="regular"
        >
        <Input
          placeholder={'Input zip code'}
          onChangeText={fetchSuggestedCities}
          keyboardType={'numeric'}
          maxLength={7}
        />
      </InputGroup>
      <CityList
        cities={cities}
        onItemClicked={addCityToSelection} />
      <SelectedCitiesHorizontalList
        cities={selectedCities}
        onCityClicked={removeCityFromSelection} />
      {renderSaveButton()}
    </View>
  );
}
