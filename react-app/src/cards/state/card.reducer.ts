import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextData, Shape, Page, constants } from '@wwc/core';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SET_MY_CARD_DESIGNS_LIST
} from './card.action-types';
import { createNewState } from 'src/shared/helpers/create-new-state';
import { ShapePosition } from 'src/cards/shapes/shape-position';
//   activeCard: cardFactory.createBlankPortraitCard(),
const defaultState: CardState = {
  cardDesigner: {},
  myDesigns: []
};

export function cardReducer(state: CardState = defaultState, action: AnyAction): CardState {
  switch (action.type) {
    case ADD_TEXT_SHAPE: {
      const payload: { cardId: string; pageIndex: number; textShape: TextData } = action.payload;
      return createNewState(state, newState => {
        newState.myDesigns[payload.cardId].pages[payload.pageIndex].shapes.push({
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
      const payload: { cardId: string; pageIndex: number; shapeIndex: number; x: number; y: number } = action.payload;
      const card = state.myDesigns.find(design => design.id === payload.cardId);
      if (card) {
        return createNewState(state, newState => {
          const newPages: Page[] = card.pages.map((page, pageIndex) => {
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

          const index = state.myDesigns.indexOf(card);
          newState.myDesigns[index] = {
            ...card,
            pages: newPages
          };
        });
      } else {
        return state;
      }
    }
    default: {
      return state;
    }
  }
}
