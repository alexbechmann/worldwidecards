import { AuthState } from './auth.state';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { INIT_AUTH, UPDATE_CURRENT_USER } from '@app/auth/state/auth.actions';
import { AppAction } from '@app/state/app-action';

const defaultState: AuthState = {
  initialized: false
};

export function authReducer(state: AuthState = defaultState, action: AppAction): AuthState {
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
