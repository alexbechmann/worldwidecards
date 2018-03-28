import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextShape, cardFactory, Shape, Card, Page, ImageShape } from '@wwc/core';
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
        const newPages: Page[] = state.activeCard.pages.map((page, pageIndex) => {
          if (pageIndex === payload.pageIndex) {
            const newShapes: Shape[] = page.shapes.map((shape, shapeIndex) => {
              if (shapeIndex === payload.shapeIndex) {
                if (shape instanceof TextShape) {
                  return new TextShape({
                    ...shape,
                    x: payload.x,
                    y: payload.y
                  });
                } else if (shape instanceof ImageShape) {
                  return new ImageShape({
                    ...shape,
                    x: payload.x,
                    y: payload.y
                  });
                }
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

        newState.activeCard = new Card(newPages);
      });
    }
    default: {
      return state;
    }
  }
}
