import { CardState } from './card.state';
import { AnyAction } from 'redux';

const defaultState: CardState = {
  activeCard: {
    title: 'sample card title 1',
    frontPage: {
      texts: [
        {
          text: 'Test',
          position: {
            x: 15,
            y: 15
          },
          font: '',
          fontSize: 32
        },
        {
          text: 'A longer bit of text goes here that fits on more than one line',
          position: {
            x: 15,
            y: 80
          },
          font: '',
          fontSize: 32
        }
      ],
      images: []
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
