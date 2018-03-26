import { AuthState } from './auth.state';
import { AnyAction } from 'redux';
import { LOGIN_WITH_FACEBOOK, CHECK_FOR_CURRENT_USER } from 'src/auth/auth.actions';

const defaultState: AuthState = {
  currentUser: null
};

export function authReducer(state: AuthState = defaultState, action: AnyAction): AuthState {
  switch (action.type) {
    case LOGIN_WITH_FACEBOOK:
    case CHECK_FOR_CURRENT_USER: {
      console.log(action);
      return {
        currentUser: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
