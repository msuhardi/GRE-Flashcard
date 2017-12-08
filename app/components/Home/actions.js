import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as Const from '../../Constants';

const _ = require('lodash');

export const fetchGroups = () => (
  (dispatch, getState) => {
    const uri = Const.BASE_URI + '/groups';
    let groups = [];
    return fetch(uri, {method: 'GET'})
      .then((response) => response.json())
      .then(((responseJson) => {
        _.each(responseJson, (group) => {
          groups.push({title: group.name, _id: group._id});
        });

        return Promise.resolve(
          dispatch({
            type: 'FETCH_GROUPS',
            props: {
              groups: groups,
            }
          })
        );
      }).bind(this))
      .catch((error) => {
        console.error(error);
      });
  }
)

export const fetchWordsByGroup = (groupId) => (
  (dispatch, getState) => {
    const uri = Const.BASE_URI + '/groups/' + groupId;
    return fetch(uri , {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        return Promise.resolve(
          dispatch({
            type: 'FETCH_WORDS_BY_GROUP',
            props: {
              groupWords: responseJson,
            },
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
)

export const openGroup = (title, userId, groupId) => {
  Actions.card({
    title,
    userId,
    id: groupId
  });

  return { type: 'OPEN_GROUP', props: { userId, groupId } };
}

export const fetchCompleteWordsList = () => (
  (dispatch, getState) => {
    const uri = Const.BASE_URI + '/words';
    return fetch(uri, {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: 'UPDATE_WORDS_LIST',
          props: {
            completeWordList: _.keyBy(responseJson, 'word')
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
);

export const logout = () => {
  Actions.login();

  return { type: 'LOGOUT' };
};
