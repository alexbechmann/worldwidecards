import { AppState } from 'src/shared/state';
import { CardDesigner, CardDesignerProps, CardDesignerDispatchProps } from './CardDesigner';
import { connect } from 'react-redux';
import { saveCardDesign } from 'src/cards/state/card.actions';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.card.activeCard,
    editingShape: state.card.cardDesigner.editingShape
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { saveCardDesign };

export const CardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
