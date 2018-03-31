import * as _ from 'lodash';

export function createNewState<T>(state: T, update: (state: T) => void): T {
  const newState: T = _.merge({}, state);
  update(newState);
  return newState;
}
