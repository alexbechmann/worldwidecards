import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextShape, ImageShape, Card } from '@wwc/core';
import { ADD_TEXT_SHAPE } from './card.action-types';

const defaultState: CardState = {
  activeCard: new Card([
    {
      shapes: [
        new TextShape({
          x: 25,
          y: 25,
          text: 'Test text',
          fontSize: 24
        }),
        new ImageShape({
          href: 'http://konvajs.github.io/assets/yoda.jpg',
          x: 45,
          y: 65
        }),
        new TextShape({
          x: 25,
          y: 400,
          text: 'Bottom text',
          fontSize: 24
        })
      ]
    }
  ])
};

export function cardReducer(state: CardState = defaultState, action: AnyAction): CardState {
  switch (action.type) {
    case ADD_TEXT_SHAPE: {
      const payload: { pageIndex: number; textShape: TextShape } = action.payload;
      const newState = Object.assign({}, state) as CardState;
      newState.activeCard.pages[payload.pageIndex].shapes.push(payload.textShape);
      return newState;
    }
    default: {
      return state;
    }
  }
}
