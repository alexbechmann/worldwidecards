import * as React from 'react';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Shape, Page, constants } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { DesignerMode } from '@app/designer/designer-mode';
import DialogPopup from '@app/shared/ui/DialogPopup';
import CardPage from '@app/cards/pages/CardPage';
import { AppState } from '@app/state/app.state';
import { removeShape, removeEditingShape } from '@app/designer/state/designer.actions';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import { RemoveShapeArgs } from '@app/designer/state/designer.action-types';
import TextControls from '@app/designer/controls/text/TextControls';

type ClassNames = 'button' | 'formControl';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

export interface TextControlsDialogDispatchProps {
  removeShape: (args: RemoveShapeArgs) => any;
  removeEditingShape: (position: ShapePosition) => any;
}

export interface TextControlsDialogProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
  mode: DesignerMode;
}

interface Props extends WithStyles<ClassNames>, TextControlsDialogProps, TextControlsDialogDispatchProps {}

class TextControlsDialog extends React.Component<Props> {
  render() {
    return this.props.shape.type === constants.shapes.types.text ? (
      <DialogPopup
        open={true}
        handleClose={() => this.props.removeEditingShape(this.props.shapePosition)}
        dialogTitle="Edit textbox"
        dialogDescription="Edit the properties of the text box here. Click close and drag the text to move it's position."
        extraDialogButtons={[
          () => (
            <Button
              onClick={() =>
                this.props.removeShape({
                  position: this.props.shapePosition
                })
              }
            >
              Remove
            </Button>
          )
        ]}
      >
        <Grid container={true} spacing={16}>
          <Grid item={true} xs={12} sm={8}>
            <TextControls {...this.props} />
          </Grid>
          <Grid item={true} xs={6} sm={4}>
            <CardPage page={this.props.page} pageIndex={0} editable={false} />
          </Grid>
        </Grid>
      </DialogPopup>
    ) : (
      <span>Not a text box</span>
    );
  }
}

export interface TextControlsDialogProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
}

function mapStateToProps(state: AppState, ownProps: TextControlsDialogProps): TextControlsDialogProps {
  return {
    shape: ownProps.shape,
    shapePosition: ownProps.shapePosition,
    page: ownProps.page,
    mode: state.designer.activeCardDesignMode
  };
}

const mapDispatchToProps: TextControlsDialogDispatchProps = {
  removeShape,
  removeEditingShape
};

export default combineContainers(TextControlsDialog, [
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
]) as React.ComponentType<TextControlsDialogProps>;
