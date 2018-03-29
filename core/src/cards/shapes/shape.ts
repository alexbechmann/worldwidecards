import { ImageShape } from "./image-shape";
import { TextShape } from "./text-shape";

export interface Shape {
  type: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  imageData?: ImageShape;
  textData?: TextShape;
}
