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
  Image,
  AsyncStorage,
  Modal,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper-animated';

import * as Const from '../../Constants';
import styles from '../../stylesheets/main';

import Icon from 'react-native-vector-icons/Ionicons';

const _ = require('lodash');

const MNEMONIC_ICON = require('../../assets/images/mnemonic.png');
const GROUP_ICON = require('../../assets/images/group.png');
const ASSOCIATION_ICON = require('../../assets/images/association.png');

export default class OnboardingScreen extends Component {
  static propTypes = {
    closeHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.renderSlide = this.renderSlide.bind(this);
  }


  renderCloseBtn() {
    return (
      <TouchableOpacity style={{display: 'flex'}} onPress={this.props.closeHandler}>
        <View style={{backgroundColor: Const.RED, height: 60, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'white', letterSpacing: 2, fontWeight: 'bold', fontSize: 12}}>{`LET'S GET STARTED`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderPagination(index, length) {
    return _.map(_.range(length), (i) => {
      return (
        <View
          key={`dot-${i}`}
          style={[styles.dot, { backgroundColor: '#C5C5C5' },
          i == index ? { backgroundColor: '#4D4D4E' } : null]}
        />
      );
    });
  }

  renderSlide(icon, imgWidth, imgHeight, text, index, length) {
    return (
      <Modal>
        <View style={styles.slide}>
          <Text style={styles.slideText}>{ text }</Text>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image source={icon} style={{width: imgWidth, height: imgHeight}}/>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            { this.renderPagination(index, length) }
          </View>
        </View>
        { this.renderCloseBtn() }
      </Modal>
    );
  }

  render() {
    return (
      <Swiper
        index={2}
        showPagination={false}
        loop={false}
      >
        { this.renderSlide(MNEMONIC_ICON, 280, 280, 'Utilize pictures, word play and other mnemonic tools to help you remember', 2, 3) }
        { this.renderSlide(GROUP_ICON, 280, 280, 'Create your own word group', 1, 3) }
        { this.renderSlide(ASSOCIATION_ICON, 280, 280, 'Learn words by association', 0, 3) }
      </Swiper>

    );
  }
}
