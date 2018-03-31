import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { TextField, Button } from 'material-ui';
// import * as Icons from 'material-ui-icons';
import { Shape, Page } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { UpdateTextArgs, RemoveShapeArgs, UpdateShapeWidthArgs } from '@app/cards/designer/state/designer.action-types';

type ClassNames = 'button' | 'form';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  }
});

export interface TextControlsDispatchProps {
  updateText: (args: UpdateTextArgs) => any;
  removeShape: (args: RemoveShapeArgs) => any;
  updateShapeWidth: (args: UpdateShapeWidthArgs) => any;
}

export interface TextControlsProps {
  textShape: Shape;
  shapePosition: ShapePosition;
  page: Page;
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
          <TextField
            label="Edit width"
            fullWidth={true}
            value={this.props.textShape.width}
            onChange={e =>
              this.props.updateShapeWidth({
                position: {
                  pageIndex: this.props.shapePosition.pageIndex,
                  shapeIndex: this.props.shapePosition.shapeIndex
                },
                newWidth: parseInt(e.target.value, 10),
                shape: this.props.textShape,
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
  }
);
