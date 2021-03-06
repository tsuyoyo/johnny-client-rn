import * as React from 'react';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers/index';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeContainer from './containers/home';
import LoginContainer from './containers/login';
import MyProfileContainer from './containers/myProfile';
import AreaSelectionContainer from './containers/selectArea';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

// NOTE:
// Parameters can be passed at navigating https://reactnavigation.org/docs/en/params.html
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('HomeRedux')}
        />
        <Button
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        <Button
          title="Go to profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Button
          title="Go to area selection"
          onPress={() => this.props.navigation.navigate('AreaSelection')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,

    // NOTE :
    // When component has redux, Container should be specified here.
    HomeRedux: HomeContainer,
    Login: LoginContainer,
    Profile: MyProfileContainer,
    AreaSelection: AreaSelectionContainer,
  },
  {
    initialRouteName: 'Home',
  }
);

let Navigation = createAppContainer(AppNavigator);

const middlewares = [thunk];

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(...middlewares)
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
