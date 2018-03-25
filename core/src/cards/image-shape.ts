import { Position } from './position';
import { Shape } from './shape';

export class ImageShape implements Shape {
  position: Position;
  href: string;

  constructor(href: string, position: Position) {
    this.href = href;
    this.position = position;
  }
}
