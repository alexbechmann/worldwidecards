import { updateText } from 'src/cards/state/card.actions';
import { TextControls, TextControlsDispatchProps, TextControlsProps } from './TextControls';
import { connect } from 'react-redux';
import { AppState } from 'src/shared/state';

const mapDispatchToProps: TextControlsDispatchProps = { updateText };

function mapStateToProps(state: AppState): TextControlsProps {
  return {
    textShape: state.card.activeCard!.pages[state.card.editingShapePosition!.pageIndex].shapes[
      state.card.editingShapePosition!.shapeIndex
    ],
    shapePosition: state.card.editingShapePosition!
  };
}

export const TextControlsContainer = connect(mapStateToProps, mapDispatchToProps)(TextControls);
