import { User, UserInfo } from 'firebase';
import { store } from '@app/state/root.store';
import * as firebase from 'firebase';
import { startWatchingCardDesignsForUser } from '@app/artist/state/artist.actions';
import { action } from 'typesafe-actions';

export const UPDATE_CURRENT_USER = 'WWC/UPDATE_CURRENT_USER';
export const INIT_AUTH = 'WWC/INIT_AUTH';
export const LOGOUT = 'WWC/LOGOUT';

export const loginWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return action(UPDATE_CURRENT_USER, (firebase.auth().signInWithPopup(provider) as any) as User);
};

export const initAuth = () => {
  firebase.auth().onAuthStateChanged((user: User | null) => {
    const userInfo = user as UserInfo;
    store.dispatch({
      type: UPDATE_CURRENT_USER,
      payload: userInfo
    });
    if (user) {
      store.dispatch(startWatchingCardDesignsForUser(user));
    }
  });
  return action(
    INIT_AUTH,
    new Promise((resolve, reject) => {
      // To give the onAuthStateChanged a chance to emit currentUser.
      setTimeout(() => resolve(), 1500);
    })
  );
};

export const logout = () => {
  return action(LOGOUT, (firebase.auth().signOut() as any) as void);
};
