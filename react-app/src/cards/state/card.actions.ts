import { TextShape } from '@wwc/core';
import { AnyAction } from 'redux';
import { ADD_TEXT_SHAPE } from './card.action-types';

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
