import { CardState } from './card.state';
import { AnyAction } from 'redux';
import { TextShape, ImageShape } from '@core/index';

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
        })
      ]
    }
  }
};

export function cardReducer(state: CardState = defaultState, action: AnyAction) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
