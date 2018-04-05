import { Shape, Card, constants } from '@wwc/core';
import { AnyAction } from 'redux';
import { cardService } from '@app/cards/services/card.service';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { store } from '@app/shared/state';
import { UserInfo } from 'firebase';
import * as firebase from 'firebase';
import {
  ARTIST_DESIGNER_ADD_TEXT_SHAPE,
  ARTIST_DESIGNER_REMOVE_SHAPE,
  ARTIST_DESIGNER_SET_EDITING_SHAPE,
  ARTIST_DESIGNER_UPDATE_SHAPE_POSITION,
  ARTIST_DESIGNER_SAVING_CARD_DESIGN,
  ARTIST_DESIGNER_SAVE_CARD_DESIGN,
  ARTIST_DESIGNER_SET_MY_CARD_DESIGNS_LIST,
  ARTIST_DESIGNER_SET_ACTIVE_CARD,
  ARTIST_DESIGNER_UNSET_ACTIVE_CARD,
  ARTIST_DESIGNER_START_WATCHING_CARD_DESIGNS_FOR_USER,
  ARTIST_DESIGNER_UPDATE_TEXT,
  ARTIST_DESIGNER_UPDATE_SHAPE_WIDTH,
  ToggleAllowUserEditArgs,
  ARTIST_DESIGNER_TOGGLE_ALLOW_USER_EDIT
} from './artist-designer.action-types';
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
    type: ARTIST_DESIGNER_ADD_TEXT_SHAPE,
    payload: payload
  };
}

export function removeShape(args: RemoveShapeArgs): AnyAction {
  return {
    type: ARTIST_DESIGNER_REMOVE_SHAPE,
    payload: args
  };
}

export function setEditingShape(position: ShapePosition): AnyAction {
  return {
    type: ARTIST_DESIGNER_SET_EDITING_SHAPE,
    payload: {
      ...position
    }
  };
}

export function updateShapePosition(args: UpdateShapePositionArgs): AnyAction {
  return {
    type: ARTIST_DESIGNER_UPDATE_SHAPE_POSITION,
    payload: args
  };
}

export function saveCardDesign(user: UserInfo, card: Card): AnyAction {
  store.dispatch({
    type: ARTIST_DESIGNER_SAVING_CARD_DESIGN
  });
  return {
    type: ARTIST_DESIGNER_SAVE_CARD_DESIGN,
    payload: cardService.saveCardDesign(user, card)
  };
}

export function setMyCardDesignsList(cards: Card[]): AnyAction {
  return {
    type: ARTIST_DESIGNER_SET_MY_CARD_DESIGNS_LIST,
    payload: cards
  };
}

export function setActiveCard(user: UserInfo, cardId?: string) {
  return {
    type: ARTIST_DESIGNER_SET_ACTIVE_CARD,
    payload: {
      user,
      cardId
    }
  };
}

export function unSetActiveCard() {
  return {
    type: ARTIST_DESIGNER_UNSET_ACTIVE_CARD
  };
}

export function startWatchingCardDesignsForUser(user: UserInfo): AnyAction {
  const db = firebase.firestore();
  const cardDesigns = db.collection('card-designs').where('userId', '==', user.uid);
  const unsubscribe = cardDesigns.onSnapshot(snapshot => {
    const cards: Card[] = snapshot.docs.map(doc => {
      const card = doc.data() as Card;
      card.id = doc.id;
      return card;
    });
    const action = setMyCardDesignsList(cards);
    store.dispatch(action);
  });
  return {
    type: ARTIST_DESIGNER_START_WATCHING_CARD_DESIGNS_FOR_USER,
    payload: unsubscribe
  };
}

export function updateText(args: UpdateTextArgs): AnyAction {
  return {
    type: ARTIST_DESIGNER_UPDATE_TEXT,
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
    type: ARTIST_DESIGNER_UPDATE_SHAPE_WIDTH,
    payload: payload
  };
}

export function toggleAllowUserEdit(args: ToggleAllowUserEditArgs) {
  return {
    type: ARTIST_DESIGNER_TOGGLE_ALLOW_USER_EDIT,
    payload: args
  };
}
