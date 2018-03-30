import { AnyAction } from 'redux';
import { User, UserInfo } from 'firebase';
import { store } from 'src/shared/state';
import * as firebase from 'firebase';
import { UPDATE_CURRENT_USER, INIT_AUTH, LOGOUT } from './auth.action-types';
import { startWatchingCardDesignsForUser } from 'src/cards/state/card.actions';

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
    if (user) {
      store.dispatch(startWatchingCardDesignsForUser(user));
    }
  });
  return {
    type: INIT_AUTH,
    payload: new Promise((resolve, reject) => {
      // To give the onAuthStateChanged a chance to emit currentUser.
      setTimeout(() => resolve(), 500);
    })
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: firebase.auth().signOut()
  };
}
