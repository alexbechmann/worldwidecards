import { AuthState } from './auth.state';
import { AnyAction } from 'redux';
import { UPDATE_CURRENT_USER, INIT_AUTH } from './auth.action-types';
import { createNewState } from 'src/shared/helpers/create-new-state';

const defaultState: AuthState = {
  currentUser: null,
  initialized: false
};

export function authReducer(state: AuthState = defaultState, action: AnyAction): AuthState {
  switch (action.type) {
    case INIT_AUTH: {
      return createNewState(state, newState => {
        newState.initialized = true;
      });
    }
    case UPDATE_CURRENT_USER: {
      return createNewState(state, newState => {
        newState.currentUser = action.payload;
        if (action.payload) {
          newState.initialized = true;
        }
      });
    }
    default: {
      return state;
    }
  }
}
