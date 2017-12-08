import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

import * as Const from '../../Constants';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signup: false,
    }

    this.login = this.login.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  async login(obj) {
    const { login } = this.props;
    const { userId } = obj;

    try {
      await AsyncStorage.setItem('id_token', userId);
      login(obj);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  renderForm() {
    if (this.state.signup) {
      return (
        <View style={{flex: 1}}>
          <SignupForm
            loginHandler={() => this.setState({signup: false})}
            signupHandler={this.login}
          />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={styles.loginContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../../assets/images/logo.png')} />
          </View>
          <View style={styles.formContainer}>
            <LoginForm loginHandler={this.login} signupHandler={() => this.setState({signup: true})}/>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        { this.renderForm() }
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Const.RED,
  },
  loginContainer:{
    alignItems: 'center',
    flex: 0.4,
    justifyContent: 'center'
  },
  formContainer: {
    flex: 0.6,
  },
  logo: {
    position: 'absolute',
    width: Const.WINDOW_WIDTH * 7 / 8,
  },
});
