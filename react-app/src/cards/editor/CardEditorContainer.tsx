import { AppState } from 'src/shared/state';
import { CardEditor, CardEditorProps, CardEditorDispatchProps } from './CardEditor';
import { connect } from 'react-redux';
import { setEditingShape } from 'src/cards/state/card.actions';

function mapStateToProps(state: AppState): CardEditorProps {
  return {
    card: state.card.activeCard,
    editingShape: state.card.cardDesigner.editingShape
  };
}

const mapDispatchToProps: CardEditorDispatchProps = { setEditingShape };

export const CardEditorContainer = connect(mapStateToProps, mapDispatchToProps)(CardEditor);
