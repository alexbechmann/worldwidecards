import { Card } from '@wwc/core';
import { ShapePosition } from 'src/cards/shapes/shape-position';

export interface DesignerState {
  loadingMyDesigns: boolean;
  myDesigns: Card[];
  activeCard?: Card;
  activeCardId?: string;
  savingActiveCard: boolean;
  activePageIndex: number;
  editingShapePosition?: ShapePosition;
  firestoreUnsubscribeMethods: Function[];
  activeCardLastSavedDate?: Date;
}
