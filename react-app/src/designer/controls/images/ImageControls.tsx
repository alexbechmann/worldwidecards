import * as React from 'react';
import { DialogPopup } from '@app/shared/ui/DialogPopup';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import {
  RemoveShapeArgs,
  UpdateShapeWidthArgs,
  ToggleAllowUserEditArgs,
  SetImageCropArgs,
  UpdateImageHrefArgs
} from '@app/designer/state/designer.action-types';
import { Shape, Page, mathHelper } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';
import { Cropper } from '@app/shared/ui/Cropper';
import Measure, { BoundingRect } from 'react-measure';
import { Grid, CircularProgress, Theme, TextField } from 'material-ui';
import { withStyles, WithStyles } from 'material-ui/styles';
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
  updateImageHref: (args: UpdateImageHrefArgs) => any;
}

type ClassNames = 'formControl';

const styles = (theme: Theme) => ({
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

interface Props extends ImageControlsProps, ImageControlsDispatchProps, WithStyles<ClassNames> {}

interface State {
  bounds: Partial<BoundingRect>;
  boundsToImgRatio: number;
  imgLoaded: string;
  imgCropperLoaded: boolean;
  loadingImage: boolean;
  loadingImageError?: string;
}

class ImageControlsComponent extends React.Component<Props, State> {
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
      imgCropperLoaded: false,
      loadingImage: false
    };
  }

  componentWillReceiveProps(props: Props) {
    this.loadImageIfNecessary(props);
  }

  componentDidMount() {
    this.loadImageIfNecessary(this.props);
  }

  render() {
    return (
      <DialogPopup
        open={true}
        handleClose={() => this.props.removeEditingShape(this.props.shapePosition)}
        dialogTitle="Edit image"
        dialogDescription="Edit the properties of the image here. Click close and drag the text to move it's position."
      >
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12} sm={8}>
            <div>{this.renderForm()}</div>
          </Grid>
          <Grid item={true} xs={6} sm={4}>
            <CardPageContainer page={this.props.page} pageIndex={0} editable={false} />
          </Grid>
        </Grid>
      </DialogPopup>
    );
  }

  renderForm() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className={classes.formControl}
          disabled={this.state.loadingImage}
          label="Edit image url"
          fullWidth={true}
          multiline={true}
          rowsMax={5}
          autoFocus={true}
          value={this.props.shape.imageData!.href}
          onChange={e => {
            this.props.updateImageHref({
              url: e.target.value,
              shapePosition: this.props.shapePosition
            });
          }}
        />
        {this.renderCropper()}
      </div>
    );
  }

  renderCropper() {
    return this.state.imgLoaded === this.props.shape.imageData!.href ? (
      <Measure
        bounds={true}
        onResize={contentRect => {
          var ratio = 1;
          if (this.props.shape.imageData && this.props.shape.imageData.crop) {
            ratio = mathHelper.getRatio(this.props.shape.imageData!.crop!.imgWidth, contentRect.bounds!.width!);
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
    ) : this.state.loadingImageError ? (
      <p>{this.state.loadingImageError}</p>
    ) : (
      <CircularProgress />
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

  loadImageIfNecessary(props: Props) {
    if (this.state.imgLoaded !== props.shape.imageData!.href) {
      var img = new Image();
      img.src = props.shape.imageData!.href;
      this.setState({
        loadingImage: true,
        loadingImageError: undefined
      });
      img.onerror = () => {
        this.setState({
          loadingImage: false,
          loadingImageError: 'Image load failed'
        });
      };
      img.onload = () => {
        this.setState({
          imgLoaded: img.src,
          loadingImage: false,
          loadingImageError: undefined
        });
      };
    }
  }
}

export const ImageControls = withStyles(styles, { withTheme: true })(ImageControlsComponent);
