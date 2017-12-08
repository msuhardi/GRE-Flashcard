import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AppRegistry,
  KeyboardAvoidingView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Modal from 'react-native-modal';

import * as Const from '../Constants';

import styles from '../stylesheets/main';

import Icon from 'react-native-vector-icons/Ionicons';

export default class ShowModalBtn extends Component {
  static propTypes = {
     iconName: PropTypes.string,
     modalContent: PropTypes.element,
   };

  static defaultProps = {
     iconName: 'md-add',
     modalContent: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({isModalVisible: true})}>
          <View>
              <Icon name={this.props.iconName} color='white' size={20} style={{marginRight: Const.BODY_PADDING}} />
          </View>
        </TouchableOpacity>
        <Modal isVisible={this.state.isModalVisible}>
            <View style={styles.modal}>
              <View style={{alignSelf: 'flex-end', margin: 15}}>
                <View>
                  <TouchableOpacity onPress={() => this.setState({isModalVisible: false})}>
                    <Icon name='md-close' color={Const.GREY} size={15} />
                  </TouchableOpacity>
                </View>
              </View>
              <KeyboardAvoidingView
                style={{flex: 1, flexDirection: 'row'}}
                behavior="padding"
              >
                {this.props.modalContent}
              </KeyboardAvoidingView>
            </View>
        </Modal>
      </View>
    );
  }
}
