import * as React from 'react';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import {
  RemoveShapeArgs,
  UpdateShapeWidthArgs,
  ToggleAllowUserEditArgs,
  SetImageCropArgs,
  UpdateImageHrefArgs
} from '@app/designer/state/designer.action-types';
import { Shape, Page } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';
import { Theme, TextField, FormControl, MenuItem, FormLabel, Switch } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { AppState } from '@app/state/app.state';
import {
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit,
  setImageCrop,
  updateImageHref
} from '@app/designer/state/designer.actions';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import * as ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export interface ImageControlsComponentProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
  mode: DesignerMode;
  active: boolean;
}

export interface ImageControlsComponentDispatchProps {
  removeShape: (args: RemoveShapeArgs) => any;
  updateShapeWidth: (args: UpdateShapeWidthArgs) => any;
  toggleAllowUserEdit: (args: ToggleAllowUserEditArgs) => any;
  setImageCrop: (args: SetImageCropArgs) => any;
  updateImageHref: (args: UpdateImageHrefArgs) => any;
}

type ClassNames = 'formControl';

const styles = (theme: Theme) => ({
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

interface State {
  image?: HTMLImageElement;
}

interface Props extends ImageControlsComponentProps, ImageControlsComponentDispatchProps, WithStyles<ClassNames> {}

class ImageControlsComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const imageCrop =
      this.props.mode === DesignerMode.Artist
        ? this.props.shape.imageData!.crop || { x: 0, y: 0, width: 100, height: 100 }
        : this.props.shape.imageData!.crop
          ? {
              ...this.props.shape.imageData!.crop!,
              aspect: this.props.shape.imageData!.ratio!.width! / this.props.shape.imageData!.ratio!.height!
            }
          : { x: 0, y: 0, width: 100, height: 100 };
    return (
      <div>
        <TextField
          className={classes.formControl}
          disabled={!this.state.image}
          label="Image url"
          fullWidth={true}
          multiline={true}
          rowsMax={5}
          autoFocus={this.props.active}
          value={this.props.shape.imageData!.href}
          onChange={e => {
            this.setState({
              image: undefined
            });
            this.props.updateImageHref({
              url: e.target.value,
              shapePosition: this.props.shapePosition
            });
          }}
        />
        {this.renderArtistOnlyControls()}
        <ReactCrop
          style={{ width: '100%' }}
          src={this.props.shape.imageData!.href}
          onChange={(crop, pixelCrop) => {
            this.props.setImageCrop({
              shapePosition: this.props.shapePosition,
              cropData: {
                x: crop.x!,
                y: crop.y!,
                width: crop.width!,
                height: crop.height!
              },
              ratio: {
                width: pixelCrop.width!,
                height: pixelCrop.height!
              }
            });
          }}
          crop={imageCrop}
          onImageLoaded={img => {
            this.setState({
              image: img
            });
            if (!this.props.shape.imageData!.crop) {
              if (this.props.mode === DesignerMode.Artist) {
                this.props.setImageCrop({
                  shapePosition: this.props.shapePosition,
                  cropData: {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                  },
                  ratio: {
                    width: img.width!,
                    height: img.height!
                  }
                });
              } else if (this.props.mode === DesignerMode.Customer) {
                const customerCrop = ReactCrop.makeAspectCrop(
                  {
                    x: 0,
                    y: 0,
                    width: img.width,
                    aspect: this.props.shape.imageData!.ratio!.width! / this.props.shape.imageData!.ratio!.height!
                  },
                  img.width / img.height
                );

                this.props.setImageCrop({
                  shapePosition: this.props.shapePosition,
                  cropData: {
                    x: customerCrop.x,
                    y: customerCrop.y,
                    width: customerCrop.width!,
                    height: customerCrop.height!
                  },
                  ratio: this.props.shape.imageData!.ratio!
                });
              }
            }
          }}
        />
      </div>
    );
  }

  renderArtistOnlyControls() {
    const { classes } = this.props;
    return this.props.mode === DesignerMode.Artist ? (
      <div>
        <FormControl>
          <FormLabel>Allow customer edit?</FormLabel>
          <Switch
            checked={this.props.shape.allowUserEdit}
            onChange={e => {
              this.props.toggleAllowUserEdit({
                shapeIndex: this.props.shapePosition.shapeIndex,
                pageIndex: this.props.shapePosition.pageIndex
              });
            }}
          />
        </FormControl>
        <TextField
          className={classes.formControl}
          label="Width on card"
          fullWidth={true}
          value={this.props.shape.width}
          onChange={e =>
            this.props.updateShapeWidth({
              position: {
                pageIndex: this.props.shapePosition.pageIndex,
                shapeIndex: this.props.shapePosition.shapeIndex
              },
              newWidth: parseInt(e.target.value, 10),
              shape: this.props.shape,
              page: this.props.page
            })
          }
        />
      </div>
    ) : (
      <span />
    );
  }

  renderMenuItems(max: number) {
    return new Array(max).fill(undefined).map((_, index) => {
      const value = index + 1;
      return (
        <MenuItem key={index} value={value}>
          {value}
        </MenuItem>
      );
    });
  }
}

export interface ImageControlsProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
}

function mapStateToProps(state: AppState, ownProps: ImageControlsProps): ImageControlsComponentProps {
  return {
    shape: ownProps.shape,
    shapePosition: ownProps.shapePosition,
    page: ownProps.page,
    mode: state.designer.activeCardDesignMode,
    active: state.designer.editingShapePosition
      ? state.designer.editingShapePosition.shapeIndex === ownProps.shapePosition.shapeIndex
      : false
  };
}

const mapDispatchToProps: ImageControlsComponentDispatchProps = {
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit,
  setImageCrop,
  updateImageHref
};

export const ImageControls: React.ComponentType<ImageControlsProps> = combineContainers(ImageControlsComponent, [
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
]);
