import { AppState } from 'src/shared/state';
import { CardEditor, CardEditorProps, CardEditorDispatchProps } from './CardEditor';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState): CardEditorProps {
  return {
    card: state.card.activeCard,
    editingShape: state.card.cardDesigner.editingShape
  };
}

const mapDispatchToProps: CardEditorDispatchProps = {};

export const CardEditorContainer = connect(mapStateToProps, mapDispatchToProps)(CardEditor);
