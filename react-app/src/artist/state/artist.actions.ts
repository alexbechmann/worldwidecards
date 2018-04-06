import * as firebase from 'firebase';
import { store } from '@app/shared/state';
import { cardService } from '@app/cards/services/card.service';
import { UserInfo } from 'firebase';
import {
  SAVING_CARD_DESIGN,
  SAVE_CARD_DESIGN,
  SET_MY_CARD_DESIGNS_LIST,
  START_WATCHING_CARD_DESIGNS_FOR_USER
} from './artist.action-types';
import { Card } from '@wwc/core';
import { AnyAction } from 'redux';

export function saveCardDesign(user: UserInfo, card: Card): AnyAction {
  store.dispatch({
    type: SAVING_CARD_DESIGN
  });
  return {
    type: SAVE_CARD_DESIGN,
    payload: cardService.saveCardDesign(user, card)
  };
}

export function setMyCardDesignsList(cards: Card[]): AnyAction {
  return {
    type: SET_MY_CARD_DESIGNS_LIST,
    payload: cards
  };
}

export function startWatchingCardDesignsForUser(user: UserInfo): AnyAction {
  const db = firebase.firestore();
  const cardDesigns = db.collection('card-designs').where('userId', '==', user.uid);
  const unsubscribe = cardDesigns.onSnapshot(snapshot => {
    const cards: Card[] = snapshot.docs.map(doc => {
      const card = doc.data() as Card;
      card.id = doc.id;
      return card;
    });
    const action = setMyCardDesignsList(cards);
    store.dispatch(action);
  });
  return {
    type: START_WATCHING_CARD_DESIGNS_FOR_USER,
    payload: unsubscribe
  };
}
