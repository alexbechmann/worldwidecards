import { AppState } from 'src/shared/state';
import { CardEditorProps } from './card-editor.props';
import { CardEditor } from './CardEditor';
import { connect } from 'react-redux';
import { combineContainers } from 'src/shared/helpers/combine-containers';
import { withStyles } from 'material-ui';
import { cardEditorStyles } from './card-editor.styles';

function mapStateToProps(state: AppState): CardEditorProps {
  return {
    card: state.card.activeCard
  };
}

export const CardEditorContainer = combineContainers(CardEditor, [
  c => connect(mapStateToProps, null)(c),
  c => withStyles(cardEditorStyles, { withTheme: true })(c)
]);
