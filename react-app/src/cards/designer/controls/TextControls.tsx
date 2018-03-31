import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { TextField, Button } from 'material-ui';
// import * as Icons from 'material-ui-icons';
import { Shape } from '@wwc/core';
import { ShapePosition } from 'src/cards/shapes/shape-position';
import { UpdateTextArgs, RemoveShapeArgs } from 'src/cards/designer/state/designer.action-types';

type ClassNames = 'button' | 'form';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  }
});

export interface TextControlsDispatchProps {
  updateText: (args: UpdateTextArgs) => any;
  removeShape: (args: RemoveShapeArgs) => any;
}

export interface TextControlsProps {
  textShape: Shape;
  shapePosition: ShapePosition;
}

interface Props extends TextControlsProps, TextControlsDispatchProps {}

interface StyledProps extends Props, WithStyles<ClassNames> {}

export const TextControls: React.ComponentType<Props> = withStyles(styles)(
  class TextControlsComponent extends React.Component<StyledProps> {
    render() {
      // const { classes } = this.props;
      return (
        <div>
          {/* <div>
            <IconButton className={classes.button} aria-label="Copy">
              <Icons.ContentCopy />
            </IconButton>
            <IconButton className={classes.button} aria-label="Delete">
              <Icons.Delete />
            </IconButton>
          </div> */}
          <TextField
            label="Edit text"
            fullWidth={true}
            multiline={true}
            rowsMax={5}
            value={this.props.textShape.textData!.text}
            onChange={e =>
              this.props.updateText({
                pageIndex: this.props.shapePosition.pageIndex,
                shapeIndex: this.props.shapePosition.shapeIndex,
                text: e.target.value
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
  }
);
