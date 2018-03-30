import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextData, Shape, Page, constants, cardFactory } from '@wwc/core';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SET_MY_CARD_DESIGNS_LIST,
  SET_ACTIVE_CARD,
  SAVING_CARD_DESIGN,
  SAVE_CARD_DESIGN,
  UNSET_ACTIVE_CARD
} from './card.action-types';
import { createNewState } from 'src/shared/helpers/create-new-state';
import { ShapePosition } from 'src/cards/shapes/shape-position';

const defaultState: CardState = {
  myDesigns: [],
  savingActiveCard: false
};

export function cardReducer(state: CardState = defaultState, action: AnyAction): CardState {
  switch (action.type) {
    case ADD_TEXT_SHAPE: {
      const payload: { pageIndex: number; textShape: TextData } = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes.push({
          type: constants.shapes.types.text,
          textData: payload.textShape
        });
      });
    }
    case SET_EDITING_SHAPE: {
      return createNewState(state, newState => {
        newState.editingShapePosition = action.payload as ShapePosition;
      });
    }
    case SET_MY_CARD_DESIGNS_LIST: {
      return createNewState(state, newState => {
        newState.myDesigns = action.payload;
        const card = newState.myDesigns.find(design => design.id === state.activeCardId);
        if (newState.activeCardId && !newState.activeCard && card) {
          newState.activeCard = card;
        }
      });
    }
    case SET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        const id: string = action.payload;
        if (id) {
          newState.activeCard = state.myDesigns.find(design => design.id === id);
          newState.activeCardId = id;
        } else {
          newState.activeCard = cardFactory.createBlankPortraitCard();
        }
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
      });
    }
    case UNSET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        newState.editingShapePosition = undefined;
        newState.activeCard = undefined;
        newState.activeCardId = undefined;
      });
    }
    case UPDATE_SHAPE_POSITION: {
      const payload: { pageIndex: number; shapeIndex: number; x: number; y: number } = action.payload;
      return createNewState(state, newState => {
        const newPages: Page[] = state.activeCard!.pages.map((page, pageIndex) => {
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
          ...state.activeCard,
          pages: newPages
        };
      });
    }
    default: {
      return state;
    }
  }
}
