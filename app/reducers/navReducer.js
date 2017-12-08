import { ActionConst } from 'react-native-router-flux';

const DEFAULT_STATE = {scene: {}};

export default (state = DEFAULT_STATE, {type, scene})=> {
  switch(type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene,
      };
    case 'LOGIN':
      return {
        ...state,
        isOpen: false,
      }
    case 'OPEN_NAV':
      return {
        ...state,
        scene,
        isOpen: true,
      }
    case 'CLOSE_NAV':
      return {
        ...state,
        scene,
        isOpen: false,
      }
    default:
      return state;
  }
};
