import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  AppRegistry,
  Text,
  ListView,
  TouchableHighlight,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DoubleBounce } from 'react-native-loader';
import SideMenu from 'react-native-side-menu';

import Menu from '../Menu';
import ShowModalBtn from '../ShowModalBtn';
import Form from '../ModalForms';
import OnboardingScreen from '../OnboardingScreen';

import styles from '../../stylesheets/main';
import * as Const from '../../Constants';

import Swipeout from 'react-native-swipeout';

const _ = require('lodash');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const BASE_URI = Const.BASE_URI;

class Home extends Component {
  static propTypes = {
    groups: PropTypes.array,
    groupWords: PropTypes.array,
    userProgress: PropTypes.array,
    completeWordList: PropTypes.object,
    showInstruction: PropTypes.bool,
  };

  static defaultProps = {
    groups: [],
    groupWords: [],
    userProgress: [],
    showInstruction: false,
  }

  constructor() {
    super();
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loading: true,
      refreshing: false,
      showOnboarding: false,
    }

    this.onboardingCloseHandler = this.onboardingCloseHandler.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderOnboardingScreen = this.renderOnboardingScreen.bind(this);
    this.deleteGroupHandler = this.deleteGroupHandler.bind(this);
    this.logout = this.logout.bind(this);
  };

  componentDidMount() {
    AsyncStorage.getItem('onboarding').then((show) => {
      if (!show) {
        this.setState({
          showOnboarding: true,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: ds.cloneWithRows(nextProps.groups),
      loading: false,
      refreshing: false,
    });
  }

  async logout() {
    const { logout } = this.props;

    try {
      await AsyncStorage.removeItem('id_token');
      logout();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _onRefresh() {
    const { fetchGroups } = this.props;

    this.setState({refreshing: true});
    fetchGroups();
  }

  componentWillMount() {
    const { fetchCompleteWordsList, fetchGroups } = this.props;

    fetchGroups();
    fetchCompleteWordsList();
  }

  _renderStudyText() {
    return (
      <View style={{flex: 1, flexDirection: 'row',}}>
        <Text style={{
            color: '#B3AFB3',
            fontFamily: 'Raleway-Light',
            letterSpacing: 2,
            fontSize: 10,
            fontWeight: 'bold',
            flex: 1,
            marginRight: 5,
            textAlign: 'right',}}>
          {'Study'.toUpperCase()}
        </Text>
        <Icon name='ios-arrow-forward'
          color='#B3AFB3'
          size={12}
        />
      </View>

    )
  }

  deleteGroupHandler(rowIndex, id) {
    const uri = Const.BASE_URI + '/groups/' + id;
    fetch(uri, {
      method: 'DELETE'
    })
      .then(() => {
        delete this.props.groups[rowIndex];
        this.setState({
          dataSource: ds.cloneWithRows(this.props.groups),
        });
      })
      .catch((error) => console.error(error));
  }

  _renderButton(pressButtonFn, deleteRowFn, rowIndex, row) {
    let swipeBtns = [{
      component: (
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name='ios-trash'
            color='white'
            size={28}
          />
        </View>
      ),
      backgroundColor: 'transparent',
      onPress: () => deleteRowFn(rowIndex, row._id),
    }];

    return (
      <Swipeout right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
        <TouchableHighlight onPress={pressButtonFn} style={{height: 140}} underlayColor='transparent'>
            <View style={[styles.groupWordsRow]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.groupWordsRowText}>
                  {row.title.toUpperCase()}
                </Text>
                {this._renderStudyText()}
              </View>
            </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }

  async onboardingCloseHandler() {
    try {
      await AsyncStorage.setItem('onboarding', 'true');
      this.setState({
        showOnboarding: false,
      });
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  renderOnboardingScreen() {
    return (
      <OnboardingScreen closeHandler={this.onboardingCloseHandler}/>
    );
  }

  renderContent() {
    const { fetchWordsByGroup, openGroup, userId } = this.props;

    if (this.state.loading) {
      return (
        <View style={{backgroundColor: Const.RED, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <DoubleBounce size={20} color="#FFFFFF" />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections
            style={{
              backgroundColor: Const.RED,
              paddingTop: 20,
            }}
            refreshControl={
              <RefreshControl
                tintColor='rgba(0,0,0,.2)'
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
            renderRow={(row, sectionId, rowId) => {
              return (
                this._renderButton(
                  () => {
                    this.setState({
                      loading: true,
                    });

                    fetchWordsByGroup(row._id)
                    .then(() => openGroup(row.title.toUpperCase(), userId, row._id))
                  }, this.deleteGroupHandler, rowId, row)
              );
            }}
          />
        <View
          style={{
            display:'flex',
            height: 50,
            backgroundColor: Const.RED,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
            <Text
              style={{letterSpacing: 2, fontSize: 10, fontWeight: 'bold', color: 'rgba(0,0,0,.3)'}}
            >
              PULL TO REFRESH
            </Text>
          </View>
        </View>
      );
    }
  }

  render() {
    const { isOpen } = this.props;
    const menu = <Menu logoutHandler={this.logout} />;

    return (
      <SideMenu isOpen={isOpen} menu={menu}>
        {this.state.showOnboarding && this.renderOnboardingScreen()}
        {this.renderContent()}
      </SideMenu>
    );
  }
}

export default Home;
