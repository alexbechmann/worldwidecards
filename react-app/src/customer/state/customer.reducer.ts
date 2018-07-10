import { CustomerState } from '@app/customer/state/customer.state';
import { createNewState } from '@app/shared/helpers/create-new-state';
import {
  START_WATCHING_ALL_CARD_DESIGNS,
  SET_CARDS_LIST,
  CUSTOMER_ADD_CARD_TO_BASKET
} from '@app/customer/state/customer.actions';
import { AppAction } from '@app/state/app-action';

const defaultState: CustomerState = {
  cards: [],
  isSubscribedToCardChanges: false,
  loadingCards: true,
  firestoreUnsubscribeMethods: [],
  basket: []
};

export function customerReducer(state: CustomerState = defaultState, action: AppAction): CustomerState {
  switch (action.type) {
    case START_WATCHING_ALL_CARD_DESIGNS: {
      return createNewState(state, newState => {
        newState.isSubscribedToCardChanges = true;
      });
    }
    case SET_CARDS_LIST: {
      return createNewState(state, newState => {
        newState.cards = action.payload;
        newState.loadingCards = false;
      });
    }
    case CUSTOMER_ADD_CARD_TO_BASKET: {
      return createNewState(state, newState => {
        newState.basket = [...state.basket, action.payload.card];
      });
    }
    default: {
      return state;
    }
  }
}
