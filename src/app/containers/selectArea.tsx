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

function mapStateToProps(appState: JohnnyAppState): AreaSelectionStateProps {
  return {
  }
}

function mapDispatchToProps(dispatch: Dispatch<ActionBase>): AreaSelectionDispatchProps {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaSelectionScreenComponent);