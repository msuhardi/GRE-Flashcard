import React from 'react';
import { StyleSheet } from 'react-native';
import * as Const from '../Constants';

const BASE_FONT_FAMILY = 'Raleway-Light';

const FRONT_WORD_FONT_SIZE = 35;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 480,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      height: 0,
      width: 0
    },
  },
  card: {
    borderWidth: 0,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  frontCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCard: {
    flex: 1,
    flexDirection: 'column'
  },
  frontText: {
    fontSize: FRONT_WORD_FONT_SIZE,
    fontFamily: BASE_FONT_FAMILY,
    fontWeight: 'bold',
    color: Const.BLACK,
  },
  backText: {
    fontSize: 13,
    fontFamily: 'Raleway-Medium',
    margin: 15,
    marginBottom: 50,
    textAlign: 'center'
  },
});
