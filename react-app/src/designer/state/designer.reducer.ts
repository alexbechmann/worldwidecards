import { DesignerState } from './designer.state';
import { cardFactory, constants } from '@wwc/core';
import {
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SET_ACTIVE_CARD,
  UNSET_ACTIVE_CARD,
  UPDATE_TEXT,
  REMOVE_SHAPE,
  UPDATE_SHAPE_WIDTH,
  TOGGLE_ALLOW_USER_EDIT,
  REMOVE_EDITING_SHAPE,
  SET_IMAGE_CROP,
  UPDATE_IMAGE_HREF,
  SET_ACTIVE_PAGE,
  SORT_SHAPES,
  ADD_TEXT_SHAPE
} from './designer.actions';
import { createNewState } from '@app/shared/helpers/create-new-state';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppAction } from '@app/state/app-action';

const defaultState: DesignerState = {
  activePageIndex: 0,
  activeCardDesignMode: DesignerMode.Customer
};

export function designerReducer(state: DesignerState = defaultState, action: AppAction): DesignerState {
  switch (action.type) {
    case ADD_TEXT_SHAPE: {
      return createNewState(state, newState => {
        const length = newState.activeCard!.pages[action.payload.pageIndex].shapes.push(action.payload.textShape);
        newState.editingShapePosition = {
          pageIndex: action.payload.pageIndex,
          shapeIndex: length - 1
        };
      });
    }
    case SET_EDITING_SHAPE: {
      return createNewState(state, newState => {
        newState.editingShapePosition = action.payload;
      });
    }
    case REMOVE_EDITING_SHAPE: {
      return createNewState(state, newState => {
        newState.editingShapePosition = undefined;
      });
    }
    case SET_ACTIVE_CARD: {
      return createNewState(state, newState => {
        const { card, user, mode } = action.payload;
        if (card) {
          newState.activeCard = card;
        } else {
          newState.activeCard = cardFactory.createBlankPortraitCard(user);
        }
        newState.activeCardDesignMode = mode;
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
      const payload = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].textData!.text = payload.text;
      });
    }
    case TOGGLE_ALLOW_USER_EDIT: {
      const payload = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].allowUserEdit = !newState.activeCard!
          .pages[payload.pageIndex].shapes[payload.shapeIndex].allowUserEdit;
      });
    }
    case UPDATE_SHAPE_WIDTH: {
      const payload = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.position.pageIndex].shapes[payload.position.shapeIndex].width =
          payload.newWidth;
      });
    }
    case REMOVE_SHAPE: {
      const payload = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.pageIndex].shapes.splice(payload.shapeIndex, 1);
        newState.editingShapePosition = undefined;
      });
    }
    case UPDATE_SHAPE_POSITION: {
      const payload = action.payload;
      return createNewState(state, newState => {
        // newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].x = payload.x;
        newState.activeCard!.pages[payload.pageIndex].shapes[payload.shapeIndex].y = payload.y;
      });
    }
    case SORT_SHAPES: {
      const { pageIndex } = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[pageIndex].shapes = newState.activeCard!.pages[pageIndex].shapes.sort((a, b) => {
          return a.y! - b.y!;
        });
      });
    }
    case SET_IMAGE_CROP: {
      const payload = action.payload;
      if (payload.cropData.width > 0 && payload.cropData.height > 0) {
        return createNewState(state, newState => {
          newState.activeCard!.pages[payload.shapePosition.pageIndex].shapes[
            payload.shapePosition.shapeIndex
          ].imageData!.crop =
            payload.cropData;
          newState.activeCard!.pages[payload.shapePosition.pageIndex].shapes[
            payload.shapePosition.shapeIndex
          ].imageData!.ratio =
            payload.ratio;
        });
      } else {
        return state;
      }
    }
    case UPDATE_IMAGE_HREF: {
      const payload = action.payload;
      return createNewState(state, newState => {
        newState.activeCard!.pages[payload.shapePosition.pageIndex].shapes[
          payload.shapePosition.shapeIndex
        ].imageData!.href =
          payload.url;
        newState.activeCard!.pages[payload.shapePosition.pageIndex].shapes[
          payload.shapePosition.shapeIndex
        ].imageData!.crop = undefined;
      });
    }
    case SET_ACTIVE_PAGE: {
      return createNewState(state, newState => {
        const { pageIndex } = action.payload;
        newState.activePageIndex = pageIndex;
        if (!newState.activeCard!.pages[pageIndex]) {
          newState.activeCard!.pages[pageIndex] = {
            shapes: [],
            height: constants.card.dimensions.portrait.height,
            width: constants.card.dimensions.portrait.width
          };
        }
      });
    }
    default: {
      return state;
    }
  }
}
