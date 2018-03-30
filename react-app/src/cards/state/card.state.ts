import { Card } from '@wwc/core';
import { ShapePosition } from 'src/cards/shapes/shape-position';

export interface CardState {
  cardDesigner: { editingShapePosition?: ShapePosition };
  myDesigns: Card[];
  activeCard?: Card;
  activeCardId?: string;
  savingActiveCard: boolean;
}
