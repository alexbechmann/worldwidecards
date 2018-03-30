import { Shape, Card, constants } from '@wwc/core';
import { AnyAction } from 'redux';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SAVE_CARD_DESIGN,
  SET_MY_CARD_DESIGNS_LIST,
  SET_ACTIVE_CARD,
  SAVING_CARD_DESIGN,
  UNSET_ACTIVE_CARD
} from './card.action-types';
import { cardService } from 'src/cards/services/card.service';
import { ShapePosition } from 'src/cards/shapes/shape-position';
import { store } from 'src/shared/state';

export function addTextShape(pageIndex: number, text: string): AnyAction {
  const textShape: Shape = {
    type: constants.shapes.types.text,
    textData: {
      text: '',
      fontSize: 24,
      color: 'black'
    },
    x: 0,
    y: 0
  };
  return {
    type: ADD_TEXT_SHAPE,
    payload: {
      pageIndex,
      textShape
    }
  };
}

export function setEditingShape(position: ShapePosition): AnyAction {
  return {
    type: SET_EDITING_SHAPE,
    payload: {
      ...position
    }
  };
}

export function updateShapePosition(pageIndex: number, shapeIndex: number, x: number, y: number): AnyAction {
  return {
    type: UPDATE_SHAPE_POSITION,
    payload: {
      shapeIndex,
      pageIndex,
      x,
      y
    }
  };
}

export function saveCardDesign(card: Card): AnyAction {
  store.dispatch({
    type: SAVING_CARD_DESIGN
  });
  return {
    type: SAVE_CARD_DESIGN,
    payload: cardService.saveCardDesign(card)
  };
}

export function setMyCardDesignsList(cards: Card[]): AnyAction {
  return {
    type: SET_MY_CARD_DESIGNS_LIST,
    payload: cards
  };
}

export function setActiveCard(id?: string) {
  return {
    type: SET_ACTIVE_CARD,
    payload: id
  };
}

export function unSetActiveCard() {
  return {
    type: UNSET_ACTIVE_CARD
  };
}
