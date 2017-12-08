import { Actions } from 'react-native-router-flux';

import * as Const from '../../Constants';

const _ = require('lodash');

export const updateGroupWordList = ({userId, groupId, previousCards, cards}) => (
  (dispatch, getState) => {
    const previousIds = _.map(_.values(previousCards), (card, i) => {
      return card._id;
    });

    const newIds = _.map(_.values(cards), (card, i) => {
      return card._id;
    });

    const uri = Const.BASE_URI + '/groups/' + groupId + '/words/';
    const keysToAdd = _.difference(newIds, previousIds);
    const keysToRemove = _.difference(previousIds, newIds);

    let promises = [];
    promises = promises.concat(
      _.map(keysToAdd, (key, i) => {
        return fetch(uri + key, {
          method: 'POST'
        });
      })
    );

    promises = promises.concat(
      _.map(keysToRemove, (key, i) => {
        return fetch(uri + key, {
          method: 'DELETE'
        });
      })
    );

    return Promise.all(promises)
      .then(() => dispatch({
        type: 'UPDATE_GROUP_WORD_LIST',
        props: {groupWords: _.clone(_.values(cards))}
      }))
      .catch((error) => console.log(error));
  }
)
