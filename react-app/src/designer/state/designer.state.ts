import { Card } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { DesignerMode } from '@app/designer/designer-mode';

export interface DesignerState {
  activeCard?: Card;
  activeCardId?: string;
  activePageIndex: number;
  editingShapePosition?: ShapePosition;
  activeCardDesignMode: DesignerMode;
}
