import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextShape, ImageShape, Position, Page } from '@wwc/core';
import { UPDATE_FRONT_PAGE_SHAPE_POSITION } from './card.actions';

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
    }
  }
};

export function cardReducer(state: CardState = defaultState, action: AnyAction) {
  switch (action.type) {
    case UPDATE_FRONT_PAGE_SHAPE_POSITION: {
      const payload: { pageName: string; shapeIndex: number; position: Position } = action.payload;
      const newState = Object.assign({}, state) as CardState;
      const page: Page = newState.activeCard[payload.pageName];
      page.shapes[payload.shapeIndex].position = payload.position;
      console.log(page);
      return newState;
    }
    default: {
      return state;
    }
  }
}
