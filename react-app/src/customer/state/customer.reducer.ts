import { CustomerState } from '@app/customer/state/customer.state';
import { AnyAction } from 'redux';
import { START_WATCHING_ALL_CARD_DESIGNS, SET_CARDS_LIST } from '@app/customer/state/customer.action-types';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { Card } from '@wwc/core';
import { LOGOUT } from '@app/auth/state/auth.action-types';

const defaultState: CustomerState = {
  cards: [],
  isSubscribedToCardChanges: false,
  loadingCards: true,
  firestoreUnsubscribeMethods: []
};

export function customerReducer(state: CustomerState = defaultState, action: AnyAction) {
  switch (action.type) {
    case START_WATCHING_ALL_CARD_DESIGNS: {
      return createNewState(state, newState => {
        newState.isSubscribedToCardChanges = true;
      });
    }
    case SET_CARDS_LIST: {
      return createNewState(state, newState => {
        newState.cards = action.payload as Card[];
        newState.loadingCards = false;
      });
    }
    default: {
      return state;
    }
  }
}
