import { Shape, constants } from '@wwc/core';
import { AnyAction } from 'redux';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SET_ACTIVE_CARD,
  UNSET_ACTIVE_CARD,
  UPDATE_TEXT,
  UpdateShapePositionArgs,
  UpdateTextArgs,
  AddTextShapeArgs,
  AddTextShapePayload,
  RemoveShapeArgs,
  REMOVE_SHAPE,
  UpdateShapeWidthArgs,
  UPDATE_SHAPE_WIDTH,
  UpdateShapeWidthPayload,
  ToggleAllowUserEditArgs,
  TOGGLE_ALLOW_USER_EDIT
} from './designer.action-types';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { UserInfo } from 'firebase';

export function addTextShape(args: AddTextShapeArgs): AnyAction {
  const textShape: Shape = {
    type: constants.shapes.types.text,
    textData: {
      text: args.text || 'New text box',
      fontSize: 24,
      color: 'black'
    },
    allowUserEdit: false,
    x: 0,
    y: 0,
    width: 300
  };
  const payload: AddTextShapePayload = {
    pageIndex: args.pageIndex,
    textShape
  };
  return {
    type: ADD_TEXT_SHAPE,
    payload: payload
  };
}

export function removeShape(args: RemoveShapeArgs): AnyAction {
  return {
    type: REMOVE_SHAPE,
    payload: args
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

export function updateShapePosition(args: UpdateShapePositionArgs): AnyAction {
  return {
    type: UPDATE_SHAPE_POSITION,
    payload: args
  };
}

export function setActiveCard(user: UserInfo, cardId?: string) {
  return {
    type: SET_ACTIVE_CARD,
    payload: {
      user,
      cardId
    }
  };
}

export function unSetActiveCard() {
  return {
    type: UNSET_ACTIVE_CARD
  };
}

export function updateText(args: UpdateTextArgs): AnyAction {
  return {
    type: UPDATE_TEXT,
    payload: args
  };
}

export function updateShapeWidth(args: UpdateShapeWidthArgs): AnyAction {
  const maxWidth = args.page.width - args.shape.x!;
  var width = args.newWidth > maxWidth ? maxWidth : args.newWidth;
  width = !width || width < 20 ? 20 : width;
  const payload: UpdateShapeWidthPayload = {
    newWidth: width,
    position: args.position
  };
  return {
    type: UPDATE_SHAPE_WIDTH,
    payload: payload
  };
}

export function toggleAllowUserEdit(args: ToggleAllowUserEditArgs) {
  return {
    type: TOGGLE_ALLOW_USER_EDIT,
    payload: args
  };
}
