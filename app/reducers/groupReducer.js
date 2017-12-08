import { ActionConst } from 'react-native-router-flux';

const _ = require('lodash');

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, {type, props})=> {
  switch(type) {
    case 'OPEN_GROUP':
      return {
        ...state,
        groupId: props.groupId,
        userId: props.userId,
      }
    case 'FETCH_GROUPS':
      return {
          ...state,
          groups: props.groups,
      }
    case 'FETCH_WORDS_BY_GROUP':
      return {
        ...state,
        groupWords: props.groupWords,
      }
    case 'UPDATE_GROUP_WORD_LIST':
      return {
        ...state,
        groupWords: props.groupWords,
      };
    default:
      return state;
  }
};
