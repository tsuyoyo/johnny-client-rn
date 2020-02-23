import {IncrementCount} from '../actions/home';
import {HomeStateProps} from '../components/home';
import { User } from '../proto/user_pb';
import { ActionBase } from '../actions/actionBase';
import { ActionType } from '../actions/actionTypes';

const initialState: HomeStateProps = {
  count: 0,
  user: new User(),
  token: "",
};

export function reducer(
  state: HomeStateProps = initialState,
  action: ActionBase,
): HomeStateProps {
  switch (action.type) {
    case ActionType.INCREMENT_COUNT:
      return {
        ...state,
        count: (action as IncrementCount).count + 1,
      };
    case ActionType.RESET_COUNT:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}
