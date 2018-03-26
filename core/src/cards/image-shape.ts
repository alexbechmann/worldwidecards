import { Shape } from './shape';

export class ImageShape extends Shape {
  href: string;
  constructor(fields?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    href?: string;
  }){
    super();
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
