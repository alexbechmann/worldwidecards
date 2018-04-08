import * as React from 'react';
import { DialogPopup } from '@app/shared/ui/DialogPopup';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import {
  RemoveShapeArgs,
  UpdateShapeWidthArgs,
  ToggleAllowUserEditArgs,
  SetImageCropArgs
} from '@app/designer/state/designer.action-types';
import { Shape, Page } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';
import { Ref } from 'react';
const Cropper: React.ComponentType<{
  src: string;
  ref?: (ref: Ref<any>) => void;
  onChange?: (values: any) => any;
  originX?: number;
  originY?: number;
  width?: number;
  height?: number;
}> = require('react-image-cropper').Cropper;

export interface ImageControlsProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
  mode: DesignerMode;
}

export interface ImageControlsDispatchProps {
  removeShape: (args: RemoveShapeArgs) => any;
  updateShapeWidth: (args: UpdateShapeWidthArgs) => any;
  toggleAllowUserEdit: (args: ToggleAllowUserEditArgs) => any;
  removeEditingShape: (position: ShapePosition) => any;
  setImageCrop: (args: SetImageCropArgs) => any;
}

interface Props extends ImageControlsProps, ImageControlsDispatchProps {}

export class ImageControls extends React.Component<Props> {
  cropper: Ref<any>;
  render() {
    return (
      <DialogPopup
        open={true}
        handleClose={() => this.props.removeEditingShape(this.props.shapePosition)}
        dialogTitle="Edit image"
      >
        <Cropper
          src={`${this.props.shape.imageData!.href}`}
          ref={ref => {
            this.cropper = ref;
          }}
          onChange={values => {
            console.log(values);
            this.props.setImageCrop({
              shapePosition: this.props.shapePosition,
              cropData: values.display
            });
          }}
          originX={this.props.shape.imageData!.crop ? this.props.shape.imageData!.crop!.x : undefined}
          originY={this.props.shape.imageData!.crop ? this.props.shape.imageData!.crop!.y : undefined}
          width={this.props.shape.imageData!.crop ? this.props.shape.imageData!.crop!.width : undefined}
          height={this.props.shape.imageData!.crop ? this.props.shape.imageData!.crop!.height : undefined}
        />
      </DialogPopup>
    );
  }
}
