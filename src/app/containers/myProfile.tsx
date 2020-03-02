import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {JohnnyAppState} from '../states/app';
import { MyProfileStateProps, MyProfileDispatchProps, MyProfileComponent } from '../components/myProfile';
import { ActionBase } from '../actions/actionBase';
import { UserProfile } from '../proto/user_pb';
import { updateUserProfile } from '../actions/profile';

function mapStateToProps(appState: JohnnyAppState): MyProfileStateProps {
  return {
    user: appState.login.user,
    userProfile: appState.profile.userProfile,
  }
}

function mapDispatchToProps(dispatch: Dispatch<ActionBase>): MyProfileDispatchProps {
  return {
    updateUserProfile(userProfile: UserProfile) {
      dispatch(updateUserProfile(userProfile))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileComponent);
