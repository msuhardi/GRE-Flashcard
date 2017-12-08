import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
} from 'react-native';
import {
  ReactNativeAudioStreaming
} from 'react-native-audio-streaming';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import BackBtn from '../NavigationBtn';
import ShowModalBtn from '../ShowModalBtn';
import Swiper from '../FlashcardSwiper';
import Card from '../Card';

import styles from '../../stylesheets/main';
import flipCardStyles from '../../stylesheets/flipCard';

import * as Const from '../../Constants';

const _ = require('lodash');

const APP_ID = 'd18027bf';
const APP_KEY = '94848f3fedcbc9f6094dee6088258302';
const DICT_BASE_URL = 'https://od-api.oxforddictionaries.com/api/v1';
const BASE_URI = Const.BASE_URI;

const MAX_NUM = 5;

class Flashcard extends Component {
  static propTypes = {
    groupWords: PropTypes.array,
    completeWordList: PropTypes.object,
    id: PropTypes.string,
    userId: PropTypes.string,
  };

  static defaultProps = {
    groupWords: [],
  }

  constructor(props) {
    super(props);

    const cards = _.keyBy(props.groupWords, (word) => word.word);
    this.state = {
      progress: 0,
      progressColour: Const.YELLOW,
      completeWordList: props.completeWordList,
      cards: cards,
      queueCards: _.keys(cards),
      loading: true,
      userProgress: {},
      lastStudiedDate: null,
    };

    this.fetchUserProgress = this.fetchUserProgress.bind(this);
    this.setUserProgress = this.setUserProgress.bind(this);
    this.updateUserProgress = this.updateUserProgress.bind(this);
  }

  componentWillMount() {
    const { cards } = this.state;

    this.fetchUserProgress()
      .then((value) => {
        this.setUserProgress(cards, value.userProgress, value.lastStudiedDate);
      });
  }

  componentWillReceiveProps(nextProps) {
    const { groupWords } = nextProps;
    const { userProgress, lastStudiedDate } = this.state;

    const newCards = _.keyBy(groupWords, (word) => word.word);

    this.setUserProgress(newCards, userProgress, lastStudiedDate);
  }


  setUserProgress(cards, userProgress, lastStudiedDate) {
    // Ignore words that are not on the group words list
    let updatedUserProgress = _.pick(userProgress, _.keys(cards));
    // Adding new added words to user progress
    _.each(_.values(cards), (card) => {
      if (!lastStudiedDate || ((new Date(card.added_date)) > (new Date(lastStudiedDate)))) {
        updatedUserProgress[card.word] = 0;
      }
    });
    let progress = this._calculateProgress(cards, updatedUserProgress);

    this.setState({
      loading: false,
      cards: cards,
      queueCard: _.keys(cards),
      userProgress: updatedUserProgress,
      progress: progress,
      progressColour: (progress == 1 ? Const.GREEN : Const.YELLOW),
      lastStudiedDate: lastStudiedDate,
    })
  }

