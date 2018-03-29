import * as firebase from 'firebase';
import { Card } from '@wwc/core';
import { setMyCardDesignsList } from 'src/cards/state/card.actions';
import { store } from 'src/shared/state';

export const cardWatcher = {
  startWatching: () => {
    const db = firebase.firestore();
    const cardDesigns = db.collection('card-designs');
    cardDesigns.onSnapshot(snapshot => {
      const cards: Card[] = snapshot.docs.map(doc => {
        const card = doc.data() as Card;
        card.id = doc.id;
        return card;
      });
      const action = setMyCardDesignsList(cards);
      store.dispatch(action);
    });
  }
};
