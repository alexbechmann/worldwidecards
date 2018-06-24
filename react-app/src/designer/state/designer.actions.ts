import { Shape, constants, Card, Page, CropData } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { cardService } from '@app/cards/services/card.service';
import { action, createStandardAction, createAction } from 'typesafe-actions';
import { UserInfo } from 'firebase';
import { DesignerMode } from '@app/designer/designer-mode';

export const ADD_TEXT_SHAPE = 'WWC/ADD_TEXT_SHAPE';
// export type { pageIndex: number; text?: string; page: Page } = { pageIndex: number; text?: string; page: Page };
// export type AddTextShapePayload = { pageIndex: number; textShape: Shape };

export const UPDATE_SHAPE_WIDTH = 'WWC/UPDATE_SHAPE_WIDTH';
// export type { position: ShapePosition; newWidth: number; shape: Shape; page: Page } = { position: ShapePosition; newWidth: number; shape: Shape; page: Page };
// export type UpdateShapeWidthPayload = { position: ShapePosition; newWidth: number };

export const REMOVE_SHAPE = '/WWC/REMOVE_SHAPE';
// export type RemoveShapeArgs = { position: ShapePosition };

export const UPDATE_TEXT = 'WWC/UPDATE_TEXT';
// export type { pageIndex: number; shapeIndex: number; text: string } = { pageIndex: number; shapeIndex: number; text: string };

export const SET_EDITING_SHAPE = 'WWC/SET_EDITING_SHAPE';
export const REMOVE_EDITING_SHAPE = 'WWC/REMOVE_EDITING_SHAPE';

export const UPDATE_SHAPE_POSITION = 'WWC/UPDATE_PAGE_SHAPE_POSITION';
// export type { pageIndex: number; shapeIndex: number; x: number; y: number } = { pageIndex: number; shapeIndex: number; x: number; y: number };

export const SET_ACTIVE_CARD = 'WWC/SET_ACTIVE_CARD';
// export type { user: UserInfo; cardId?: string; mode: DesignerMode } = { user: UserInfo; cardId?: string; mode: DesignerMode };
// export type SetActiveCardPayload = { user: UserInfo; card?: Card; mode: DesignerMode };

export const UNSET_ACTIVE_CARD = 'WWC/UNSET_ACTIVE_CARD';

export const TOGGLE_ALLOW_USER_EDIT = 'TOGGLE_ALLOW_USER_EDIT';
// export type { pageIndex: number; shapeIndex: number } = { pageIndex: number; shapeIndex: number };

export const SET_IMAGE_CROP = 'WWC/SET_IMAGE_CROP';
// export type SetImageCropArgs = {
//   cropData: CropData;
//   shapePosition: ShapePosition;
//   ratio: { width: number; height: number };
// };
// export type SetImageCropPayload = SetImageCropArgs;

export const UPDATE_IMAGE_HREF = 'WWC/UPDATE_IMAGE_HREF';
// export type { shapePosition: ShapePosition; url: string } = { shapePosition: ShapePosition; url: string };
// export type UpdateImageHrefPayload = { shapePosition: ShapePosition; url: string };

export const SET_ACTIVE_PAGE = 'WWC/SET_ACTIVE_PAGE';

export const SORT_SHAPES = 'WWC/SORT_SHAPES';

export const removeEditingShape = createStandardAction(REMOVE_EDITING_SHAPE)<ShapePosition>();

export const addTextShape = (args: { pageIndex: number; text?: string; page: Page }) => {
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
  const payload = {
    pageIndex: args.pageIndex,
    textShape
  };
  return action(ADD_TEXT_SHAPE, payload);
};

export const removeShape = createStandardAction(REMOVE_SHAPE)<ShapePosition>();

export const setEditingShape = createStandardAction(SET_EDITING_SHAPE)<ShapePosition>();

export const updateShapePosition = createStandardAction(UPDATE_SHAPE_POSITION)<{
  pageIndex: number;
  shapeIndex: number;
  x: number;
  y: number;
}>();

export const setActiveCard = createAction(SET_ACTIVE_CARD, resolveAction => {
  return (args: { user: UserInfo; cardId?: string; mode: DesignerMode }) => {
    type SetActiveCardPayload = { user: UserInfo; card?: Card; mode: DesignerMode };
    let payload: SetActiveCardPayload | Promise<SetActiveCardPayload>;
    if (args.cardId) {
      payload = new Promise(async (resolve, reject) => {
        const card: Card = await cardService.getCardDesignById(args.cardId!);
        const payload = {
          user: args.user,
          mode: args.mode,
          card: card
        };
        resolve(payload);
      });
    } else {
      const p = {
        user: args.user,
        mode: args.mode,
        card: undefined
      };
      payload = p;
    }

    return resolveAction(payload as SetActiveCardPayload);
  };
});

export const unSetActiveCard = () => action(UNSET_ACTIVE_CARD);

export const updateText = createStandardAction(UPDATE_TEXT)<{ pageIndex: number; shapeIndex: number; text: string }>();

export const updateShapeWidth = createAction(
  UPDATE_SHAPE_WIDTH,
  resolve => (args: { position: ShapePosition; newWidth: number; shape: Shape; page: Page }) => {
    const maxWidth = args.page.width - args.shape.x!;
    var width = args.newWidth > maxWidth ? maxWidth : args.newWidth;
    width = !width || width < 20 ? 20 : width;
    const payload = {
      newWidth: width,
      position: args.position
    };
    return resolve(payload);
  }
);

export const toggleAllowUserEdit = createStandardAction(TOGGLE_ALLOW_USER_EDIT)<{
  pageIndex: number;
  shapeIndex: number;
}>();

export const setImageCrop = createStandardAction(SET_IMAGE_CROP)<{
  cropData: CropData;
  shapePosition: ShapePosition;
  ratio: { width: number; height: number };
}>();

export const updateImageHref = createStandardAction(UPDATE_IMAGE_HREF)<{ shapePosition: ShapePosition; url: string }>();

export const setActivePage = createStandardAction(SET_ACTIVE_PAGE)<{ pageIndex: number }>();

export const sortShapes = createStandardAction(SORT_SHAPES)<{ pageIndex: number }>();
