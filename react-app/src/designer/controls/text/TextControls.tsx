import * as React from 'react';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, TextField, Switch } from '@material-ui/core';
import { Shape, Page } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import {
  UpdateTextArgs,
  RemoveShapeArgs,
  UpdateShapeWidthArgs,
  ToggleAllowUserEditArgs
} from '@app/designer/state/designer.action-types';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/state/app.state';
import { updateText, removeShape, updateShapeWidth, toggleAllowUserEdit } from '@app/designer/state/designer.actions';
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
}

export interface TextControlsComponentProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
  mode: DesignerMode;
  active: boolean;
}

interface Props extends WithStyles<ClassNames>, TextControlsComponentProps, TextControlsComponentDispatchProps {}

class TextControlsComponent extends React.Component<Props> {
  render() {
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
          autoFocus={this.props.active}
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
    mode: state.designer.activeCardDesignMode,
    active: state.designer.editingShapePosition
      ? state.designer.editingShapePosition.shapeIndex === ownProps.shapePosition.shapeIndex
      : false
  };
}

const mapDispatchToProps: TextControlsComponentDispatchProps = {
  updateText,
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit
};

export const TextControls: React.ComponentType<TextControlsProps> = combineContainers(TextControlsComponent, [
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
]);