  fetchUserProgress() {
    const { userId, id } = this.props;
    const { cards } = this.state;

    let uri = Const.BASE_URI + '/users/' + userId + '/progress/' + id;
    return fetch(uri , {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        if (_.isEmpty(responseJson)) {
          return fetch(uri, {method: 'POST'})
            .then(() => {
              return Promise.resolve({
                userProgress: _.zipObject(_.keys(cards), _.fill(Array(_.keys(cards).length), 0)),
                lastStudiedDate: null,
              });
            });
        } else {
          const words = responseJson[0].words || [];

          return Promise.resolve({
            userProgress: _.zipObject(
              _.map(words, (word) => word.word),
              _.fill(Array(words.length), 0)
            ),
            lastStudiedDate: responseJson[0].last_studied_date,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updateUserProgress() {
    const { userId, id } = this.props;
    const { userProgress, cards } = this.state;

    const words = _.map(_.keys(userProgress), (word) => {
      return cards[word]._id;
    });

    const uri = Const.BASE_URI + '/users/' + userId + '/progress/' + id;
    fetch(uri, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"words": words}),
    });
  }

  componentWillUnmount() {
    this.updateUserProgress();
  }

  _getAudioPronounciation(word) {
    var uri = DICT_BASE_URL + '/entries/en/' + word  + '/pronunciations';
    var fetchParams = {
      method: 'GET',
      headers: {
        'app_id': APP_ID,
        'app_key': APP_KEY,
      }
    }

    fetch(uri, fetchParams)
      .then((response) => response.json())
      .then((responseJson) => {
        const pronounciations = responseJson.results[0].lexicalEntries[0].pronunciations;

        return _.find(pronounciations, 'audioFile').audioFile;
      })
      .then((uri) => {
        ReactNativeAudioStreaming.play(uri, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderMnemonic(mnemonic) {
    switch(mnemonic.type) {
      case Const.IMAGE: {
        return (
          <Image
            key={'mnemonic'}
            source={{uri: mnemonic.uri}}
            indicator={ProgressBar}
            style={{width: '100%', height: 150}}
          />
        );
      }
      case Const.TEXT: {
        return (
          <Text
            key={'mnemonic'}
            style={[flipCardStyles.backText, styles.mnemonicText]}>
            {mnemonic.text}
          </Text>
        );
      }
      case Const.WORD_PLAY: {
        var words = _.map(mnemonic.words, (word, i) => {
          return (
            <Text
              key={word}
              style={[styles.mnemonicWords]}
            >
              {word}
            </Text>
          );
        })

        return (
          <View key={'mnemonic'} style={{display: 'flex', alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>{words}</View>
            <Text style={[styles.mnemonicText, {textDecorationLine: 'none'}]}>{mnemonic.meaning}</Text>
          </View>
        )
      }
      default: {
        return null;
      }
    }
  };

  renderBackContent(value) {
    return (
      <View>
        <Text style={flipCardStyles.backText}>{value.meaning}</Text>
        <View>
          <Text style={{
              fontSize: 8,
              fontFamily: 'Raleway-Bold',
              color: '#5d5d5d',
              letterSpacing: 1,
              textAlign: 'center',
            }}
          >
            EXAMPLE
          </Text>
          <Text style={[flipCardStyles.backText, styles.exampleText]}>
            {value.example}
          </Text>
        </View>
        {value.mnemonic && this._renderMnemonic(value.mnemonic)}
      </View>
    )
  }

  _renderCards(cards) {
    return(
      _.map(_.keys(cards), (word) => {
        var key = word;
        var value = cards[key];

        return(
          <Card
            key={key}
            id={key}
            frontContent={value.human_name}
            backContent={this.renderBackContent(value)}
            soundHandler={this._getAudioPronounciation}
            style={flipCardStyles}
            leftPressBtnHandler={this._swipeCardLeft.bind(this)}
            rightPressBtnHandler={this._swipeCardRight.bind(this)}
         />
       );
      })
    );
  }

  _swipeCardLeft(id) {
    this._swiper._swipeLeftFn();

    var userProgress = this.state.userProgress;
    userProgress[id] = 0;
    var progress = this._calculateProgress(this.state.cards, userProgress);

    this.setState({
      userProgress: userProgress,
      progress: progress,
      progressColour: (progress == 1 ? Const.GREEN : Const.YELLOW)
    });
  }

  _swipeCardRight(id) {
    this._swiper._swipeRightFn(this.state.queueCards);

    var userProgress = this.state.userProgress;
    if (id in userProgress) {
      userProgress[id] += 1;
      if (userProgress[id] == MAX_NUM) {
        delete userProgress[id];
      }
    }
    var progress = this._calculateProgress(this.state.cards, userProgress);


    this.setState({
      userProgress: userProgress,
      progress: progress,
      progressColour: (progress == 1 ? Const.GREEN : Const.YELLOW)
    });
  }

  _calculateProgress(cards, userProgress) {
    if (_.keys(cards).length == 0) {
      return 1;
    }

    return ((_.keys(cards).length - _.keys(userProgress).length) / parseFloat(_.keys(cards).length));
  }

  render() {
    var cards = this.state.cards;
    var cardKeys = _.keys(cards);
    var currentIndex = cardKeys.length - _.keys(this.state.userProgress).length;

    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Swiper
            ref={(ref) => this._swiper = ref}
            style={styles.swipperWrapper}
            cards={this._renderCards(cards)}
            loading={this.state.loading}
          />
        </View>

        { !this.state.loading && _.keys(cards).length > 0 &&
          (<View>
              <Text style={styles.paginationText}>
                {currentIndex} / {cardKeys.length}
              </Text>
              <ProgressBar
                progress={parseFloat(this.state.progress)}
                width={Const.WINDOW_WIDTH}
                height={10}
                borderRadius={0}
                color={this.state.progressColour}
                borderWidth={0}/>
            </View>)
        }
      </View>
   );
  }
}

export default Flashcard;
