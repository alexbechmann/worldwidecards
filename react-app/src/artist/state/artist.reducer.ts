import { ArtistState } from './artist.state';
import {
  START_WATCHING_CARD_DESIGNS_FOR_USER,
  SAVING_CARD_DESIGN,
  SAVE_CARD_DESIGN,
  SET_MY_CARD_DESIGNS_LIST,
  DELETE_CARD_DESIGN,
  DELETING_CARD_DESIGN
} from './artist.actions';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { Card } from '@wwc/core';
import { UNSET_ACTIVE_CARD } from '@app/designer/state/designer.actions';
import { AppAction } from '@app/state/app-action';
import { LOGOUT } from '@app/auth/state/auth.actions';

const defaultState: ArtistState = {
  loadingMyDesigns: true,
  myDesigns: [],
  firestoreUnsubscribeMethods: [],
  savingActiveCard: false,
  deletingActiveCardDesign: false
};

export function artistReducer(state: ArtistState = defaultState, action: AppAction): ArtistState {
  switch (action.type) {
    case START_WATCHING_CARD_DESIGNS_FOR_USER: {
      return createNewState(state, newState => {
        newState.firestoreUnsubscribeMethods.push(action.payload);
      });
    }
    case LOGOUT: {
      state.firestoreUnsubscribeMethods.forEach(unsubscribe => unsubscribe());
      return createNewState(state, newState => {
        newState.firestoreUnsubscribeMethods = [];
      });
    }
    case SAVING_CARD_DESIGN: {
      return createNewState(state, newState => {
        newState.savingActiveCard = true;
      });
    }
    case SAVE_CARD_DESIGN: {
      return createNewState(state, newState => {
        newState.savingActiveCard = false;
        newState.activeCardLastSavedDate = new Date();
      });
    }
    case UNSET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        newState.activeCardLastSavedDate = undefined;
      });
    }
    case SET_MY_CARD_DESIGNS_LIST: {
      return createNewState(state, newState => {
        newState.myDesigns = action.payload as Card[];
        newState.loadingMyDesigns = false;
      });
    }
    case DELETING_CARD_DESIGN: {
      return createNewState(state, newState => {
        newState.deletingActiveCardDesign = true;
      });
    }
    case DELETE_CARD_DESIGN: {
      return createNewState(state, newState => {
        newState.deletingActiveCardDesign = false;
      });
    }
    default: {
      return state;
    }
  }
}
