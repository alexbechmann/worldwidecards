import { AuthState } from './auth.state';
import { AnyAction } from 'redux';
import { UPDATE_CURRENT_USER } from './auth.action-types';

const defaultState: AuthState = {
  currentUser: null,
  initialized: false
};

export function authReducer(state: AuthState = defaultState, action: AnyAction): AuthState {
  switch (action.type) {
    case UPDATE_CURRENT_USER: {
      const newState = Object.assign({}, state);
      newState.currentUser = action.payload;
      newState.initialized = true;
      return newState;
    }
    default: {
      return state;
    }
  }
}
