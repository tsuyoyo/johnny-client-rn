import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {incrementCount, resetCount} from '../actions/home';
import {updateLoginInfo} from '../actions/login';
import {HomeComponent, HomeDispatchProps, HomeStateProps} from '../components/home';
import {JohnnyAppState} from '../states/app';
import { User } from '../proto/user_pb';
import { ActionBase } from '../actions/actionBase';

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
    initLoginState(user: User, token: string) {
      dispatch(updateLoginInfo(user, token));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
