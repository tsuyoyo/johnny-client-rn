import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {HomeState} from '../reducers/homes';
import {HomeAction} from '../actions/home';
import * as HomeActionCreator from '../actioncreators/home';
import {Home} from '../components/home';

export interface HomeStateProps {
  count: number;
}

export interface HomeDispatchProps {
  incrementCount(count: number): void;
  resetCount(): void;
}

export interface HomeProps extends HomeStateProps, HomeDispatchProps {}

function mapStateToProps(state: HomeState): HomeStateProps {
  return {
    count: state.count,
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
)(Home);
