import { Cycle } from './reducer';

export enum ActionTypes {
  add_new_cycle = 'add_new_cycle',
  interrupted_current_cycle = 'interrupted_current_cycle',
  mark_fineshed_cycle = 'mark_fineshed_cycle',
}

export function addCreateCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.add_new_cycle,
    payload: {
      newCycle,
    },
  };
}

export function interrupetedCycleAction() {
  return {
    type: ActionTypes.interrupted_current_cycle,
  };
}

export function markFinishedCycleAction() {
  return {
    type: ActionTypes.mark_fineshed_cycle,
  };
}
