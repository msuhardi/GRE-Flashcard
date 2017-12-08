import { combineReducers } from 'redux';
import nav, * as fromNav from './navReducer';
import group, * as fromGroup from './groupReducer';
import card, * as fromCard from './cardReducer';
import user, * as fromUser from './userReducer';
import { reducer as formReducer } from 'redux-form';


export default combineReducers({
  nav,
  group,
  card,
  user,
  form: formReducer,
});

export const getNav = ({nav}) => nav;
export const getGroup = ({group}) => group;
export const getCard = ({card}) => card;
export const getUser = ({user}) => user;
