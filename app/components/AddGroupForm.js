import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
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
} from './redux-form-immutable';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import * as Const from '../Constants';
import theme from '../stylesheets/FormTheme';
import styles from '../stylesheets/main';

const SUCCESS_ICON = require('../assets/images/like.png');
const BASE_URI = Const.BASE_URI;

class AddGroupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, dispatch) {
    return new Promise((resolve) => {
      const add_group_uri = BASE_URI + '/groups/';

      fetch(add_group_uri, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(() => {
        this.setState({
          submitted: true,
        }, () => resolve())
      })
      .catch((error) => {
        console.error(error);
      });
    });
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
            GROUP ADDED!
          </Text>
        </View>
      )
    } else {
      const { handleSubmit, submitting } = this.props;

      return (
        <Form>
          <FieldsContainer style={{ padding: Const.BODY_PADDING, backgroundColor: '#FCFCFC'}}>
            <Text style={styles.label}>GROUP NAME</Text>
            <Input
              name="name"
              placeholder="Ex: Difficult Words"
              theme={theme}
            />
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
AddGroupForm = reduxForm({
  form: 'AddGroupForm' // a unique identifier for this form
})(AddGroupForm)

export default AddGroupForm
