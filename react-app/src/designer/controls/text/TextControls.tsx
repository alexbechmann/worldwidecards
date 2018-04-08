import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { FormControl, FormLabel, TextField, Button, Switch } from 'material-ui';
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

type ClassNames = 'button' | 'formControl';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  formControl: {
    marginBottom: theme.spacing.unit
  }
});

export interface TextControlsDispatchProps {
  updateText: (args: UpdateTextArgs) => any;
  removeShape: (args: RemoveShapeArgs) => any;
  updateShapeWidth: (args: UpdateShapeWidthArgs) => any;
  toggleAllowUserEdit: (args: ToggleAllowUserEditArgs) => any;
  removeEditingShape: (position: ShapePosition) => any;
}

export interface TextControlsProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
  mode: DesignerMode;
}

interface Props extends TextControlsProps, TextControlsDispatchProps {}

interface StyledProps extends Props, WithStyles<ClassNames> {}

export const TextControls: React.ComponentType<Props> = withStyles(styles)(
  class TextControlsComponent extends React.Component<StyledProps> {
    render() {
      return this.props.shape.type === constants.shapes.types.text ? (
        <DialogPopup
          open={true}
          handleClose={() => this.props.removeEditingShape(this.props.shapePosition)}
          dialogTitle="Edit textbox"
        >
          {this.renderForm()}
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
            value={this.props.shape.textData!.text}
            onChange={e =>
              this.props.updateText({
                pageIndex: this.props.shapePosition.pageIndex,
                shapeIndex: this.props.shapePosition.shapeIndex,
                text: e.target.value
              })
            }
          />
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
          <Button
            className={this.props.classes.button}
            onClick={() =>
              this.props.removeShape({
                position: this.props.shapePosition
              })
            }
            variant="raised"
            color="secondary"
          >
            Remove
          </Button>
        </div>
      );
    }

    renderArtistOnlyControls() {
      return this.props.mode === DesignerMode.Artist ? (
        <FormControl>
          <FormLabel>Allow user edit?</FormLabel>
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
      ) : (
        <span />
      );
    }
  }
);
