import { updateText, removeShape, updateShapeWidth, toggleAllowUserEdit } from '@app/designer/state/designer.actions';
import { TextControls, TextControlsDispatchProps, TextControlsProps } from './TextControls';
import { connect } from 'react-redux';
import { AppState } from '@app/shared/state';

const mapDispatchToProps: TextControlsDispatchProps = {
  updateText,
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit
};

function mapStateToProps(state: AppState): TextControlsProps {
  return {
    textShape: state.designer.activeCard!.pages[state.designer.editingShapePosition!.pageIndex].shapes[
      state.designer.editingShapePosition!.shapeIndex
    ],
    shapePosition: state.designer.editingShapePosition!,
    page: state.designer.activeCard!.pages[state.designer.editingShapePosition!.pageIndex]
  };
}

export const ConnectedTextControls = connect(mapStateToProps, mapDispatchToProps)(TextControls);
