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
import { Shape, Page } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';
import { Cropper } from '@app/shared/ui/Cropper';
import { Grid, Theme, TextField } from 'material-ui';
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
}

export const ImageControls = withStyles(styles, { withTheme: true })(ImageControlsComponent);
