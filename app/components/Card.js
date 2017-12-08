import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Const from '..//Constants';

const FORGET_ICON = require('../assets/images/thinking.png');
const REMEMBER_ICON = require('../assets/images/happy.png');

export default class Card extends Component {
  static propTypes = {
     id: PropTypes.string,
     frontContent: PropTypes.string,
     backContent: PropTypes.element,
     soundHandler: PropTypes.func,
     leftPressBtnHandler: PropTypes.func,
     rightPressBtnHandler: PropTypes.func,
     style: PropTypes.any,
   };

   static defaultProps = {
     id: '',
     frontContent: '',
     soundHandler: () => {},
     backContent: null,
     leftPressBtnHandler: () => {},
     rightPressBtnHandler: () => {},
     style: {},
  };



  constructor(props) {
    super(props);
  }

  render() {
    var style = this.props.style;

    return (
      <View style={style.container}>
        <FlipCard
          flipHorizontal
          flipVertical={false}
          style={style.card}>

          {/* Face Side */}
          <View style={style.frontCard}>
            <Text style={style.frontText}>{this.props.frontContent}</Text>

            <TouchableOpacity
              onPress={() => this.props.soundHandler(this.props.id)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
              }}>
              <Icon name='md-volume-up'
                color='rgba(0,0,0,.3)'
                size={20}
              />
            </TouchableOpacity>

            <Text style={{position: 'absolute', bottom: 10, fontWeight: 'bold', fontSize: 10, letterSpacing: 2, color: 'rgba(0,0,0,.2)'}}>
              TAP TO SEE MEANING
            </Text>
          </View>

          {/* Back Side */}
          <View style={style.backCard}>

            {/* Contents */}
            <View style={{padding: 20,}}>
              {this.props.backContent}
            </View>

            {/* Buttons */}
            <View style={{flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0,}}>
              <TouchableOpacity
                onPress={() => this.props.rightPressBtnHandler(this.props.id)}
                style={{
                  padding: 20,
                  flex: 1,
                  borderBottomLeftRadius: 3,
                }}>
                <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
                  <Image source={REMEMBER_ICON} style={{width: 50, height: 50}}/>
                  <Text style={{fontSize: 10, marginTop: 10}}>I know it!</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.leftPressBtnHandler(this.props.id)}
                style={{
                  padding: 20,
                  flex: 1,
                  borderBottomRightRadius: 3,
                }}>
                <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
                  <Image source={FORGET_ICON} style={{width: 50, height: 50}}/>
                  <Text style={{fontSize: 10, marginTop: 10}}>I don't remember</Text>
                </View>

              </TouchableOpacity>
            </View>
          </View>

        </FlipCard>
      </View>
    );
  }
}
