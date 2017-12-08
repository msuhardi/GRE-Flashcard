import React from 'react';
import { StyleSheet } from 'react-native';
import * as Const from '../Constants';

const PAGINATION_FONT_SIZE = 10;

const CARD_SWIPER_WIDTH = 330;
const CARD_SWIPER_HEIGHT = 500;

const BODY_PADDING = Const.BODY_PADDING;

export default StyleSheet.create({
  container: {
    backgroundColor: Const.RED,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  swipperWrapper: {
    width: CARD_SWIPER_WIDTH,
    height: CARD_SWIPER_HEIGHT,
    flexDirection: 'row',
  },
  exampleText: {
    fontFamily: 'Raleway-Light',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 11,
  },
  mnemonicText: {
    fontFamily:'Raleway-Light',
    fontSize: 12,
    marginTop: 11,
    textAlign: 'center',
  },
  mnemonicWords: {
    fontFamily: 'Raleway-Bold',
    letterSpacing: .5,
    marginRight: 5,
    fontSize: 25,
    color: '#bdbdbd',
    textAlign: 'center',
  },
  groupWordsRow: {
    backgroundColor:'white',
    flex: 1,
    padding: BODY_PADDING,
    margin: BODY_PADDING,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 3,
    height: 50,
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 0,
      width: 0
    },
  },
  groupWordsRowText: {
    color: 'black',
    fontFamily: Const.BASE_FONT_FAMILY,
    letterSpacing: 2,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    alignItems: 'center',
    fontSize: 12,
    lineHeight: 18,
  },
  paginationText: {
    textAlign: 'center',
    fontSize: PAGINATION_FONT_SIZE,
    fontFamily: Const.BASE_FONT_FAMILY,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'rgba(255,255,255,.8)',
    backgroundColor: Const.RED,
  },
  progressStatus: {
    color: 'rgba(0,0,0,.8)',
    fontSize: 8,
    fontFamily: Const.BASE_FONT_FAMILY,
    letterSpacing: 2,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 3,
    flex: 1,
  },
  label: {
    color: '#6F7692',
    padding: 5,
    letterSpacing: .5,
    fontWeight: 'bold',
    fontSize: 10,
  },
  pill: {
    flexDirection: 'row',
    marginRight: 5,
    marginTop: 5,
    backgroundColor: Const.BLUE,
    borderColor: Const.BLUE,
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
    paddingTop: 8,
    paddingBottom: 8,
    zIndex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
    padding: 30,
    paddingTop: 50,
  },
  slideText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 18,
    display: 'flex',
    textAlign: 'center',
    lineHeight: 25,
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
});
