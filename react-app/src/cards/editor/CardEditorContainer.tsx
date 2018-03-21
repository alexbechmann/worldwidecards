import { AppState } from 'src/shared/state';
import { CardEditorProps } from './card-editor.props';
import { CardEditor } from './CardEditor';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState): CardEditorProps {
  return {
    card: state.card.activeCard
  };
}

// const mapDispatchToProps: LoginDispatchProps = { loginWithFacebook, loginWithPassword };

export const CardEditorContainer = connect(mapStateToProps, null)(CardEditor);
