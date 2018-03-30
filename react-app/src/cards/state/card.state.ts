import { Card } from '@wwc/core';
import { ShapePosition } from 'src/cards/shapes/shape-position';

export interface CardState {
  loadingMyDesigns: boolean;
  myDesigns: Card[];
  activeCard?: Card;
  activeCardId?: string;
  savingActiveCard: boolean;
  editingShapePosition?: ShapePosition;
  firestoreUnsubscribeMethods: Function[];
}
