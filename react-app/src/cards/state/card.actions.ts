import { TextShape, Shape } from '@wwc/core';
import { AnyAction } from 'redux';
import { ADD_TEXT_SHAPE, SET_EDITING_SHAPE, UPDATE_SHAPE_POSITION } from './card.action-types';

export function addTextShape(pageIndex: number, text: string): AnyAction {
  const textShape = new TextShape({
    text: '',
    fontSize: 24,
    x: 0,
    y: 0
  });
  return {
    type: ADD_TEXT_SHAPE,
    payload: {
      pageIndex,
      textShape
    }
  };
}

export function setEditingShape(shape: Shape): AnyAction {
  return {
    type: SET_EDITING_SHAPE,
    payload: shape
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
