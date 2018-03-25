import { Position } from '@wwc/core';
import { AnyAction } from 'redux';

export const UPDATE_FRONT_PAGE_SHAPE_POSITION = 'WWC/UPDATE_FRONT_PAGE_SHAPE_POSITION';

export function updateFrontPageShapePosition(pageName: string, shapeIndex: number, position: Position): AnyAction {
  return {
    type: UPDATE_FRONT_PAGE_SHAPE_POSITION,
    payload: {
      shapeIndex,
      pageName,
      position
    }
  };
}
