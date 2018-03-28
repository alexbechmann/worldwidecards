import { Shape } from './shape';

export class TextShape extends Shape {
  font: string;
  fontSize: number;
  text: string;
  color: string;
  constructor(fields?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    text?: string;
    fontSize?: number;
    font?: string;
    color?: string;
  }){
    super();
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
