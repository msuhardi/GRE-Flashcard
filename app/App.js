import React, {
  Component,
} from 'react';
import {
  View,
  AppRegistry,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  RefreshControl,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {
  Scene,
  Router,
  Actions,
} from 'react-native-router-flux';
import {
  Provider,
  connect
} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import configureStore from './store/configureStore';

import Home from './components/Home';
import MenuNavigator from './components/MenuNavigator';
import Login from './components/Login';
import Flashcard from './components/Flashcard';
import ShowModalBtn from './components/ShowModalBtn';
import BackBtn from './components/NavigationBtn';
import Form from './components/ModalForms';
import GroupWordListForm from './components/GroupWordListForm';

import * as Const from './Constants';

const ConnectedRouter = connect()(Router);
const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToken: false,
      isLoaded: false,
      store: store,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({
        hasToken: token !== null,
        isLoaded: true,
        store: token ? configureStore({ user: { userId: token }}) : store,
      });
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
      return (
        <Provider store={this.state.store}>
          <ConnectedRouter>

            <Scene key='root'>
              <Scene key='login'
                component={Login}
                headerStyle={{
                  backgroundColor: Const.RED,
                  shadowOpacity: 0,
                }}
                initial={!this.state.hasToken}
                renderLeftButton={() => null}
              />

              <Scene key='home'
                component={Home}
                title='GROUPS'
                headerStyle={{
                  backgroundColor: Const.RED,
                  shadowOpacity: 0,
                }}
                initial={this.state.hasToken}
                titleStyle={{
                  fontFamily: 'Raleway-Light',
                  letterSpacing: 2,
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'white'
                }}
                renderLeftButton={() => <MenuNavigator />}
                renderRightButton={() => <ShowModalBtn modalContent={<Form />}/>}
              />

              <Scene key='card'
                component={Flashcard}
                renderLeftButton={() => {
                  return (
                    <BackBtn
                      onPress={() => Actions.pop()}
                    />
                  );
                }}
                renderRightButton={() => {
                  return (
                    <ShowModalBtn
                      iconName="md-create"
                      modalContent={<GroupWordListForm />}
                    />
                  );
                }}
                headerStyle={{
                  backgroundColor: Const.RED,
                  shadowOpacity: 0,
                }}
                titleStyle={{
                  fontFamily: 'Raleway-Light',
                  letterSpacing: 2,
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: 'white',
                }}
              />
            </Scene>

          </ConnectedRouter>
        </Provider>
      );
    }
  }
}

export default App;
