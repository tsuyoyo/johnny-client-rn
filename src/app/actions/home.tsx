import {Action} from 'redux';

export enum HomeActionType {
  INCREMENT_COUNT = 'INCREMENT_COUNT',
  RESET_COUNT = 'RESET_COUNT',
}

export interface HomeAction extends Action<HomeActionType> {}

export interface IncrementCount extends HomeAction {
  count: number;
}
