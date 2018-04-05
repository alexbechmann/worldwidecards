import { Card } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';

export interface CustomerDesignerState {
  activeCard?: Card;
  activeCardId?: string;
  activePageIndex: number;
  editingShapePosition?: ShapePosition;
  activeCardLastSavedDate?: Date;
}
