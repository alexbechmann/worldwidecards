import { ArtistState } from './artist.state';
import { AnyAction } from 'redux';
import {
  START_WATCHING_CARD_DESIGNS_FOR_USER,
  SAVING_CARD_DESIGN,
  SAVE_CARD_DESIGN,
  SET_MY_CARD_DESIGNS_LIST,
  DELETE_CARD_DESIGN,
  DELETING_CARD_DESIGN
} from './artist.action-types';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { LOGOUT } from '@app/auth/state/auth.action-types';
import { Card } from '@wwc/core';
import { UNSET_ACTIVE_CARD } from '@app/designer/state/designer.actions';

const defaultState: ArtistState = {
  loadingMyDesigns: true,
  myDesigns: [],
  firestoreUnsubscribeMethods: [],
  savingActiveCard: false,
  deletingActiveCardDesign: false
};

export function artistReducer(state: ArtistState = defaultState, action: AnyAction): ArtistState {
  switch (action.type) {
    case START_WATCHING_CARD_DESIGNS_FOR_USER: {
      return createNewState(state, newState => {
        newState.firestoreUnsubscribeMethods.push(action.payload as Function);
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
