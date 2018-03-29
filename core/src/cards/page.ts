import { Shape } from './shapes/shape';

export interface Page {
  shapes: Shape[];
  width: number;
  height: number;
}
