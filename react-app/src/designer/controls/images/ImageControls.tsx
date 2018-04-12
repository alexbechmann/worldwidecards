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
import { Grid, CircularProgress } from 'material-ui';
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
  boundsToImgRatio: number;
  imgLoaded: string;
  imgCropperLoaded: boolean;
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
      boundsToImgRatio: 1,
      imgLoaded: '',
      imgCropperLoaded: false
    };
  }

  componentDidMount() {
    var img = new Image();
    img.src = this.props.shape.imageData!.href;
    img.onload = () => {
      this.setState({
        imgLoaded: img.src
      });
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
            <div>
              {this.state.imgLoaded === this.props.shape.imageData!.href ? this.renderCropper() : <CircularProgress />}
            </div>
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
          this.setState({ bounds: contentRect.bounds!, boundsToImgRatio: ratio });
        }}
      >
        {({ measureRef }) => {
          const { crop, ratio } = this.props.shape.imageData!;
          return (
            <div ref={measureRef}>
              <Cropper
                src={`${this.props.shape.imageData!.href}`}
                ref={ref => {
                  this.cropper = ref;
                }}
                onImgLoad={() => {
                  if (!this.props.shape!.imageData!.crop) {
                    const { imgWidth, imgHeight } = this.cropper.values().original;
                    var ratioNumber = ratio.height / ratio.width;
                    this.props.setImageCrop({
                      shapePosition: this.props.shapePosition,
                      cropData: {
                        x: 0,
                        y: 0,
                        width: 300,
                        height: 300 * ratioNumber,
                        imgHeight,
                        imgWidth
                      }
                    });
                    this.workAroundToForceRerenderAndFixIncorrectCrop();
                  }
                }}
                onChange={values => {
                  this.props.setImageCrop({
                    shapePosition: this.props.shapePosition,
                    cropData: values.original
                  });
                }}
                originX={crop ? crop.x * this.state.boundsToImgRatio : undefined}
                originY={crop ? crop.y * this.state.boundsToImgRatio : undefined}
                width={crop ? crop.width * this.state.boundsToImgRatio : undefined}
                height={crop ? crop.height * this.state.boundsToImgRatio : undefined}
                ratio={ratio.width / ratio.height}
              />
            </div>
          );
        }}
      </Measure>
    );
  }

  workAroundToForceRerenderAndFixIncorrectCrop() {
    const i = this.state.imgLoaded;
    this.setState(
      {
        imgLoaded: '',
        imgCropperLoaded: false
      },
      () => {
        this.setState({
          imgLoaded: i,
          imgCropperLoaded: true
        });
      }
    );
  }

  getRatio(a: number, b: number): number {
    const change = mathHelper.getPercentageChange(a, b);
    const ratio = 1 + -change / 100;
    return ratio;
  }
}
