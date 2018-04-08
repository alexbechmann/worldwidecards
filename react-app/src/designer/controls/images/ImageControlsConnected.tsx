import {
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit,
  removeEditingShape
} from '@app/designer/state/designer.actions';
import { ImageControls, ImageControlsDispatchProps, ImageControlsProps } from './ImageControls';
import { connect } from 'react-redux';
import { AppState } from '@app/shared/state';
import { Shape, Page } from '@wwc/core';
import { ShapePosition } from '@app/cards/shapes/shape-position';

export interface ImageControlsConnectedProps {
  shape: Shape;
  shapePosition: ShapePosition;
  page: Page;
}

function mapStateToProps(state: AppState, ownProps: ImageControlsConnectedProps): ImageControlsProps {
  return {
    shape: ownProps.shape,
    shapePosition: ownProps.shapePosition,
    page: ownProps.page,
    mode: state.designer.activeCardDesignMode
  };
}

const mapDispatchToProps: ImageControlsDispatchProps = {
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit,
  removeEditingShape
};

export const ImageControlsConnected: React.ComponentType<ImageControlsConnectedProps> = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageControls);
