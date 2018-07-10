import { store } from '@app/state/root.store';
import { cardService } from '@app/cards/services/card.service';
import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';
import { action, createStandardAction } from 'typesafe-actions';

export const START_WATCHING_CARD_DESIGNS_FOR_USER = 'WWC/START_WATCHING_CARD_DESIGNS_FOR_USER';
export const SET_MY_CARD_DESIGNS_LIST = 'WWC/SET_MY_CARD_DESIGNS_LIST';
export const SAVING_CARD_DESIGN = 'WWC/SAVING_CARD_DESIGN';
export const SAVE_CARD_DESIGN = 'WWC/SAVE_CARD_DESIGN';
export const DELETING_CARD_DESIGN = 'WWC/DELETING_CARD_DESIGN';
export const DELETE_CARD_DESIGN = 'WWC/DELETE_CARD_DESIGN';

export const savingCardDesign = () => action(SAVING_CARD_DESIGN);

export const saveCardDesign = (args: { user: UserInfo; card: Card }) => {
  const { user, card } = args;
  store.dispatch(savingCardDesign());
  return action(SAVE_CARD_DESIGN, cardService.saveCardDesign(user, card));
};

export const setMyCardDesignsList = createStandardAction(SET_MY_CARD_DESIGNS_LIST)<Card[]>();

export const startWatchingCardDesignsForUser = (user: UserInfo) => {
  const unsubscribe: Function = cardService.subscribeAndDispatchCardDesigns(user.uid);
  return action(START_WATCHING_CARD_DESIGNS_FOR_USER, unsubscribe);
};

export const deletingCardDesign = () => action(DELETING_CARD_DESIGN);

export const deleteCardDesign = (args: { id: string }) => {
  store.dispatch(deletingCardDesign());
  return action(DELETE_CARD_DESIGN, cardService.deleteCardDesignById(args.id));
};
