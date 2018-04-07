import { updateText, removeShape, updateShapeWidth, toggleAllowUserEdit } from '@app/designer/state/designer.actions';
import { TextControls, TextControlsDispatchProps, TextControlsProps } from './TextControls';
import { connect } from 'react-redux';
import { AppState } from '@app/shared/state';
import { Shape, Page } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';

export interface ConnectedTextControlsProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
}

function mapStateToProps(state: AppState, ownProps: ConnectedTextControlsProps): TextControlsProps {
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
  toggleAllowUserEdit
};

export const ConnectedTextControls: React.ComponentType<ConnectedTextControlsProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextControls);
