import { Shape, Page, Card, CropData } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { UserInfo } from 'firebase';
import { DesignerMode } from '@app/designer/designer-mode';

export const ADD_TEXT_SHAPE = 'WWC/ADD_TEXT_SHAPE';
export type AddTextShapeArgs = { pageIndex: number; text?: string; page: Page };
export type AddTextShapePayload = { pageIndex: number; textShape: Shape };

export const UPDATE_SHAPE_WIDTH = 'WWC/UPDATE_SHAPE_WIDTH';
export type UpdateShapeWidthArgs = { position: ShapePosition; newWidth: number; shape: Shape; page: Page };
export type UpdateShapeWidthPayload = { position: ShapePosition; newWidth: number };

export const REMOVE_SHAPE = '/WWC/REMOVE_SHAPE';
export type RemoveShapeArgs = { position: ShapePosition };

export const UPDATE_TEXT = 'WWC/UPDATE_TEXT';
export type UpdateTextArgs = { pageIndex: number; shapeIndex: number; text: string };

export const SET_EDITING_SHAPE = 'WWC/SET_EDITING_SHAPE';
export const REMOVE_EDITING_SHAPE = 'WWC/REMOVE_EDITING_SHAPE';

export const UPDATE_SHAPE_POSITION = 'WWC/UPDATE_PAGE_SHAPE_POSITION';
export type UpdateShapePositionArgs = { pageIndex: number; shapeIndex: number; x: number; y: number };

export const SET_ACTIVE_CARD = 'WWC/SET_ACTIVE_CARD';
export type SetActiveCardArgs = { user: UserInfo; cardId?: string; mode: DesignerMode };
export type SetActiveCardPayload = { user: UserInfo; card?: Card; mode: DesignerMode };

export const UNSET_ACTIVE_CARD = 'WWC/UNSET_ACTIVE_CARD';

export const TOGGLE_ALLOW_USER_EDIT = 'TOGGLE_ALLOW_USER_EDIT';
export type ToggleAllowUserEditArgs = { pageIndex: number; shapeIndex: number };

export const SET_IMAGE_CROP = 'WWC/SET_IMAGE_CROP';
export type SetImageCropArgs = {
  cropData: CropData;
  shapePosition: ShapePosition;
  ratio: { width: number; height: number };
};
export type SetImageCropPayload = SetImageCropArgs;

export const UPDATE_IMAGE_HREF = 'WWC/UPDATE_IMAGE_HREF';
export type UpdateImageHrefArgs = { shapePosition: ShapePosition; url: string };
export type UpdateImageHrefPayload = UpdateImageHrefArgs;

export const SET_ACTIVE_PAGE = 'WWC/SET_ACTIVE_PAGE';

export const SORT_SHAPES = 'WWC/SORT_SHAPES';
