import { ImageData } from "./image-data";
import { TextData } from "./text-data";

export interface Shape {
  type: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  imageData?: ImageData;
  textData?: TextData;
}
