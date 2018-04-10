import { Ref } from 'react';

export const Cropper: React.ComponentType<{
  src: string;
  ref?: (ref: Ref<any>) => void;
  onChange?: (values: any) => any;
  onImgLoad?: () => any;
  originX?: number;
  originY?: number;
  width?: number;
  height?: number;
  ratio?: number;
}> = require('react-image-cropper').Cropper;
