import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
} from 'react-native-clean-form';
import {
  Input,
  Select,
} from '../redux-form-immutable';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import * as Const from '../../Constants';
import theme from '../../stylesheets/FormTheme';
import styles from '../../stylesheets/main';


const MNEMONIC_OPTIONS = [
  {label: '', value: null},
  {label: 'Image', value: Const.IMAGE},
  {label: 'Text', value: Const.TEXT},
  {label: 'Word Play', value: Const.WORD_PLAY}
]

const validate = (values) => {
  const errors = {}
  if (!values.human_name) {
    errors.human_name = 'Required'
  }

  if (!values.meaning) {
    errors.meaning = 'Required'
  }

  if (!values.example) {
    errors.example = 'Required'
  }

  return errors
}

const SUCCESS_ICON = require('../../assets/images/like.png');
const BASE_URI = Const.BASE_URI;


class AddWordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mnemonicType: null,
      submitted: false,
    }

    this._handleSwitchMnemonicType = this._handleSwitchMnemonicType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, dispatch) {
    const { addNewWord } = this.props;

    return new Promise((resolve) => {
      values.word = values.human_name.toLowerCase();

      const add_word_uri = BASE_URI + '/words/';

      fetch(add_word_uri, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then((response) => response.json())
      .then((result) => {
        let completeWordList = {};
        completeWordList[result.word] = result;

        this.setState({
          submitted: true,
        }, () => resolve(addNewWord({ newWord: result })));
      })
      .catch((error) => {
        console.error(error);
      });
    });
  }

  _handleSwitchMnemonicType(mnemonicType) {
    this.setState({
      mnemonicType: mnemonicType
    });
  }

  _renderMnemonicForm(mnemonicType) {
    switch(mnemonicType) {
      case Const.IMAGE: {
        return (
          <Fieldset theme={theme}>
            <Text style={styles.label}>IMAGE URI</Text>
            <Input
              name="mnemonic.uri"
              theme={theme}
              multiline
              numberOfLines={2}
              style={{marginTop: 8, marginBottom: 8}}
            />
          </Fieldset>
        );
      }
      case Const.TEXT: {
        return (
          <Fieldset theme={theme}>
            <Text style={styles.label}>EXPLANATION</Text>
            <Input
              name="mnemonic.text"
              theme={theme}
              multiline
              numberOfLines={3}
              style={{marginTop: 8, marginBottom: 8}}
            />
          </Fieldset>
        );
      }
      case Const.WORD_PLAY: {
        return (
          <Fieldset theme={theme}>
            <Text style={styles.label}>WORDS</Text>
            <Input
              placeholder="Words (Multiple words are separated by '+'). Ex: Go+Summer"
              name="mnemonic.words"
              format={(value) => value ? value.join('+') : ''}
              parse={(value) => value.split('+')}
              theme={theme}
              multiline
              numberOfLines={2}
              style={{marginTop: 8, marginBottom: 8}}
            />

            <Text style={styles.label}>EXPLANATION</Text>
            <Input
              name="mnemonic.meaning"
              theme={theme}
              multiline
              numberOfLines={3}
              style={{marginTop: 8, marginBottom: 8}}
            />
          </Fieldset>
        );
      }
      default: {
        return null;
      }
    }
  }

  render() {
    if (this.state.submitted) {
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image source={SUCCESS_ICON} style={{width: 150, height: 150}}/>
          <Text style={{
            marginTop: 20,
            color: Const.GREY,
            fontFamily: Const.BASE_FONT_FAMILY,
            fontSize: 12,
            fontWeight: 'bold',
            letterSpacing: .8,}}
          >
            WORD ADDED!
          </Text>
        </View>
      )
    } else {
      const { handleSubmit, submitting, mnemonicType } = this.props;

      return (
        <Form>
          <FieldsContainer style={{ padding: Const.BODY_PADDING, backgroundColor: '#FCFCFC'}}>
            <Text style={styles.label}>WORD</Text>
            <Input
              name="human_name"
              placeholder="Ex: Schadenfreude"
              theme={theme}
            />

            <Text style={styles.label}>DEFINITION</Text>
            <Input
              name="meaning"
              multiline
              numberOfLines={2}
              theme={theme}
              style={{marginTop: 8, marginBottom: 8}}
            />

            <Text style={styles.label}>EXAMPLE</Text>
            <Input
              name="example"
              theme={theme}
              multiline
              numberOfLines={3}
              style={{marginTop: 8, marginBottom: 8}}
            />

            <Text style={styles.label}>MNEMONIC TYPE</Text>
            <Select
              name="mnemonic.type"
              options={MNEMONIC_OPTIONS}
              theme={theme}
              value="word-play"
            />
            {this._renderMnemonicForm(mnemonicType)}
          </FieldsContainer>
          <ActionsContainer>
            <View
              style={{
                backgroundColor: '#4286dd',
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                padding: 5,
                flex: 1
              }}
            >
              <Button iconPlacement="right" onPress={handleSubmit(this.onSubmit)} submitting={submitting}>ADD</Button>
            </View>
          </ActionsContainer>
        </Form>
      );
    }
  }
}

// Decorate with redux-form
AddWordForm = reduxForm({
  form: 'AddWordForm', // a unique identifier for this form
  validate
})(AddWordForm)

// Decorate with connect to read form values
const selector = formValueSelector('AddWordForm') // <-- same as form name
AddWordForm = connect(state => {
  // can select values individually
  const mnemonicType = selector(state, 'mnemonic.type')
  return {
    mnemonicType
  }
})(AddWordForm)

export default AddWordForm
