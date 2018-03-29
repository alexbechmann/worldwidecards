import * as firebase from 'firebase';
import 'firebase/firestore';
import { Card } from '@wwc/core';

class CardService {
  saveCardDesign(card: Card): Promise<void> {
    const db = firebase.firestore();
    const cardRef = db.collection('card-designs').doc();
    return cardRef
      .set(card)
      .then(console.log)
      .catch(console.log);
  }
}

export const cardService = new CardService();
