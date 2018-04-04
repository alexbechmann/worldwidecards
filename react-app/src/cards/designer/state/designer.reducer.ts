import { DesignerState } from './designer.state';
import { AnyAction } from 'redux';
import { cardFactory } from '@wwc/core';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SET_MY_CARD_DESIGNS_LIST,
  SET_ACTIVE_CARD,
  SAVING_CARD_DESIGN,
  SAVE_CARD_DESIGN,
  UNSET_ACTIVE_CARD,
  START_WATCHING_CARD_DESIGNS_FOR_USER,
  UPDATE_TEXT,
  UpdateShapePositionArgs,
  AddTextShapePayload,
  REMOVE_SHAPE,
  UpdateTextArgs,
  RemoveShapeArgs,
  UPDATE_SHAPE_WIDTH,
  UpdateShapeWidthPayload,
  TOGGLE_ALLOW_USER_EDIT,
  ToggleAllowUserEditArgs
} from './designer.action-types';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { UserInfo } from 'firebase';
import { LOGOUT } from '@app/auth/state/auth.action-types';

const defaultState: DesignerState = {
  loadingMyDesigns: true,
  myDesigns: [],
  savingActiveCard: false,
  firestoreUnsubscribeMethods: [],
  activePageIndex: 0
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
    case SET_MY_CARD_DESIGNS_LIST: {
      return createNewState(state, newState => {
        newState.myDesigns = action.payload;
        const card = newState.myDesigns.find(design => design.id === state.activeCardId);
        if (newState.activeCardId && !newState.activeCard && card) {
          newState.activeCard = card;
        }
        newState.loadingMyDesigns = false;
      });
    }
    case SET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        const { cardId, user }: { cardId: string; user: UserInfo } = action.payload;
        if (cardId) {
          newState.activeCard = state.myDesigns.find(design => design.id === cardId);
          newState.activeCardId = cardId;
        } else {
          newState.activeCard = cardFactory.createBlankPortraitCard(user);
        }
        newState.activePageIndex = 0;
      });
    }
    case SAVING_CARD_DESIGN: {
      return createNewState(state, newState => {
        newState.savingActiveCard = true;
      });
    }
    case SAVE_CARD_DESIGN: {
      return createNewState(state, newState => {
        newState.savingActiveCard = false;
        newState.activeCardLastSavedDate = new Date();
      });
    }
    case START_WATCHING_CARD_DESIGNS_FOR_USER: {
      return createNewState(state, newState => {
        newState.firestoreUnsubscribeMethods.push(action.payload as Function);
      });
    }
    case LOGOUT: {
      state.firestoreUnsubscribeMethods.forEach(unsubscribe => unsubscribe());
      return createNewState(state, newState => {
        newState.firestoreUnsubscribeMethods = [];
      });
    }
    case UNSET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        newState.editingShapePosition = undefined;
        newState.activeCard = undefined;
        newState.activeCardId = undefined;
        newState.activeCardLastSavedDate = undefined;
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
      console.log(payload);
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
