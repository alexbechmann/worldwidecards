import { store } from '@app/shared/state';
import { cardService } from '@app/cards/services/card.service';
import { UserInfo } from 'firebase';
import {
  SAVING_CARD_DESIGN,
  SAVE_CARD_DESIGN,
  SET_MY_CARD_DESIGNS_LIST,
  START_WATCHING_CARD_DESIGNS_FOR_USER,
  DeleteCardDesignArgs,
  DELETE_CARD_DESIGN,
  DELETING_CARD_DESIGN
} from './artist.action-types';
import { Card } from '@wwc/core';
import { AnyAction } from 'redux';

export function saveCardDesign(user: UserInfo, card: Card): AnyAction {
  store.dispatch({
    type: SAVING_CARD_DESIGN
  });
  return {
    type: SAVE_CARD_DESIGN,
    payload: cardService.saveCardDesign(user, card)
  };
}

export function setMyCardDesignsList(cards: Card[]): AnyAction {
  return {
    type: SET_MY_CARD_DESIGNS_LIST,
    payload: cards
  };
}

export function startWatchingCardDesignsForUser(user: UserInfo): AnyAction {
  const unsubscribe: Function = cardService.subscribeAndDispatchCardDesigns(user.uid);
  return {
    type: START_WATCHING_CARD_DESIGNS_FOR_USER,
    payload: unsubscribe
  };
}

export function deleteCardDesign(args: DeleteCardDesignArgs): AnyAction {
  store.dispatch({
    type: DELETING_CARD_DESIGN
  });
  return {
    type: DELETE_CARD_DESIGN,
    payload: cardService.deleteCardDesignById(args.id)
  };
}
