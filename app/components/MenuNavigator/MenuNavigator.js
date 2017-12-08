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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Const from '../../Constants';

export default class MenuNavigator extends Component {
  static propTypes = {
     isOpen: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this._onPressButton = this._onPressButton.bind(this);
  }

  _onPressButton() {
    const { openNav, closeNav, isOpen } = this.props;

    if(isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPressButton}>
        <View>
          <Icon name='md-list' color='white' size={22} style={{marginLeft: Const.BODY_PADDING}} />
        </View>
      </TouchableOpacity>
    );
  }
}
