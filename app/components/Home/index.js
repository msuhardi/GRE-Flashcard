import Home from './Home';
import * as actions from './actions';
import { connect } from 'react-redux';
import {
  getNav,
  getGroup,
  getUser,
} from '../../reducers';

const mapStateToProps = (state, props)=> {
  return {
    ...getNav(state),
    ...getGroup(state),
    ...getUser(state),
  }
}

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
