import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { TextField, IconButton } from 'material-ui';
import * as Icons from 'material-ui-icons';
import { Shape } from '@wwc/core';
import { ShapePosition } from 'src/cards/shapes/shape-position';

type ClassNames = 'button' | 'input';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  }
});

export interface TextControlsDispatchProps {
  updateText: (pageIndex: number, shapeIndex: number, text: string) => any;
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
      const { classes } = this.props;
      return (
        <div>
          <div>
            <IconButton className={classes.button} aria-label="Copy">
              <Icons.ContentCopy />
            </IconButton>
            <IconButton className={classes.button} aria-label="Delete">
              <Icons.Delete />
            </IconButton>
          </div>
          <TextField
            label="Change text"
            fullWidth={true}
            multiline={true}
            rowsMax={5}
            value={this.props.textShape.textData!.text}
            onChange={e =>
              this.props.updateText(
                this.props.shapePosition.pageIndex,
                this.props.shapePosition.shapeIndex,
                e.target.value
              )
            }
          />
        </div>
      );
    }
  }
);
