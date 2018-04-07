import { Card } from '@wwc/core';

export interface CustomerState {
  cards: Card[];
  isSubscribedToCardChanges: boolean;
  loadingCards: boolean;
  firestoreUnsubscribeMethods: Function[];
}
