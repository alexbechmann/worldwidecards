import { AnyAction } from 'redux';
import { User, UserInfo } from 'firebase';
import { store } from 'src/shared/state';
import * as firebase from 'firebase';
import { UPDATE_CURRENT_USER, INIT_AUTH } from './auth.action-types';

export function loginWithFacebook(): AnyAction {
  const provider = new firebase.auth.FacebookAuthProvider();
  return {
    type: UPDATE_CURRENT_USER,
    payload: firebase.auth().signInWithPopup(provider)
  };
}

export function initAuth(): AnyAction {
  firebase.auth().onAuthStateChanged((user: User) => {
    const userInfo = user as UserInfo;
    store.dispatch({
      type: UPDATE_CURRENT_USER,
      payload: userInfo
    });
  });
  return {
    type: INIT_AUTH
  };
}
