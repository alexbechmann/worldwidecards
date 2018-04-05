import { connect } from 'react-redux';
import { AppState } from '@app/shared/state';
import { TextControlsProps, TextControlsDispatchProps, TextControls } from '@app/designer/shared/controls/TextControls';
import {
  updateShapeWidth,
  removeShape,
  updateText,
  toggleAllowUserEdit
} from '@app/designer/artist/state/artist-designer.actions';

const mapDispatchToProps: TextControlsDispatchProps = {
  updateText,
  removeShape,
  updateShapeWidth,
  toggleAllowUserEdit
};

function mapStateToProps(state: AppState): TextControlsProps {
  return {
    textShape: state.artistDesigner.activeCard!.pages[state.artistDesigner.editingShapePosition!.pageIndex].shapes[
      state.artistDesigner.editingShapePosition!.shapeIndex
    ],
    shapePosition: state.artistDesigner.editingShapePosition!,
    page: state.artistDesigner.activeCard!.pages[state.artistDesigner.editingShapePosition!.pageIndex]
  };
}

export const ArtistTextControlsContainer = connect(mapStateToProps, mapDispatchToProps)(TextControls);
