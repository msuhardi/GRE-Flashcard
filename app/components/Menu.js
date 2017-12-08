import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  AppRegistry,
  Text,
  StyleSheet,
  ListView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from '../stylesheets/main';
import * as Const from '../Constants';

const PROFILE_ICON = require('../assets/images/logout.png');

export default class Menu extends Component {
  static propTypes = {
    logoutHandler: PropTypes.func,
    user: PropTypes.object,
  };

  static defaultProps = {
    user: {},
  }

  render() {
    const { logoutHandler } = this.props;

    return (
      <View style={[styles.container, {justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            padding: Const.BODY_PADDING}}
        >
          <TouchableOpacity style={{flex: 1}} onPress={logoutHandler}>
            <View style={{flexDirection: 'row'}}>
              <Image source={PROFILE_ICON} style={{width: 20, height: 20, display: 'flex'}}/>
              <Text style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: 2,
                lineHeight: 18,
                display: 'flex',
                marginLeft: Const.BODY_PADDING,
              }}>
                LOGOUT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
