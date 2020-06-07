import React, { useState } from 'react';
import * as SuggestionApi from '../../apis/suggestion';
import * as UserApi from '../../apis/user';
import { StyleSheet, View, } from 'react-native';
import { GetSuggestCityResponse } from '../../proto/suggestService_pb';
import { Input, InputGroup, Button, Text } from 'native-base';
import { City } from '../../proto/area_pb';
import { CityList } from './CityList';
import { SelectedCitiesHorizontalList } from './SelectedCitiesList';
import { StackActions } from 'react-navigation';
import { PutUserCityRequest, GetUserProfileResponse } from '../../proto/userService_pb';
import { User, UserProfile } from '../../proto/user_pb';

export interface AreaSelectionStateProps {
  user: User,
  userProfile: UserProfile,
}

export interface AreaSelectionDispatchProps {
  updateUserProfile(userProfile: UserProfile): void
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
    useState(props.userProfile.getActivecitiesList());

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

  const addCityToSelection = (city: City) => {
    if (!selectedCities.includes(city)) {
      updateSelectedCities([...selectedCities, city]);
    }
  };

  const removeCityFromSelection = (city: City) => {
    updateSelectedCities(selectedCities.filter((c) => c !== city));
  };

  const putUserProfileArea = (): Promise<number> => {
    const request = new PutUserCityRequest();
    request.setCitiesList(selectedCities);
    return UserApi.putUserProfileArea(props.user.getId(), request);
  }

  const fetchUserProfile = (): Promise<void> => {
    return UserApi
      .getUserProfile(props.user.getId())
      .then((res: GetUserProfileResponse) => props.updateUserProfile(res.getUserprofile()));
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
