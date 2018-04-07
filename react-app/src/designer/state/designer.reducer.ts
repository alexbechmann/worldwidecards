import { DesignerState } from './designer.state';
import { AnyAction } from 'redux';
import { cardFactory } from '@wwc/core';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SET_ACTIVE_CARD,
  UNSET_ACTIVE_CARD,
  UPDATE_TEXT,
  UpdateShapePositionArgs,
  AddTextShapePayload,
  REMOVE_SHAPE,
  UpdateTextArgs,
  RemoveShapeArgs,
  UPDATE_SHAPE_WIDTH,
  UpdateShapeWidthPayload,
  TOGGLE_ALLOW_USER_EDIT,
  ToggleAllowUserEditArgs,
  SetActiveCardPayload
} from './designer.action-types';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { DesignerMode } from '@app/designer/designer-mode';

const defaultState: DesignerState = {
  activePageIndex: 0,
  activeCardDesignMode: DesignerMode.Customer
};

export function designerReducer(state: DesignerState = defaultState, action: AnyAction): DesignerState {
  switch (action.type) {
    case ADD_TEXT_SHAPE: {
      const payload: AddTextShapePayload = action.payload;
      return createNewState(state, newState => {
        const length = newState.activeCard!.pages[payload.pageIndex].shapes.push(payload.textShape);
        newState.editingShapePosition = {
          pageIndex: payload.pageIndex,
          shapeIndex: length - 1
        };
      });
    }
    case SET_EDITING_SHAPE: {
      return createNewState(state, newState => {
        newState.editingShapePosition = action.payload as ShapePosition;
      });
    }
    case SET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        const { card, user }: SetActiveCardPayload = action.payload;
        if (card) {
          newState.activeCard = card;
        } else {
          newState.activeCard = cardFactory.createBlankPortraitCard(user);
        }
        newState.activePageIndex = 0;
      });
    }
    case UNSET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        newState.editingShapePosition = undefined;
        newState.activeCard = undefined;
      });
    }
    case UPDATE_TEXT: {
      const payload: UpdateTextArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].textData!.text = payload.text;
      });
    }
    case TOGGLE_ALLOW_USER_EDIT: {
      const payload: ToggleAllowUserEditArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].allowUserEdit = !newState.activeCard!
          .pages[payload.pageIndex].shapes[payload.shapeIndex].allowUserEdit;
      });
    }
    case UPDATE_SHAPE_WIDTH: {
      const payload: UpdateShapeWidthPayload = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.position.pageIndex].shapes[payload.position.shapeIndex].width =
          payload.newWidth;
      });
    }
    case REMOVE_SHAPE: {
      const payload: RemoveShapeArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.position.pageIndex].shapes.splice(payload.position.shapeIndex, 1);
        newState.editingShapePosition = undefined;
      });
    }
    case UPDATE_SHAPE_POSITION: {
      const payload: UpdateShapePositionArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].x = payload.x;
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].y = payload.y;
      });
    }
    default: {
      return state;
    }
  }
}
