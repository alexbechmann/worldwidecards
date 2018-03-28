import { Card, Shape } from '@wwc/core';

export interface CardState {
  activeCard: Card;
  cardDesigner: { editingShape?: Shape };
}
