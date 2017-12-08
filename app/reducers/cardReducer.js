import { ActionConst } from 'react-native-router-flux';

const DEFAULT_STATE = {completeWordList: []};

export default (state = DEFAULT_STATE, {type, props})=> {
  switch(type) {
    case 'UPDATE_WORDS_LIST':
      completeWordList = {
        ...state.completeWordList,
        ...props.completeWordList,
      }
      
      if (props.newWord) {
        completeWordList[props.newWord.word] = props.newWord;
      }

      return {
        ...state,
        completeWordList,
      };
    default:
      return state;
  }
};
