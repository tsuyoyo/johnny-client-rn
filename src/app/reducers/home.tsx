import {HomeAction, IncrementCount, HomeActionType} from '../actions/home';
import {HomeStateProps} from '../components/home';

const initialState: HomeStateProps = {
  count: 0,
};

export function reducer(
  state: HomeStateProps = initialState,
  action: HomeAction,
): HomeStateProps {
  console.log(`home's reducer - ${JSON.stringify(state)} : ${action.type.toString()}`)
  switch (action.type) {
    case HomeActionType.INCREMENT_COUNT:
      return {
        ...state,
        count: (action as IncrementCount).count + 1,
      };
    case HomeActionType.RESET_COUNT:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}
