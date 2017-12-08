import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper-animated';
import { DoubleBounce } from 'react-native-loader';

import * as Const from '../Constants';

var shuffle = require('shuffle-array');

const TOOLBAR_STYLE = StyleSheet.create({
  container: {
    height: 130,
  },
  leftElementContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  rightElementContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  }
});
const SWIPER_PAGINATION_STYLE = {
  color: 'rgba(255,255,255,.5)',
  fontWeight: 'bold',
  fontSize: 12,
  fontFamily: 'Raleway-Regular',
  textAlign: 'center',
  marginBottom: 10,
};
const EMPTY_ICON = require('../assets/images/empty.png');

export default class FlashcardSwipper extends Component {
  static propTypes = {
     cards: PropTypes.array,
     style: PropTypes.any,
     loading: PropTypes.bool,
   };

   static defaultProps = {
     cards: [],
     style: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      loading: props.loading,
    };

    this.renderSwiper = this.renderSwiper.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  _renderSwiperPagination = (total, currentIndex) => {
    return (
        <Text
          style={SWIPER_PAGINATION_STYLE}>
          {currentIndex + 1} of {total}
        </Text>
    );
  }

  _swipeLeftFn = () => {
    this._forceLeftSwipe();

    var children = this._swiper.props.children;
    var currentIndex = this._swiper.currentIndex[this._swiper.guid];
    var currentCard = this._swiper.props.children[currentIndex];

    shuffle(children);
    var cardA = children[currentIndex];
    var cardAIndex = children.indexOf(currentCard);
    children[currentIndex] = currentCard;
    children[cardAIndex] = cardA;

    this.setState({ cards: children });
  }

  _forceLeftSwipe() {
    this._swiper.cardAnimation = Animated.timing(this._swiper.pan, {
        toValue: { x: -500, y: 0 },
    }).start((status) => {
        this._swiper.resetState();
        if (status.finished) this._swiper.handleDirection(true);

        this._swiper.cardAnimation = null;
    });
    this._swiper.props.onRemoveCard(this._swiper.currentIndex[this._swiper.guid]);
  }

  _swipeRightFn = (cards) => {
    this._swiper.forceRightSwipe();

    var children = this._swiper.props.children;
    var currentIndex = this._swiper.currentIndex[this._swiper.guid];
    var currentCard = this._swiper.props.children[currentIndex];
    var key = currentCard.key;

    var index = cards.indexOf(key);
    if (index >= 0) {
      cards.splice(index, 1);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cards: this.state.cards.concat(nextProps.cards) ,
      loading: nextProps.loading,
    });
  }

  renderSwiper()  {
    if (this.state.cards.length > 0) {
      return (
        <Swiper
            ref={(ref) => this._swiper = ref}
            smoothTransition
            loop
            height={this.state.cards.length > 0 ? 100 : 0}
            swiper={false}
            showPagination={false}
          >
            {this.state.cards}
          </Swiper>
      );
    } else {
      return (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={EMPTY_ICON} style={{width: 150, height: 150}}/>
          <Text
            style={{
              color: 'white',
              letterSpacing: 2,
              fontWeight: 'bold',
              marginTop: 20,
              opacity: .8,
            }}
          >
            NO CARD FOUND
          </Text>
        </View>
      );
    }
  }

  renderLoading() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <DoubleBounce size={20} color="#FFFFFF" />
      </View>
    );
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.state.loading ? this.renderLoading() : this.renderSwiper()}
      </View>
    );
  }
}
