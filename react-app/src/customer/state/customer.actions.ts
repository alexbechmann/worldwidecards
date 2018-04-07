import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';
import { CUSTOMER_ADD_CARD_TO_BASKET, START_WATCHING_ALL_CARD_DESIGNS, SET_CARDS_LIST } from './customer.action-types';
import { cardService } from '@app/cards/services/card.service';
import { AnyAction } from 'redux';

export const saveCardDesign = (user: UserInfo, card: Card) => ({
  type: CUSTOMER_ADD_CARD_TO_BASKET,
  payload: Promise.resolve(console.log(`Adding fake card to basket`, card))
});

export function startWatchingAllCardDesigns(): AnyAction {
  const unsubscribe: Function = cardService.subscribeAndDispatchAllCardDesigns();
  return {
    type: START_WATCHING_ALL_CARD_DESIGNS,
    payload: unsubscribe
  };
}

export function setCardsList(cards: Card[]): AnyAction {
  return {
    type: SET_CARDS_LIST,
    payload: cards
  };
}
