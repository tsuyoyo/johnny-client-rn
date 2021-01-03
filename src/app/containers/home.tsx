import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {incrementCount, resetCount} from '../actions/home';
import {updateLoginInfo} from '../actions/login';
import {HomeComponent, HomeDispatchProps, HomeStateProps} from '../components/home';
import {JohnnyAppState} from '../states/app';
import { ActionBase } from '../actions/actionBase';
import { default as proto } from "../proto/johnnyproto";

function mapStateToProps(
  state: JohnnyAppState
): HomeStateProps {
  return {
    count: state.home.count,
    user: state.login.user,
    token: state.login.accessToken,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionBase>): HomeDispatchProps {
  return {
    incrementCount(count: number) {
      dispatch(incrementCount(count));
    },
    resetCount() {
      dispatch(resetCount());
    },
    initLoginState(user: proto.IUser) {
      dispatch(updateLoginInfo(user));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
