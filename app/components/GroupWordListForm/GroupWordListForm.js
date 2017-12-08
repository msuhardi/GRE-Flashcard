import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AppRegistry,
  Button,
  ListView,
  Image
} from 'react-native';
import {
  Button as LoadingButton
} from 'react-native-clean-form';
import { StackNavigator } from 'react-navigation';
import Modal from 'react-native-modal';
import Autocomplete from 'react-native-autocomplete-input';

import * as Const from '../../Constants';

import styles from '../../stylesheets/main';
import theme from '../../stylesheets/FormTheme';

import Icon from 'react-native-vector-icons/Ionicons';

const _ = require('lodash');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const USER_ID = '595b15ad6ca2920020af39b1';
const SUCCESS_ICON = require('../../assets/images/like.png');

export default class GroupWordListForm extends Component {
  static propTypes = {
     groupWords: PropTypes.array,
     completeWordList: PropTypes.object,
     groupId: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const cards = _.keyBy(props.groupWords, (word) => word.word);

    this.state = {
      query: '',
      previousCards: _.cloneDeep(cards),
      completeWordList: props.completeWordList,
      cards: cards,
      autocompleteFocus: false,
      updateGroup: false,
      submitted: false,
    }

    this.findWord = this.findWord.bind(this);
    this.renderAddWordInput = this.renderAddWordInput.bind(this);
    this.renderAutocompleteItem = this.renderAutocompleteItem.bind(this);
    this.handleItemOnPress = this.handleItemOnPress.bind(this);
    this.updateGroupWords = this.updateGroupWords.bind(this);
  }

  findWord(query) {
    if (query === '') {
      return [];
    }

    const { completeWordList } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return _.values(completeWordList).filter(word => word.human_name.search(regex) >= 0);
  }

  handleItemOnPress(props) {
    const { human_name, word, ...attr } = props;
    const cards = this.state.cards;
    cards[word] = {
      human_name: human_name,
      word: word,
      added_date: Date.now(),
      ...attr
    };

    this.setState({
      query: '',
      cards: cards
    })
  }

  renderAutocompleteItem(props) {
    const { human_name } = props;

    return (
      <TouchableOpacity
        onPress={() => this.handleItemOnPress(props)}
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: Const.BODY_PADDING,
        }}
      >
        <Text>
          {human_name}
        </Text>
      </TouchableOpacity>
    );
  }

  renderAddWordInput() {
    const { query } = this.state;
    const words = this.findWord(query);
    const comp = (a, b) => (a.toLowerCase().trim() === b.toLowerCase().trim());

    const inputContainerStyle = {
      borderColor: `${this.state.autocompleteFocus ? Const.BLUE : '#EBEBEB'}`,
      borderRadius: 3,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      height: 40,
      display: 'flex',
    }

    return (
      <View style={{display: 'flex', flexDirection: 'column', marginBottom: 50, zIndex: 999}}>
        <Text style={{
          color: '#6F7692',
          padding: 5,
          paddingLeft: 25,
          letterSpacing: .5,
          fontWeight: 'bold',
          fontSize: 10,
        }}>WORDS IN GROUP</Text>
        <Autocomplete
            autoCorrect={false}
            inputContainerStyle={inputContainerStyle}
            containerStyle={{margin: Const.BODY_PADDING, marginTop: 0, marginBottom: 0}}
            data={words.length === 1 && comp(query, words[0].human_name) ? [] : words}
            defaultValue={query}
            onChangeText={text => this.setState({ query: text })}
            placeholder="Add word to the group"
            listStyle={{
              borderWidth: 0.5,
              zIndex: 999,
            }}
            style={{fontSize: 12, display: 'flex', flex: 1, height: 30,}}
            renderTextInput={(props) => <TextInput {...props}
              onFocus={() => this.setState({ autocompleteFocus: true})}
              onBlur={() => this.setState({ autocompleteFocus: false})}
            />}
            renderItem={this.renderAutocompleteItem}
          />
      </View>
    );
  }

  updateGroupWords() {
    const { previousCards, cards } = this.state;
    const { updateGroupWordList } = this.props;

    updateGroupWordList({
      userId: USER_ID,
      groupId: this.props.groupId,
      previousCards: previousCards,
      cards: cards
    })
    .then(this.setState({ submitted: true, updateGroup: false }));
  }

  render() {
    if (this.state.submitted) {
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image source={SUCCESS_ICON} style={{width: 150, height: 150}}/>
          <Text style={{
            marginTop: 20,
            color: Const.GREY,
            fontFamily: Const.BASE_FONT_FAMILY,
            fontSize: 12,
            fontWeight: 'bold',
            letterSpacing: .8,}}
          >
            GROUP UPDATED!
          </Text>
        </View>
      )
    } else {
      const dataSource = ds.cloneWithRows(_.values(this.state.cards));
      const disabled = _.isEqual(_.keys(this.state.cards), _.keys(this.state.previousCards));
      const buttonTheme = theme;
      buttonTheme.Button.backgroundColor = disabled ? Const.GREY : Const.BLUE;

      return (
        <View style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          {this.renderAddWordInput()}
          <ListView
            dataSource={dataSource}
            contentContainerStyle={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingLeft: Const.BODY_PADDING,
              paddingRight: Const.BODY_PADDING,
            }}
            renderRow={(row) => (
              <View style={styles.pill}>
                <Text style={{
                    color: 'white',
                    fontSize: 12,
                    marginRight: 20,
                  }}>
                  {row.human_name}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    const { cards } = this.state;
                    delete cards[row.word];

                    this.setState({
                      cards: cards,
                    });
                  }}
                >
                  <Icon name='md-close'
                    color='white'
                    size={12}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <View
            style={{
              backgroundColor: disabled ? Const.GREY : Const.BLUE,
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
              padding: 5,
              height: 45,
            }}
          >
            <LoadingButton
              theme={theme}
              iconPlacement="right"
              onPress={() => {
                if (!disabled) {
                  this.setState({
                    updateGroup: true,
                  }, () => this.updateGroupWords());
                }
              }}
              submitting={this.state.updateGroup}
            >
              UPDATE GROUP
            </LoadingButton>
          </View>
        </View>
      );
    }
  }
}
