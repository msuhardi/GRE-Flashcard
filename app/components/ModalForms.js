import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
} from 'react-native-clean-form';
import {
  TabViewAnimated,
  TabBar,
  SceneMap
} from 'react-native-tab-view';
import * as Const from '../Constants';
import theme from '../stylesheets/FormTheme';
import AddWordForm from './AddWordForm';
import AddGroupForm from './AddGroupForm';


export default class ModalForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'Add Word' },
        { key: '2', title: 'Add Group' },
      ],
    };

    this._handleChangeTab = this._handleChangeTab.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  _handleChangeTab(index) {
    this.setState({
      index: index,
    });
  }

  _renderHeader(props) {
    return (
      <TabBar {...props}
        style={{
          backgroundColor: 'white',
        }}
        labelStyle={{
          fontSize: 10,
          fontWeight: 'bold',
          color: Const.GREY
        }}
        indicatorStyle={{
          backgroundColor: '#4286dd'
        }}
      />
    );
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return (
        <AddWordForm />
      );
    case '2':
      return (
        <AddGroupForm />
      );
    default:
      return null;
    }
  }

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
        swipeEnabled={false}
        animationEnabled={false}
      />
    );
  }
}
