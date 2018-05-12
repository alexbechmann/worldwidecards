import {
  updateText,
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit,
  removeEditingShape
} from '@app/designer/state/designer.actions';
import { TextControls, TextControlsDispatchProps, TextControlsProps } from './TextControls';
import { connect } from 'react-redux';
import { AppState } from '@app/state';
import { Shape, Page } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';

export interface TextControlsConnectedProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
}

function mapStateToProps(state: AppState, ownProps: TextControlsConnectedProps): TextControlsProps {
  return {
    shape: ownProps.shape,
    shapePosition: ownProps.shapePosition,
    page: ownProps.page,
    mode: state.designer.activeCardDesignMode
  };
}

const mapDispatchToProps: TextControlsDispatchProps = {
  updateText,
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit,
  removeEditingShape
};

export const TextControlsConnected: React.ComponentType<TextControlsConnectedProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextControls);
