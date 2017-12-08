import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
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



class LoginForm extends Component {
  static propTypes = {
    loginHandler: PropTypes.func,
    signupHandler: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values, dispatch) {
    const { loginHandler } = this.props;

    return new Promise((resolve) => {
      const login_uri = Const.BASE_URI + '/users/by_email/' + values.username;

      fetch(login_uri, {method: 'GET'})
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.length > 0) {
            const encodedPassword = Base64.encode(values.password);
            if (encodedPassword != responseJson[0].password) {
              this.setState({
                error: 'Error: User / password match is not found.'
              }, () => resolve());
            } else {
              const userId = responseJson[0]._id;
              const firstName = responseJson[0].first_name;
              const lastName = responseJson[0].last_name;

              resolve(loginHandler({
                userId,
                firstName,
                lastName,
              }));
            }
          } else {
            this.setState({
              error: 'Error: User / password match is not found.'
            }, () => resolve());
          }
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
            <Text style={[styles.label, {color: 'white'}]}>EMAIL</Text>
            <View style={{borderBottomWidth: .5, borderBottomColor: 'white', marginBottom: 30,}}>
              <Input
                name="username"
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

            {this.state.error && <Text style={{color: '#be0000', fontSize: 10, textAlign: 'center'}}>{this.state.error}</Text>}
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
                <Text style={{letterSpacing: 2, fontSize: 12, fontWeight: 'bold'}}>LOGIN</Text>
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
            <Text style={{fontSize: 12, color: 'white'}}>New around here? </Text>
            <TouchableOpacity onPress={this.props.signupHandler}>
              <Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>Sign Up</Text>
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
    height: 40,
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
  },
  Label: {
    color: '#BFC2C9',
    fontSize: 12,
    stackedHeight: 40
  },
};

// Decorate with redux-form
LoginForm = reduxForm({
  form: 'LoginForm' // a unique identifier for this form
})(LoginForm)

export default LoginForm
