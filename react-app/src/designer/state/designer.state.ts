import { Card } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';

export interface DesignerState {
  loadingMyDesigns: boolean;
  myDesigns: Card[];
  activeCard?: Card;
  activeCardId?: string;
  activePageIndex: number;
  editingShapePosition?: ShapePosition;
}
