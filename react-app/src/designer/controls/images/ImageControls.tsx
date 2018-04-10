import * as React from 'react';
import { DialogPopup } from '@app/shared/ui/DialogPopup';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import {
  RemoveShapeArgs,
  UpdateShapeWidthArgs,
  ToggleAllowUserEditArgs,
  SetImageCropArgs
} from '@app/designer/state/designer.action-types';
import { Shape, Page, mathHelper } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';
import { Cropper } from '@app/shared/ui/Cropper';
import Measure, { BoundingRect } from 'react-measure';
import { Grid } from 'material-ui';
import { CardPageContainer } from '@app/cards/pages/CardPageContainer';

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

interface State {
  bounds: Partial<BoundingRect>;
  ratio: number;
}

export class ImageControls extends React.Component<Props, State> {
  cropper: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      bounds: {
        width: -1,
        height: -1
      },
      ratio: 1
    };
  }
  render() {
    return (
      <DialogPopup
        open={true}
        handleClose={() => this.props.removeEditingShape(this.props.shapePosition)}
        dialogTitle="Edit image"
        fullScreen={true}
      >
        <Grid container={true}>
          <Grid item={true} xs={12} sm={8} lg={10}>
            {this.renderCropper()}
          </Grid>
          <Grid item={true} xs={12} sm={4} lg={2}>
            <CardPageContainer page={this.props.page} pageIndex={0} editable={false} />
          </Grid>
        </Grid>
      </DialogPopup>
    );
  }

  renderCropper() {
    return (
      <Measure
        bounds={true}
        onResize={contentRect => {
          var ratio = 1;
          if (this.props.shape.imageData && this.props.shape.imageData.crop) {
            ratio = this.getRatio(this.props.shape.imageData!.crop!.imgWidth, contentRect.bounds!.width!);
          }
          this.setState({ bounds: contentRect.bounds!, ratio: ratio });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            <Cropper
              src={`${this.props.shape.imageData!.href}`}
              ref={ref => {
                this.cropper = ref;
              }}
              onImgLoad={() => {
                if (!this.props.shape!.imageData!.crop) {
                  const values = this.cropper.values();
                  this.props.setImageCrop({
                    shapePosition: this.props.shapePosition,
                    cropData: values.original
                  });
                }
              }}
              onChange={values => {
                this.props.setImageCrop({
                  shapePosition: this.props.shapePosition,
                  cropData: values.original
                });
              }}
              originX={
                this.props.shape.imageData!.crop ? this.props.shape.imageData!.crop!.x * this.state.ratio : undefined
              }
              originY={
                this.props.shape.imageData!.crop ? this.props.shape.imageData!.crop!.y * this.state.ratio : undefined
              }
              width={
                this.props.shape.imageData!.crop
                  ? this.props.shape.imageData!.crop!.width * this.state.ratio
                  : undefined
              }
              height={
                this.props.shape.imageData!.crop
                  ? this.props.shape.imageData!.crop!.height * this.state.ratio
                  : undefined
              }
              ratio={this.props.shape.imageData!.ratio.width / this.props.shape.imageData!.ratio.height}
            />
          </div>
        )}
      </Measure>
    );
  }

  getRatio(a: number, b: number): number {
    const change = mathHelper.getPercentageChange(a, b);
    const ratio = 1 + -change / 100;
    return ratio;
  }
}
