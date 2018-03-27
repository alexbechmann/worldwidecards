import { Shape } from './shape';

export interface Page {
  shapes: Shape[];
  width: number;
  height: number;
}
