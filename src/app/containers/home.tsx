import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {HomeAction} from '../actions/home';
import * as HomeActionCreator from '../actioncreators/home';
import {HomeComponent} from '../components/home';
import {JohnnyAppState} from '../states/app';
import {HomeDispatchProps, HomeStateProps} from '../props/home';


interface HomeOwnStates {
  svalue: number
}

function mapStateToProps(
  state: JohnnyAppState
): HomeStateProps {
  return {
    count: state.home.count,
  };
}

function mapDispatchToProps(dispatch: Dispatch<HomeAction>): HomeDispatchProps {
  return {
    incrementCount(count: number) {
      dispatch(HomeActionCreator.incrementCount(count));
    },
    resetCount() {
      dispatch(HomeActionCreator.resetCount());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeComponent);
