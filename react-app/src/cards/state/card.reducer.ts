import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextData, cardFactory, Shape, Page, constants } from '@wwc/core';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SET_MY_CARD_DESIGNS_LIST
} from './card.action-types';
import { createNewState } from 'src/shared/helpers/create-new-state';
import { ShapePosition } from 'src/cards/shapes/shape-position';

const defaultState: CardState = {
  activeCard: cardFactory.createBlankPortraitCard(),
  cardDesigner: {},
  myDesigns: []
};

export function cardReducer(state: CardState = defaultState, action: AnyAction): CardState {
  switch (action.type) {
    case ADD_TEXT_SHAPE: {
      const payload: { pageIndex: number; textShape: TextData } = action.payload;
      return createNewState(state, newState => {
        newState.activeCard.pages[payload.pageIndex].shapes.push({
          type: constants.shapes.types.text,
          textData: payload.textShape
        });
      });
    }
    case SET_EDITING_SHAPE: {
      return createNewState(state, newState => {
        newState.cardDesigner.editingShapePosition = action.payload as ShapePosition;
      });
    }
    case SET_MY_CARD_DESIGNS_LIST: {
      return createNewState(state, newState => {
        newState.myDesigns = action.payload;
      });
    }
    case UPDATE_SHAPE_POSITION: {
      const payload: { pageIndex: number; shapeIndex: number; x: number; y: number } = action.payload;
      return createNewState(state, newState => {
        const newPages: Page[] = state.activeCard.pages.map((page, pageIndex) => {
          if (pageIndex === payload.pageIndex) {
            const newShapes: Shape[] = page.shapes.map((shape, shapeIndex) => {
              if (shapeIndex === payload.shapeIndex) {
                return {
                  ...shape,
                  x: payload.x,
                  y: payload.y
                };
              }
              return shape;
            });
            return {
              ...page,
              shapes: newShapes
            };
          } else {
            return page;
          }
        });

        newState.activeCard = {
          ...newState.activeCard,
          pages: newPages
        };
      });
    }
    default: {
      return state;
    }
  }
}
