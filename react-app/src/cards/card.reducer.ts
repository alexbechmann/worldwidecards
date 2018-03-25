import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextShape, ImageShape, Position, Page } from '@wwc/core';
import { UPDATE_SHAPE_POSITION, ADD_TEXT_SHAPE } from './card.actions';

const defaultState: CardState = {
  activeCard: {
    title: 'sample card title 1',
    frontPage: {
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
    },
    innerLeftPage: {
      shapes: []
    },
    innerRightPage: {
      shapes: []
    },
    backPage: {
      shapes: []
    }
  }
};

export function cardReducer(state: CardState = defaultState, action: AnyAction) {
  switch (action.type) {
    case UPDATE_SHAPE_POSITION: {
      const payload: { pageName: string; shapeIndex: number; position: Position } = action.payload;
      const newState = Object.assign({}, state) as CardState;
      const page: Page = newState.activeCard[payload.pageName];
      page.shapes[payload.shapeIndex].position = payload.position;
      return newState;
    }
    case ADD_TEXT_SHAPE: {
      const payload: { pageName: string; textShape: TextShape } = action.payload;
      const newState = Object.assign({}, state) as CardState;
      const page: Page = newState.activeCard[payload.pageName];
      page.shapes.push(payload.textShape);
      return newState;
    }
    default: {
      return state;
    }
  }
}
