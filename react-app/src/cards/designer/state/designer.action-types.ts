import { Shape } from '@wwc/core';
import { ShapePosition } from 'src/cards/shapes/shape-position';

export const ADD_TEXT_SHAPE = 'WWC/ADD_TEXT_SHAPE';
export type AddTextShapeArgs = { pageIndex: number; text?: string };
export type AddTextShapePayload = { pageIndex: number; textShape: Shape };

export const REMOVE_SHAPE = '/WWC/REMOVE_SHAPE';
export type RemoveShapeArgs = { position: ShapePosition };

export const UPDATE_TEXT = 'WWC/UPDATE_TEXT';
export type UpdateTextArgs = { pageIndex: number; shapeIndex: number; text: string };

export const SET_EDITING_SHAPE = 'WWC/SET_EDITING_SHAPE';

export const UPDATE_SHAPE_POSITION = 'WWC/UPDATE_PAGE_SHAPE_POSITION';
export type UpdateShapePositionArgs = { pageIndex: number; shapeIndex: number; x: number; y: number };

export const SAVING_CARD_DESIGN = 'WWC/SAVING_CARD_DESIGN';
export const SAVE_CARD_DESIGN = 'WWC/SAVE_CARD_DESIGN';

export const SET_MY_CARD_DESIGNS_LIST = 'WWC/SET_MY_CARD_DESIGNS_LIST';

export const SET_ACTIVE_CARD = 'WWC/SET_ACTIVE_CARD';
export const UNSET_ACTIVE_CARD = 'WWC/UNSET_ACTIVE_CARD';

export const START_WATCHING_CARD_DESIGNS_FOR_USER = 'WWC/START_WATCHING_CARD_DESIGNS_FOR_USER';
