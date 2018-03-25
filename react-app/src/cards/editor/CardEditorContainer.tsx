import { AppState } from 'src/shared/state';
import { CardEditor, CardEditorProps, CardEditorDispatchProps } from './CardEditor';
import { connect } from 'react-redux';
import { addTextShape } from '../card.actions';

function mapStateToProps(state: AppState): CardEditorProps {
  return {
    card: state.card.activeCard
  };
}

const mapDispatchToProps: CardEditorDispatchProps = { addTextShape };

export const CardEditorContainer = connect(mapStateToProps, mapDispatchToProps)(CardEditor);
