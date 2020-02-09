import {HomeAction, IncrementCount, HomeActionType} from '../actions/home';

export interface HomeState {
  count: number;
}

const initialState: HomeState = {
  count: 0,
};

export function reducer(
  state: HomeState = initialState,
  action: HomeAction,
): HomeState {
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
