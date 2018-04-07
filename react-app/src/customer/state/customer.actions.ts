import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';
import { CUSTOMER_ADD_CARD_TO_BASKET } from './customer.action-types';

export const saveCardDesign = (user: UserInfo, card: Card) => ({
  type: CUSTOMER_ADD_CARD_TO_BASKET,
  payload: Promise.resolve(console.log(`Adding fake card to basket`, card))
});
