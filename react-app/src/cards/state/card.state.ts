import { Card, Shape } from '@wwc/core';

export interface CardState {
  readonly activeCard: Card;
  readonly cardDesigner: { editingShape?: Shape };
}
