import { Position } from "./position";
import { Shape } from "./shape";

export class TextShape implements Shape {
  position: Position;
  font: string;
  fontSize: number;
  text: string;

  constructor(
    text: string,
    font: string,
    fontSize: number,
    position: Position
  ) {}
}
