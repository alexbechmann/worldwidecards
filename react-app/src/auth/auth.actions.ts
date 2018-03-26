import { AnyAction } from 'redux';

export const LOGIN_WITH_GOOGLE = 'WWC/LOGIN_WITH_GOOGLE';

export function loginWithGoogle(): AnyAction {
  return {
    type: LOGIN_WITH_GOOGLE
  };
}
