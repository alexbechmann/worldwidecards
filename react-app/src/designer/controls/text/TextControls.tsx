import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { Grid, FormControl, FormLabel, TextField, Button, Switch } from 'material-ui';
import { Shape, Page, constants } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import {
  UpdateTextArgs,
  RemoveShapeArgs,
  UpdateShapeWidthArgs,
  ToggleAllowUserEditArgs
} from '@app/designer/state/designer.action-types';
import { DesignerMode } from '@app/designer/designer-mode';
import { DialogPopup } from '@app/shared/ui/DialogPopup';
import { CardPage } from '@app/cards/pages/CardPage';
import { AppState } from '@app/state/app.state';
import {
  updateText,
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit,
  removeEditingShape
} from '@app/designer/state/designer.actions';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';

type ClassNames = 'button' | 'formControl';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

export interface TextControlsComponentDispatchProps {
  updateText: (args: UpdateTextArgs) => any;
  removeShape: (args: RemoveShapeArgs) => any;
  updateShapeWidth: (args: UpdateShapeWidthArgs) => any;
  toggleAllowUserEdit: (args: ToggleAllowUserEditArgs) => any;
  removeEditingShape: (position: ShapePosition) => any;
}

export interface TextControlsComponentProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
  mode: DesignerMode;
}

interface Props extends WithStyles<ClassNames>, TextControlsComponentProps, TextControlsComponentDispatchProps {}

class TextControlsComponent extends React.Component<Props> {
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
            {this.renderForm()}
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

  renderForm() {
    const { classes } = this.props;
    return (
      <div>
        {this.renderArtistOnlyControls()}
        <TextField
          className={classes.formControl}
          label="Edit text"
          fullWidth={true}
          multiline={true}
          rowsMax={5}
          autoFocus={true}
          value={this.props.shape.textData!.text}
          onChange={e =>
            this.props.updateText({
              pageIndex: this.props.shapePosition.pageIndex,
              shapeIndex: this.props.shapePosition.shapeIndex,
              text: e.target.value
            })
          }
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
          label="Edit width"
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
}

// export const TextControls: React.ComponentType<Props> = withStyles(styles)(

// );

export interface TextControlsProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
}

function mapStateToProps(state: AppState, ownProps: TextControlsProps): TextControlsComponentProps {
  return {
    shape: ownProps.shape,
    shapePosition: ownProps.shapePosition,
    page: ownProps.page,
    mode: state.designer.activeCardDesignMode
  };
}

const mapDispatchToProps: TextControlsComponentDispatchProps = {
  updateText,
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit,
  removeEditingShape
};

export const TextControls: React.ComponentType<TextControlsProps> = combineContainers(TextControlsComponent, [
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
]);
