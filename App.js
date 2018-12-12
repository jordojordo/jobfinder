import Expo from 'expo';
import React from 'react';
import { Text, View, YellowBox } from 'react-native';
import { 
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from 'react-navigation';
import { Provider} from 'react-redux';
import { Icon } from 'react-native-elements';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

YellowBox.ignoreWarnings(['Require cycle:']);

export default class App extends React.Component {
  render() {
    const MainNavigator = createAppContainer( 
      // These navigators automatically send a 'navigation' prop to each one of these screens
      createBottomTabNavigator({
        welcome: {
          screen: WelcomeScreen,
          navigationOptions: { tabBarVisible: false }
        },
        auth: {
          screen: AuthScreen,
          navigationOptions: { tabBarVisible: false }
        },
        main: {
          navigationOptions: { tabBarVisible: false },
          tabBarPosition: 'bottom',
          tabBarOptions: {
            showIcon: true,
            labelStyle: { fontSize: 12 }
          },
          screen: createBottomTabNavigator({
            map: MapScreen,
            deck: DeckScreen,
            review: {
              navigationOptions: {
                title: 'Review Jobs',
                tabBarIcon: ({ tintColor }) => {
                  return <Icon name="favorite" size={30} color={tintColor} />;
                }
              },
              screen: createStackNavigator({
                review: ReviewScreen,
                settings: SettingsScreen
              })
            }
          })
        }
      })
    );

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
