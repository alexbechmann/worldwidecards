import { Shape, Card, constants } from '@wwc/core';
import { AnyAction } from 'redux';
import { cardService } from '@app/cards/services/card.service';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { store } from '@app/shared/state';
import { UserInfo } from 'firebase';
import * as firebase from 'firebase';
import {
  CUSTOMER_DESIGNER_ADD_TEXT_SHAPE,
  CUSTOMER_DESIGNER_REMOVE_SHAPE,
  CUSTOMER_DESIGNER_SET_EDITING_SHAPE,
  CUSTOMER_DESIGNER_UPDATE_SHAPE_POSITION,
  CUSTOMER_DESIGNER_SET_ACTIVE_CARD,
  CUSTOMER_DESIGNER_UNSET_ACTIVE_CARD,
  CUSTOMER_DESIGNER_UPDATE_TEXT,
  CUSTOMER_DESIGNER_UPDATE_SHAPE_WIDTH
} from './customer-designer.action-types';
import {
  UpdateTextArgs,
  UpdateShapeWidthArgs,
  UpdateShapeWidthPayload,
  RemoveShapeArgs,
  AddTextShapePayload,
  UpdateShapePositionArgs,
  AddTextShapeArgs
} from '@app/designer/shared/state/designer.action-types';

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
    type: CUSTOMER_DESIGNER_ADD_TEXT_SHAPE,
    payload: payload
  };
}

export function removeShape(args: RemoveShapeArgs): AnyAction {
  return {
    type: CUSTOMER_DESIGNER_REMOVE_SHAPE,
    payload: args
  };
}

export function setEditingShape(position: ShapePosition): AnyAction {
  return {
    type: CUSTOMER_DESIGNER_SET_EDITING_SHAPE,
    payload: {
      ...position
    }
  };
}

export function updateShapePosition(args: UpdateShapePositionArgs): AnyAction {
  return {
    type: CUSTOMER_DESIGNER_UPDATE_SHAPE_POSITION,
    payload: args
  };
}

export function setActiveCard(user: UserInfo, cardId?: string) {
  return {
    type: CUSTOMER_DESIGNER_SET_ACTIVE_CARD,
    payload: {
      user,
      cardId
    }
  };
}

export function unSetActiveCard() {
  return {
    type: CUSTOMER_DESIGNER_UNSET_ACTIVE_CARD
  };
}

export function updateText(args: UpdateTextArgs): AnyAction {
  return {
    type: CUSTOMER_DESIGNER_UPDATE_TEXT,
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
    type: CUSTOMER_DESIGNER_UPDATE_SHAPE_WIDTH,
    payload: payload
  };
}
