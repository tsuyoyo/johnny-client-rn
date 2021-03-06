import {IncrementCount} from '../actions/home';
import {HomeStateProps} from '../components/home';
import { ActionBase } from '../actions/actionBase';
import { ActionType } from '../actions/actionTypes';
import { default as proto } from "../proto/johnnyproto";

const initialState: HomeStateProps = {
  count: 0,
  user: new proto.User(),
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
