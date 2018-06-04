import { Shape, constants, Card } from '@wwc/core';
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
  TOGGLE_ALLOW_USER_EDIT,
  SetActiveCardArgs,
  SetActiveCardPayload,
  REMOVE_EDITING_SHAPE,
  SET_IMAGE_CROP,
  SetImageCropPayload,
  SetImageCropArgs,
  UPDATE_IMAGE_HREF,
  UpdateImageHrefPayload,
  UpdateImageHrefArgs,
  UpdateImageRatioArgs,
  UPDATE_IMAGE_RATIO,
  UpdateImageRatioPayload,
  SET_ACTIVE_PAGE
} from './designer.action-types';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { cardService } from '@app/cards/services/card.service';

export function removeEditingShape(position: ShapePosition): AnyAction {
  return {
    type: REMOVE_EDITING_SHAPE
  };
}

export function addTextShape(args: AddTextShapeArgs): AnyAction {
  const textShape: Shape = {
    type: constants.shapes.types.text,
    textData: {
      text: args.text || 'New text box',
      fontSize: 34,
      color: 'navy'
    },
    allowUserEdit: false,
    x: 0,
    y: 0,
    width: args.page.width
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

export function setActiveCard(args: SetActiveCardArgs) {
  var actionPayload: any;
  if (args.cardId) {
    actionPayload = new Promise(async (resolve, reject) => {
      const card: Card = await cardService.getCardDesignById(args.cardId!);
      const payload: SetActiveCardPayload = {
        user: args.user,
        mode: args.mode,
        card: card
      };
      resolve(payload);
    });
  } else {
    const p: SetActiveCardPayload = {
      user: args.user,
      mode: args.mode,
      card: undefined
    };
    actionPayload = p;
  }

  return {
    type: SET_ACTIVE_CARD,
    payload: actionPayload
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

export function setImageCrop(args: SetImageCropArgs) {
  return {
    type: SET_IMAGE_CROP,
    payload: args as SetImageCropPayload
  };
}

export function updateImageHref(args: UpdateImageHrefArgs) {
  return {
    type: UPDATE_IMAGE_HREF,
    payload: args as UpdateImageHrefPayload
  };
}

export function updateImageRatio(args: UpdateImageRatioArgs) {
  return {
    type: UPDATE_IMAGE_RATIO,
    payload: args as UpdateImageRatioPayload
  };
}

export function setActivePage(pageIndex: number) {
  return {
    type: SET_ACTIVE_PAGE,
    pageIndex
  };
}
