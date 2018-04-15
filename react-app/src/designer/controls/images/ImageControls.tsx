import * as React from 'react';
import { DialogPopup } from '@app/shared/ui/DialogPopup';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import {
  RemoveShapeArgs,
  UpdateShapeWidthArgs,
  ToggleAllowUserEditArgs,
  SetImageCropArgs,
  UpdateImageHrefArgs,
  UpdateImageRatioArgs
} from '@app/designer/state/designer.action-types';
import { Shape, Page } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';
import { Cropper } from '@app/shared/ui/Cropper';
import { Grid, Theme, TextField, FormControl, Select, MenuItem, InputLabel, FormLabel, Switch } from 'material-ui';
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
  updateImageRatio: (args: UpdateImageRatioArgs) => any;
}

type ClassNames = 'formControl';

const styles = (theme: Theme) => ({
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

interface State {
  cropperImgLoading: boolean;
}

interface Props extends ImageControlsProps, ImageControlsDispatchProps, WithStyles<ClassNames> {}

class ImageControlsComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cropperImgLoading: false
    };
  }

  render() {
    return (
      <DialogPopup
        open={true}
        handleClose={() => this.props.removeEditingShape(this.props.shapePosition)}
        dialogTitle="Edit image"
        dialogDescription="Edit the properties of the image here. Click close and drag the image to move it's position."
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
          disabled={this.state.cropperImgLoading}
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
        <Grid container={true} spacing={8}>
          <Grid item={true} xs={6}>
            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel>Ratio width</InputLabel>
              <Select
                value={this.props.shape.imageData!.ratio.width}
                onChange={e =>
                  this.props.updateImageRatio({
                    ratio: {
                      height: this.props.shape.imageData!.ratio.height,
                      width: parseInt(e.target.value, 10)
                    },
                    shapePosition: this.props.shapePosition
                  })
                }
              >
                {this.renderMenuItems(16)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item={true} xs={6}>
            <FormControl className={classes.formControl} fullWidth={true}>
              <InputLabel>Ratio height</InputLabel>
              <Select
                value={this.props.shape.imageData!.ratio.height}
                onChange={e =>
                  this.props.updateImageRatio({
                    ratio: {
                      width: this.props.shape.imageData!.ratio.width,
                      height: parseInt(e.target.value, 10)
                    },
                    shapePosition: this.props.shapePosition
                  })
                }
              >
                {this.renderMenuItems(16)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {this.renderArtistOnlyControls()}
        <Cropper
          onCropChange={crop => {
            this.props.setImageCrop({
              shapePosition: this.props.shapePosition,
              cropData: crop
            });
          }}
          imageData={this.props.shape.imageData!}
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
          label="Edit width on card"
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

export const ImageControls = withStyles(styles, { withTheme: true })(ImageControlsComponent);
