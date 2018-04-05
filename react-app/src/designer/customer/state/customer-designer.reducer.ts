import { CustomerDesignerState } from './customer-designer.state';
import { AnyAction } from 'redux';
import { cardFactory } from '@wwc/core';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { UserInfo } from 'firebase';
import { LOGOUT } from '@app/auth/state/auth.action-types';
import {
  CUSTOMER_DESIGNER_ADD_TEXT_SHAPE,
  CUSTOMER_DESIGNER_SET_EDITING_SHAPE,
  CUSTOMER_DESIGNER_SET_ACTIVE_CARD,
  CUSTOMER_DESIGNER_UNSET_ACTIVE_CARD,
  CUSTOMER_DESIGNER_UPDATE_TEXT,
  CUSTOMER_DESIGNER_UPDATE_SHAPE_WIDTH,
  CUSTOMER_DESIGNER_REMOVE_SHAPE,
  CUSTOMER_DESIGNER_UPDATE_SHAPE_POSITION
} from './customer-designer.action-types';
import {
  AddTextShapePayload,
  UpdateShapeWidthPayload,
  UpdateShapePositionArgs,
  RemoveShapeArgs,
  UpdateTextArgs
} from '@app/designer/shared/state/designer.action-types';

const defaultState: CustomerDesignerState = {
  activePageIndex: 0
};

export function artistDesignerReducer(
  state: CustomerDesignerState = defaultState,
  action: AnyAction
): CustomerDesignerState {
  switch (action.type) {
    case CUSTOMER_DESIGNER_ADD_TEXT_SHAPE: {
      const payload: AddTextShapePayload = action.payload;
      return createNewState(state, newState => {
        const length = newState.activeCard!.pages[payload.pageIndex].shapes.push(payload.textShape);
        newState.editingShapePosition = {
          pageIndex: payload.pageIndex,
          shapeIndex: length - 1
        };
      });
    }
    case CUSTOMER_DESIGNER_SET_EDITING_SHAPE: {
      return createNewState(state, newState => {
        newState.editingShapePosition = action.payload as ShapePosition;
      });
    }
    case LOGOUT: {
      return defaultState;
    }
    case CUSTOMER_DESIGNER_SET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        const { cardId, user }: { cardId: string; user: UserInfo } = action.payload;
        if (cardId) {
          // newState.activeCard = state.myDesigns.find(design => design.id === cardId);
          newState.activeCardId = cardId;
        } else {
          newState.activeCard = cardFactory.createBlankPortraitCard(user);
        }
        newState.activePageIndex = 0;
      });
    }
    case CUSTOMER_DESIGNER_UNSET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        newState.editingShapePosition = undefined;
        newState.activeCard = undefined;
        newState.activeCardId = undefined;
        newState.activeCardLastSavedDate = undefined;
      });
    }
    case CUSTOMER_DESIGNER_UPDATE_TEXT: {
      const payload: UpdateTextArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].textData!.text = payload.text;
      });
    }
    case CUSTOMER_DESIGNER_UPDATE_SHAPE_WIDTH: {
      const payload: UpdateShapeWidthPayload = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.position.pageIndex].shapes[payload.position.shapeIndex].width =
          payload.newWidth;
      });
    }
    case CUSTOMER_DESIGNER_REMOVE_SHAPE: {
      const payload: RemoveShapeArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.position.pageIndex].shapes.splice(payload.position.shapeIndex, 1);
        newState.editingShapePosition = undefined;
      });
    }
    case CUSTOMER_DESIGNER_UPDATE_SHAPE_POSITION: {
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
