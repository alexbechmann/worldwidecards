import { Shape, Card, constants } from '@wwc/core';
import { AnyAction } from 'redux';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SAVE_CARD_DESIGN,
  SET_MY_CARD_DESIGNS_LIST
} from './card.action-types';
import { cardService } from 'src/cards/services/card.service';
import { ShapePosition } from 'src/cards/shapes/shape-position';

export function addTextShape(cardId: string, pageIndex: number, text: string): AnyAction {
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
      cardId,
      pageIndex,
      textShape
    }
  };
}

export function setEditingShape(cardId: string, position: ShapePosition): AnyAction {
  return {
    type: SET_EDITING_SHAPE,
    payload: {
      cardId,
      position
    }
  };
}

export function updateShapePosition(
  cardId: string,
  pageIndex: number,
  shapeIndex: number,
  x: number,
  y: number
): AnyAction {
  return {
    type: UPDATE_SHAPE_POSITION,
    payload: {
      cardId,
      shapeIndex,
      pageIndex,
      x,
      y
    }
  };
}

export function saveCardDesign(card: Card): AnyAction {
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
