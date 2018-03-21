import { CardState } from './card.state';
import { AnyAction } from 'redux';

const defaultState: CardState = {
  activeCard: {
    title: 'sample card title 1',
    frontPage: {
      texts: [],
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
