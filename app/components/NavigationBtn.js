import React, {
  Component,
} from 'react';
import {
  Image,
  TouchableOpacity,
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import * as Const from '../Constants';

import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBtn extends Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <Icon name="ios-arrow-back" color='white' size={22} style={{marginLeft: Const.BODY_PADDING}}/>
      </TouchableOpacity>
    );
  }
}
