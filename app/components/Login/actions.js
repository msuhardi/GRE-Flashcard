import { Actions } from 'react-native-router-flux';

import * as Const from '../../Constants';

const _ = require('lodash');

export const login = ({userId, firstName, lastName}) => {
  Actions.home({
    userId,
    firstName,
    lastName,
  });

  return { type: 'LOGIN', props: { userId, firstName, lastName}};
};
