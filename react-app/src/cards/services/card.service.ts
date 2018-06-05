import * as firebase from 'firebase';
import 'firebase/firestore';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';
import { store } from '@app/state/root.store';
import { setMyCardDesignsList } from '@app/artist/state/artist.actions';
import { setCardsList } from '@app/customer/state/customer.actions';

class CardService {
  get db(): firebase.firestore.Firestore {
    return firebase.firestore();
  }

  saveCardDesign(user: UserInfo, card: Card): Promise<void> {
    console.log(card);
    card.userId = user.uid;
    card.userInfo = {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid
    };
    const cardRef = card.id
      ? this.db.collection('card-designs').doc(card.id)
      : this.db.collection('card-designs').doc();
    return cardRef
      .set(card)
      .then(console.log)
      .catch(console.log);
  }

  getCardDesignById(id: string): Promise<Card> {
    const cardRef = this.db.collection('card-designs').doc(id);
    return cardRef.get().then(snapshot => {
      const card = snapshot.data() as Card;
      if (card) {
        card.id = snapshot.id;
      }
      return card;
    });
  }

  deleteCardDesignById(id: string): Promise<void> {
    const cardRef = this.db.collection('card-designs').doc(id);
    return cardRef.delete();
  }

  subscribeAndDispatchCardDesigns(userId: string): Function {
    const db = firebase.firestore();
    const cardDesigns = db.collection('card-designs').where('userId', '==', userId);
    const unsubscribe: Function = cardDesigns.onSnapshot(snapshot => {
      const cards: Card[] = snapshot.docs.map(doc => {
        const card = doc.data() as Card;
        card.id = doc.id;
        return card;
      });
      const action = setMyCardDesignsList(cards);
      store.dispatch(action);
    });
    return unsubscribe;
  }

  subscribeAndDispatchAllCardDesigns(): Function {
    const db = firebase.firestore();
    const cardDesigns = db.collection('card-designs');
    const unsubscribe: Function = cardDesigns.onSnapshot(snapshot => {
      const cards: Card[] = snapshot.docs.map(doc => {
        const card = doc.data() as Card;
        card.id = doc.id;
        return card;
      });
      const action = setCardsList(cards);
      store.dispatch(action);
    });
    return unsubscribe;
  }
}

export const cardService = new CardService();
