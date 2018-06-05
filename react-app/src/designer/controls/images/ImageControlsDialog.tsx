import * as React from 'react';
import { DialogPopup } from '@app/shared/ui/DialogPopup';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { Shape, Page } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';
import { Grid, Theme } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { CardPage } from '@app/cards/pages/CardPage';
import { AppState } from '@app/state/app.state';
import { removeEditingShape } from '@app/designer/state/designer.actions';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import { ImageControls } from '@app/designer/controls/images/ImageControls';

export interface ImageControlsDialogComponentProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
  mode: DesignerMode;
}

export interface ImageControlsDialogComponentDispatchProps {
  removeEditingShape: (position: ShapePosition) => any;
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

interface Props
  extends ImageControlsDialogComponentProps,
    ImageControlsDialogComponentDispatchProps,
    WithStyles<ClassNames> {}

class ImageControlsDialogComponent extends React.Component<Props, State> {
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
            <div>
              <ImageControls {...this.props} />
            </div>
          </Grid>
          <Grid item={true} xs={6} sm={4}>
            <CardPage page={this.props.page} pageIndex={0} editable={false} />
          </Grid>
        </Grid>
      </DialogPopup>
    );
  }
}

export interface ImageControlsDialogProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
}

function mapStateToProps(state: AppState, ownProps: ImageControlsDialogProps): ImageControlsDialogComponentProps {
  return {
    shape: ownProps.shape,
    shapePosition: ownProps.shapePosition,
    page: ownProps.page,
    mode: state.designer.activeCardDesignMode
  };
}

const mapDispatchToProps: ImageControlsDialogComponentDispatchProps = {
  removeEditingShape
};

export const ImageControlsDialog: React.ComponentType<ImageControlsDialogProps> = combineContainers(
  ImageControlsDialogComponent,
  [connect(mapStateToProps, mapDispatchToProps), withStyles(styles, { withTheme: true })]
);
