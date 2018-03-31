import { Shape, Card, constants } from '@wwc/core';
import { AnyAction } from 'redux';
import {
  ADD_TEXT_SHAPE,
  SET_EDITING_SHAPE,
  UPDATE_SHAPE_POSITION,
  SAVE_CARD_DESIGN,
  SET_MY_CARD_DESIGNS_LIST,
  SET_ACTIVE_CARD,
  SAVING_CARD_DESIGN,
  UNSET_ACTIVE_CARD,
  START_WATCHING_CARD_DESIGNS_FOR_USER,
  UPDATE_TEXT,
  UpdateShapePositionArgs,
  UpdateTextArgs,
  AddTextShapeArgs,
  AddTextShapePayload,
  RemoveShapeArgs,
  REMOVE_SHAPE,
  UpdateShapeWidthArgs,
  UPDATE_SHAPE_WIDTH,
  UpdateShapeWidthPayload
} from './designer.action-types';
import { cardService } from '@app/cards/services/card.service';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { store } from '@app/shared/state';
import { UserInfo } from 'firebase';
import * as firebase from 'firebase';

export function addTextShape(args: AddTextShapeArgs): AnyAction {
  const textShape: Shape = {
    type: constants.shapes.types.text,
    textData: {
      text: args.text || 'New text box',
      fontSize: 24,
      color: 'black'
    },
    x: 0,
    y: 0
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

export function saveCardDesign(user: UserInfo, card: Card): AnyAction {
  store.dispatch({
    type: SAVING_CARD_DESIGN
  });
  return {
    type: SAVE_CARD_DESIGN,
    payload: cardService.saveCardDesign(user, card)
  };
}

export function setMyCardDesignsList(cards: Card[]): AnyAction {
  return {
    type: SET_MY_CARD_DESIGNS_LIST,
    payload: cards
  };
}

export function setActiveCard(user: UserInfo, cardId?: string) {
  return {
    type: SET_ACTIVE_CARD,
    payload: {
      user,
      cardId
    }
  };
}

export function unSetActiveCard() {
  return {
    type: UNSET_ACTIVE_CARD
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
    type: START_WATCHING_CARD_DESIGNS_FOR_USER,
    payload: unsubscribe
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
  const width = args.newWidth > maxWidth ? maxWidth : args.newWidth;
  const payload: UpdateShapeWidthPayload = {
    newWidth: width,
    position: args.position
  };
  return {
    type: UPDATE_SHAPE_WIDTH,
    payload: payload
  };
}
