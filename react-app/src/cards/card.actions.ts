import { Position, TextShape } from '@wwc/core';
import { AnyAction } from 'redux';

export const UPDATE_SHAPE_POSITION = 'WWC/UPDATE_PAGE_SHAPE_POSITION';
export const ADD_TEXT_SHAPE = 'WWC/ADD_TEXT_SHAPE';

export function updateShapePosition(pageIndex: number, shapeIndex: number, position: Position): AnyAction {
  return {
    type: UPDATE_SHAPE_POSITION,
    payload: {
      shapeIndex,
      pageIndex,
      position
    }
  };
}

export function addTextShape(pageIndex: number, text: string): AnyAction {
  const textShape = new TextShape(text, '', 24, {
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
