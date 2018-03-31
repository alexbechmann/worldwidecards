import { updateText } from 'src/cards/designer/state/designer.actions';
import { TextControls, TextControlsDispatchProps, TextControlsProps } from './TextControls';
import { connect } from 'react-redux';
import { AppState } from 'src/shared/state';

const mapDispatchToProps: TextControlsDispatchProps = { updateText };

function mapStateToProps(state: AppState): TextControlsProps {
  return {
    textShape: state.designer.activeCard!.pages[state.designer.editingShapePosition!.pageIndex].shapes[
      state.designer.editingShapePosition!.shapeIndex
    ],
    shapePosition: state.designer.editingShapePosition!
  };
}

export const TextControlsContainer = connect(mapStateToProps, mapDispatchToProps)(TextControls);
