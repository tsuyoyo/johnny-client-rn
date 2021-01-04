import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {JohnnyAppState} from '../states/app';
import {
  AreaSelectionStateProps,
  AreaSelectionDispatchProps,
  AreaSelectionProps,
  AreaSelectionScreenComponent
} from '../components/area/AreaSelectionScreen'
import { ActionBase } from '../actions/actionBase';
import * as UserProfileAction from '../actions/profile';
import { default as proto } from "../proto/johnnyproto";

function mapStateToProps(appState: JohnnyAppState): AreaSelectionStateProps {
  return {
    user: appState.login.user,
    userProfile: appState.profile.userProfile,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionBase>): AreaSelectionDispatchProps {
  return {
    updateUserProfile(userProfile: proto.IUserProfile) {
      dispatch(UserProfileAction.updateUserProfile(userProfile));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaSelectionScreenComponent);