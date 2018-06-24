import { CustomerState } from '@app/customer/state/customer.state';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { START_WATCHING_ALL_CARD_DESIGNS, SET_CARDS_LIST } from '@app/customer/state/customer.actions';
import { AppAction } from '@app/state/app-action';

const defaultState: CustomerState = {
  cards: [],
  isSubscribedToCardChanges: false,
  loadingCards: true,
  firestoreUnsubscribeMethods: []
};

export function customerReducer(state: CustomerState = defaultState, action: AppAction) {
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
    default: {
      return state;
    }
  }
}
