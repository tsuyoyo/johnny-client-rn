import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {JohnnyAppState} from '../states/app';
import {LoginStateProps, LoginDispatchProps, LoginComponent} from '../components/login';
import {updateLoginInfo} from '../actions/login';
import { ActionBase } from '../actions/actionBase';
import { default as proto } from "../proto/johnnyproto";

function mapStateToProps(appState: JohnnyAppState): LoginStateProps {
  return {
    accessToken: appState.login.accessToken,
    user: appState.login.user
  }
}

function mapDispatchToProps(dispatch: Dispatch<ActionBase>): LoginDispatchProps {
  return {
    updateLoginInfo(user: proto.IUser, accessToken: string) {
      dispatch(updateLoginInfo(user, accessToken));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);