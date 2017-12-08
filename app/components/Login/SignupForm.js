import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
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
import Base64 from 'base-64';

import styles from '../../stylesheets/main';

import * as Const from '../../Constants';

const validate = (values) => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Required'
  }

  if (!values.last_name) {
    errors.last_name = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

class SignupForm extends Component {
  static propTypes = {
    signupHandler: PropTypes.func,
    loginHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, dispatch) {
    const { signupHandler, loginHandler } = this.props;

    return new Promise((resolve) => {
      const login_uri = Const.BASE_URI + '/users';

      values.username = values.email;
      values.password = Base64.encode(values.password);

      fetch(login_uri, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          const userId = responseJson._id;
          const firstName = responseJson.first_name;
          const lastName = responseJson.last_name;

          resolve(signupHandler({
            userId,
            firstName,
            lastName,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <View style={{flex: 1, margin: Const.BODY_PADDING, padding: Const.BODY_PADDING}}>
        <Form>
          <FieldsContainer>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, marginRight: 20}}>
                <Text style={[styles.label, {color: 'white'}]}>FIRST NAME</Text>
                <View style={{borderBottomWidth: .5, borderBottomColor: 'white', marginBottom: 30,}}>
                  <Input
                    name="first_name"
                    theme={theme}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={{flex: 1}}>
                <Text style={[styles.label, {color: 'white'}]}>LAST NAME</Text>
                <View style={{borderBottomWidth: .5, borderBottomColor: 'white', marginBottom: 30,}}>
                  <Input
                    name="last_name"
                    theme={theme}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
            <Text style={[styles.label, {color: 'white'}]}>EMAIL</Text>
            <View style={{borderBottomWidth: .5, borderBottomColor: 'white', marginBottom: 30,}}>
              <Input
                name="email"
                placeholder="Ex: user@example.com"
                theme={theme}
                autoCapitalize="none"
              />
            </View>

            <Text style={[styles.label, {color: 'white'}]}>PASSWORD</Text>
            <View style={{borderBottomWidth: .5, borderBottomColor: 'white', marginBottom: 20,}}>
              <Input
                name="password"
                theme={theme}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </FieldsContainer>
          <ActionsContainer>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 5,
                flex: 1,
              }}
            >
              <Button theme={theme} onPress={handleSubmit(this.onSubmit)} submitting={submitting} iconPlacement="right">
                <Text style={{letterSpacing: 2, fontSize: 12, fontWeight: 'bold'}}>SIGN UP</Text>
              </Button>
            </View>
          </ActionsContainer>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20}}
          >
            <Text style={{fontSize: 12, color: 'white'}}>Already a user? </Text>
            <TouchableOpacity onPress={this.props.loginHandler}>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </Form>
      </View>
    );
  }
}

const theme = {
  Button: {
    backgroundColor: 'transparent',
    color: 'black',
    height: 45,
    fontSize: 12,
    fontWeight: '700',
  },
  FormGroup: {
    borderColor: '#EBEBEB',
    borderStyle: 'solid',
    borderRadius: 0,
    borderWidth: 0,
    errorBorderColor: '#E76049',
    height: 25,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 10,
  },
  BaseInput: {
    placeholderColor: 'rgba(255,255,255,.5)',
    fontSize: 12,
    lineHeight: 18,
  },
  Input: {
    color: 'white',
    padding: 20,
    backgroundColor: 'white'
  },
  Label: {
    color: '#BFC2C9',
    fontSize: 12,
    stackedHeight: 40
  },
  ErrorMessage: {
    color: '#be0000',
    fontSize: 10,
    marginTop: 0,
    marginBottom: -15,
    textAlign: 'right'
  },
};

// Decorate with redux-form
SignupForm = reduxForm({
  form: 'SignupForm', // a unique identifier for this form
  validate
})(SignupForm)

export default SignupForm
