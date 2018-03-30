import * as firebase from 'firebase';
import 'firebase/firestore';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';

class CardService {
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
    const db = firebase.firestore();
    const cardRef = card.id ? db.collection('card-designs').doc(card.id) : db.collection('card-designs').doc();
    return cardRef
      .set(card)
      .then(console.log)
      .catch(console.log);
  }
}

export const cardService = new CardService();
