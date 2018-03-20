import { Text } from "./text";
import { Image } from "./image";

export interface Page {
  texts: Text[];
  images: Image[];
}
