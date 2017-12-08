import AddWordForm from './AddWordForm';
import * as actions from './actions';
import { connect } from 'react-redux';
import {
  getNav,
  getCard,
} from '../../reducers';

const mapStateToProps = (state, props)=> {
  return {
    ...getNav(state),
    ...getCard(state),
  }
}

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWordForm);
