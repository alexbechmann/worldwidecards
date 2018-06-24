import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';
import { cardService } from '@app/cards/services/card.service';
import { action, createStandardAction } from 'typesafe-actions';

export const CUSTOMER_ADD_CARD_TO_BASKET = 'WWC/ADD_TO_BASKET';
export const START_WATCHING_ALL_CARD_DESIGNS = 'WWC/START_WATCHING_ALL_CARD_DESIGNS';
export const SET_CARDS_LIST = 'WWC/SET_CARDS_LIST';

export const saveCardDesign = (user: UserInfo, card: Card) =>
  action(CUSTOMER_ADD_CARD_TO_BASKET, Promise.resolve(console.log(`Adding fake card to basket`, card)));

export const startWatchingAllCardDesigns = () => {
  const unsubscribe: Function = cardService.subscribeAndDispatchAllCardDesigns();
  return action(START_WATCHING_ALL_CARD_DESIGNS, unsubscribe);
};

export const setCardsList = createStandardAction(SET_CARDS_LIST)<Card[]>();
