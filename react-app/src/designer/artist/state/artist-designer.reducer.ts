import { ArtistDesignerState } from './artist-designer.state';
import { AnyAction } from 'redux';
import { cardFactory } from '@wwc/core';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { UserInfo } from 'firebase';
import { LOGOUT } from '@app/auth/state/auth.action-types';
import {
  ARTIST_DESIGNER_ADD_TEXT_SHAPE,
  ARTIST_DESIGNER_SET_EDITING_SHAPE,
  ARTIST_DESIGNER_SET_MY_CARD_DESIGNS_LIST,
  ARTIST_DESIGNER_SET_ACTIVE_CARD,
  ARTIST_DESIGNER_SAVING_CARD_DESIGN,
  ARTIST_DESIGNER_SAVE_CARD_DESIGN,
  ARTIST_DESIGNER_START_WATCHING_CARD_DESIGNS_FOR_USER,
  ARTIST_DESIGNER_UNSET_ACTIVE_CARD,
  ARTIST_DESIGNER_UPDATE_TEXT,
  ARTIST_DESIGNER_TOGGLE_ALLOW_USER_EDIT,
  ToggleAllowUserEditArgs,
  ARTIST_DESIGNER_UPDATE_SHAPE_WIDTH,
  ARTIST_DESIGNER_REMOVE_SHAPE,
  ARTIST_DESIGNER_UPDATE_SHAPE_POSITION
} from './artist-designer.action-types';
import {
  AddTextShapePayload,
  UpdateShapeWidthPayload,
  UpdateShapePositionArgs,
  RemoveShapeArgs,
  UpdateTextArgs
} from '@app/designer/shared/state/designer.action-types';

const defaultState: ArtistDesignerState = {
  loadingMyDesigns: true,
  myDesigns: [],
  savingActiveCard: false,
  firestoreUnsubscribeMethods: [],
  activePageIndex: 0
};

export function artistDesignerReducer(
  state: ArtistDesignerState = defaultState,
  action: AnyAction
): ArtistDesignerState {
  switch (action.type) {
    case ARTIST_DESIGNER_ADD_TEXT_SHAPE: {
      const payload: AddTextShapePayload = action.payload;
      return createNewState(state, newState => {
        const length = newState.activeCard!.pages[payload.pageIndex].shapes.push(payload.textShape);
        newState.editingShapePosition = {
          pageIndex: payload.pageIndex,
          shapeIndex: length - 1
        };
      });
    }
    case ARTIST_DESIGNER_SET_EDITING_SHAPE: {
      return createNewState(state, newState => {
        newState.editingShapePosition = action.payload as ShapePosition;
      });
    }
    case ARTIST_DESIGNER_SET_MY_CARD_DESIGNS_LIST: {
      return createNewState(state, newState => {
        newState.myDesigns = action.payload;
        const card = newState.myDesigns.find(design => design.id === state.activeCardId);
        if (newState.activeCardId && !newState.activeCard && card) {
          newState.activeCard = card;
        }
        newState.loadingMyDesigns = false;
      });
    }
    case ARTIST_DESIGNER_SET_ACTIVE_CARD: {
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
    case ARTIST_DESIGNER_SAVING_CARD_DESIGN: {
      return createNewState(state, newState => {
        newState.savingActiveCard = true;
      });
    }
    case ARTIST_DESIGNER_SAVE_CARD_DESIGN: {
      return createNewState(state, newState => {
        newState.savingActiveCard = false;
        newState.activeCardLastSavedDate = new Date();
      });
    }
    case ARTIST_DESIGNER_START_WATCHING_CARD_DESIGNS_FOR_USER: {
      return createNewState(state, newState => {
        newState.firestoreUnsubscribeMethods.push(action.payload as Function);
      });
    }
    case LOGOUT: {
      state.firestoreUnsubscribeMethods.forEach(unsubscribe => unsubscribe());
      return defaultState;
    }
    case ARTIST_DESIGNER_UNSET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        newState.editingShapePosition = undefined;
        newState.activeCard = undefined;
        newState.activeCardId = undefined;
        newState.activeCardLastSavedDate = undefined;
      });
    }
    case ARTIST_DESIGNER_UPDATE_TEXT: {
      const payload: UpdateTextArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].textData!.text = payload.text;
      });
    }
    case ARTIST_DESIGNER_TOGGLE_ALLOW_USER_EDIT: {
      const payload: ToggleAllowUserEditArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].allowUserEdit = !newState.activeCard!
          .pages[payload.pageIndex].shapes[payload.shapeIndex].allowUserEdit;
      });
    }
    case ARTIST_DESIGNER_UPDATE_SHAPE_WIDTH: {
      const payload: UpdateShapeWidthPayload = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.position.pageIndex].shapes[payload.position.shapeIndex].width =
          payload.newWidth;
      });
    }
    case ARTIST_DESIGNER_REMOVE_SHAPE: {
      const payload: RemoveShapeArgs = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.position.pageIndex].shapes.splice(payload.position.shapeIndex, 1);
        newState.editingShapePosition = undefined;
      });
    }
    case ARTIST_DESIGNER_UPDATE_SHAPE_POSITION: {
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
