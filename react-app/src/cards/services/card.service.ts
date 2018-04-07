import * as firebase from 'firebase';
import 'firebase/firestore';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';

class CardService {
  get db(): firebase.firestore.Firestore {
    return firebase.firestore();
  }

  saveCardDesign(user: UserInfo, card: Card): Promise<void> {
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
      return snapshot.data() as Card;
    });
  }
}

export const cardService = new CardService();
