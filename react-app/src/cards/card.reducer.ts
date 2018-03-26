import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextShape, ImageShape, Position, Card } from '@wwc/core';
import { UPDATE_SHAPE_POSITION, ADD_TEXT_SHAPE } from './card.actions';
import * as deepFreeze from 'deep-freeze';

const defaultState: CardState = {
  activeCard: new Card([
    {
      shapes: [
        new TextShape('Test text', '', 24, {
          x: 25,
          y: 25
        }),
        new ImageShape('http://konvajs.github.io/assets/yoda.jpg', {
          x: 45,
          y: 65
        }),
        new TextShape('Bottom text', '', 24, {
          x: 25,
          y: 400
        })
      ]
    }
  ])
};

export function cardReducer(state: CardState = defaultState, action: AnyAction) {
  switch (action.type) {
    case UPDATE_SHAPE_POSITION: {
      const payload: { pageIndex: number; shapeIndex: number; position: Position } = action.payload;
      const newState = Object.assign({}, state) as CardState;
      newState.activeCard.pages[payload.pageIndex].shapes[payload.shapeIndex].position = payload.position;
      return deepFreeze(newState);
    }
    case ADD_TEXT_SHAPE: {
      const payload: { pageIndex: number; textShape: TextShape } = action.payload;
      const newState = Object.assign({}, state) as CardState;
      newState.activeCard.pages[payload.pageIndex].shapes.push(payload.textShape);
      return deepFreeze(newState);
    }
    default: {
      return state;
    }
  }
}
