import { CropData } from '../..';

export interface ImageData {
  href: string;
  crop?: CropData;
  ratio: {
    width: number;
    height: number;
  };
}
