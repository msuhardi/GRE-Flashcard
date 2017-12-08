import { Actions } from 'react-native-router-flux';

import * as Const from '../../Constants';

const _ = require('lodash');

export const addNewWord = ({ newWord }) => {
  return { type: 'UPDATE_WORDS_LIST', props: { newWord }};
};
