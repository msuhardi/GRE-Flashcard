
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
} from 'react-native';

// import { StackNavigator } from 'react-navigation';

import App from './app/App';

// const SimpleApp = StackNavigator({
//   Home: { screen: Root },
//   Flashcards: { screen: FlashcardView },
// })

AppRegistry.registerComponent('AwesomeProject', () => App);
