import * as deepAssign from 'deep-assign';

export function createNewState<T>(state: T, update: (state: T) => void): T {
  const newState: T = deepAssign({}, state);
  update(newState);
  return newState;
}
