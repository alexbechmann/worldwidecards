import { Card } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';

export interface ArtistDesignerState {
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
