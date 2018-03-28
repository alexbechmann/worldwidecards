export function createNewState<T>(state: T, update: (state: T) => void): T {
  const newState: T = Object.assign({}, state);
  update(newState);
  return newState;
}
