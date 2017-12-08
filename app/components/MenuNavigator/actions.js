import { Actions } from 'react-native-router-flux';

import * as Const from '../../Constants';

const _ = require('lodash');

export const openNav = () => {
  return { type: 'OPEN_NAV' };
}

export const closeNav = () => {
  return { type: 'CLOSE_NAV' };
}
