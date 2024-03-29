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
import TextControls from '@app/designer/controls/text/TextControls';
import { ConnectedReduxProps } from '@app/state/connected-redux-props';

type ClassNames = 'button' | 'formControl';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

export interface TextControlsDialogProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
  mode: DesignerMode;
}

interface Props extends WithStyles<ClassNames>, TextControlsDialogProps, ConnectedReduxProps {}

class TextControlsDialog extends React.Component<Props> {
  render() {
    return this.props.shape.type === constants.shapes.types.text ? (
      <DialogPopup
        open={true}
        handleClose={() => this.props.dispatch(removeEditingShape(this.props.shapePosition))}
        dialogTitle="Edit textbox"
        dialogDescription="Edit the properties of the text box here. Click close and drag the text to move it's position."
        extraDialogButtons={[
          () => <Button onClick={() => this.props.dispatch(removeShape(this.props.shapePosition))}>Remove</Button>
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

export interface TextControlsDialogExtendedProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
}

function mapStateToProps(state: AppState, ownProps: TextControlsDialogExtendedProps): TextControlsDialogProps {
  return {
    shape: ownProps.shape,
    shapePosition: ownProps.shapePosition,
    page: ownProps.page,
    mode: state.designer.activeCardDesignMode
  };
}

export default combineContainers(withStyles(styles), connect(mapStateToProps))(
  TextControlsDialog
) as React.ComponentType<TextControlsDialogExtendedProps>;
