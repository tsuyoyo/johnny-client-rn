import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {JohnnyAppState} from '../states/app';
import { MyProfileStateProps, MyProfileDispatchProps, MyProfileComponent } from '../components/myProfile';
import { ActionBase } from '../actions/actionBase';
import { updateUserProfile } from '../actions/profile';
import * as proto from "../proto/johnnyproto";

function mapStateToProps(appState: JohnnyAppState): MyProfileStateProps {
  return {
    user: appState.login.user,
    userProfile: appState.profile.userProfile,
  }
}

function mapDispatchToProps(dispatch: Dispatch<ActionBase>): MyProfileDispatchProps {
  return {
    updateUserProfile(userProfile: proto.IUserProfile) {
      dispatch(updateUserProfile(userProfile))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileComponent);
