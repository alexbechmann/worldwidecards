export function createNewState<T>(state: T, update: (state: T) => void): T {
  const newState = Object.assign({}, state);
  update(newState);
  return newState;
}
