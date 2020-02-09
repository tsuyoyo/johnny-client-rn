import {HomeActionType, IncrementCount, HomeAction} from '../actions/home';

export function incrementCount(count: number): IncrementCount {
  return {
    type: HomeActionType.INCREMENT_COUNT,
    count: count,
  };
}

export function resetCount(): HomeAction {
  return {
    type: HomeActionType.RESET_COUNT,
  };
}
