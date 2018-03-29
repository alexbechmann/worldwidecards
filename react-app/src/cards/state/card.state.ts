import { Card } from '@wwc/core';
import { ShapePosition } from 'src/cards/shapes/shape-position';

export interface CardState {
  activeCard: Card;
  cardDesigner: { editingShapePosition?: ShapePosition };
  myDesigns: Card[];
}
