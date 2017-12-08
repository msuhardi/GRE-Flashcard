import GroupWordListForm from './GroupWordListForm';
import * as actions from './actions';
import { connect } from 'react-redux';
import {
  getNav,
  getGroup,
  getCard,
  getUser,
} from '../../reducers';

const mapStateToProps = (state, props)=> {
  return {
    ...getNav(state),
    ...getGroup(state),
    ...getCard(state),
    ...getUser(state),
  }
}

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupWordListForm);
