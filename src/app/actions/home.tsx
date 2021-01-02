import { Action } from 'redux';
import { ActionType } from './actionTypes';
import { ActionBase } from './actionBase';

export interface IncrementCount extends ActionBase {
  count: number;
}

export function incrementCount(count: number): IncrementCount {
  return {
    type: ActionType.INCREMENT_COUNT,
    count: count
  };
}

export function resetCount(): Action<ActionType> {
  return {
    type: ActionType.RESET_COUNT,
  }
}
