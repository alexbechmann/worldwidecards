import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextShape, cardFactory, Shape } from '@wwc/core';
import { ADD_TEXT_SHAPE, SET_EDITING_SHAPE, UPDATE_SHAPE_POSITION } from './card.action-types';
import { createNewState } from 'src/shared/helpers/create-new-state';

const defaultState: CardState = {
  activeCard: cardFactory.createBlankPortraitCard(),
  cardDesigner: {}
};

export function cardReducer(state: CardState = defaultState, action: AnyAction): CardState {
  switch (action.type) {
    case ADD_TEXT_SHAPE: {
      const payload: { pageIndex: number; textShape: TextShape } = action.payload;
      return createNewState(state, newState => {
        newState.activeCard.pages[payload.pageIndex].shapes.push(payload.textShape);
      });
    }
    case SET_EDITING_SHAPE: {
      return createNewState(state, newState => {
        newState.cardDesigner.editingShape = action.payload as Shape;
      });
    }
    case UPDATE_SHAPE_POSITION: {
      const payload: { pageIndex: number; shapeIndex: number; x: number; y: number } = action.payload;
      return createNewState(state, newState => {
        newState.activeCard.pages[payload.pageIndex].shapes[payload.shapeIndex].x = payload.x;
        newState.activeCard.pages[payload.pageIndex].shapes[payload.shapeIndex].y = payload.y;
      });
    }
    default: {
      return state;
    }
  }
}
