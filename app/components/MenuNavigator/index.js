import MenuNavigator from './MenuNavigator';
import * as actions from './actions';
import { connect } from 'react-redux';
import {
  getNav,
} from '../../reducers';

const mapStateToProps = (state, props)=> {
  return {
    ...getNav(state),
  }
}

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuNavigator);
