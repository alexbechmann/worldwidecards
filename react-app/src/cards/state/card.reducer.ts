import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextShape, cardFactory } from '@wwc/core';
import { ADD_TEXT_SHAPE } from './card.action-types';
import { createNewState } from 'src/shared/helpers/create-new-state';

const defaultState: CardState = {
  activeCard: cardFactory.createBlankPortraitCard()
};

export function cardReducer(state: CardState = defaultState, action: AnyAction): CardState {
  switch (action.type) {
    case ADD_TEXT_SHAPE: {
      const payload: { pageIndex: number; textShape: TextShape } = action.payload;
      return createNewState(state, newState => {
        newState.activeCard.pages[payload.pageIndex].shapes.push(payload.textShape);
      });
    }
    default: {
      return state;
    }
  }
}
