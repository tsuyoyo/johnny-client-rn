import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {JohnnyAppState} from '../states/app';
import {LoginStateProps, LoginDispatchProps, LoginComponent} from '../components/login';
import {LoginAction} from '../actions/login';
import { User } from '../proto/user_pb';

function mapStateToProps(appState: JohnnyAppState): LoginStateProps {
  return {
    accessToken: appState.login.accessToken,
    user: appState.login.user
  }
}

function mapDispatchToProps(Dispatch: Dispatch<LoginAction>): LoginDispatchProps {
  return {
    updateLoginInfo() {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);