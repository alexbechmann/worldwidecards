import { AnyAction } from 'redux';
import * as firebase from 'firebase';

export const LOGIN_WITH_FACEBOOK = 'WWC/LOGIN_WITH_FACEBOOK';
export const CHECK_FOR_CURRENT_USER = 'WWC/CHECK_FOR_CURRENT_USER';

export function loginWithFacebook(): AnyAction {
  const provider = new firebase.auth.FacebookAuthProvider();
  return {
    type: LOGIN_WITH_FACEBOOK,
    payload: firebase.auth().signInWithPopup(provider)
  };
}

export function checkForCurrentUser(): AnyAction {
  console.log(firebase.auth());
  return {
    type: CHECK_FOR_CURRENT_USER,
    payload: firebase.auth().currentUser
  };
}
