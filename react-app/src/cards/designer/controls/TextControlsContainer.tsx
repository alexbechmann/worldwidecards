import { updateText, removeShape, updateShapeWidth } from '@app/cards/designer/state/designer.actions';
import { TextControls, TextControlsDispatchProps, TextControlsProps } from './TextControls';
import { connect } from 'react-redux';
import { AppState } from '@app/shared/state';

const mapDispatchToProps: TextControlsDispatchProps = { updateText, removeShape, updateShapeWidth };

function mapStateToProps(state: AppState): TextControlsProps {
  return {
    textShape: state.designer.activeCard!.pages[state.designer.editingShapePosition!.pageIndex].shapes[
      state.designer.editingShapePosition!.shapeIndex
    ],
    shapePosition: state.designer.editingShapePosition!,
    page: state.designer.activeCard!.pages[state.designer.editingShapePosition!.pageIndex]
  };
}

export const TextControlsContainer = connect(mapStateToProps, mapDispatchToProps)(TextControls);
