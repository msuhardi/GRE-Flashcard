import { ActionConst } from 'react-native-router-flux';

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, {type, props})=> {
  switch(type) {
    case 'LOGIN':
      return {
        ...state,
        userId: props.userId,
        firstName: props.firstName,
        lastName: props.lastName,
        signup: props.signup,
      };
    case 'LOGOUT':
      return {
        ...state,
        userId: null,
      }
    case 'FETCH_USER_PROGRESS':
      return {
        ...state,
        userProgress: props.userProgress,
        lastStudiedDate: props.lastStudiedDate,
      };
    default:
      return state;
  }
};
