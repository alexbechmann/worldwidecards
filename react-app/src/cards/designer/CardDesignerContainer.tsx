import { AppState } from 'src/shared/state';
import { CardDesigner, CardDesignerProps, CardDesignerDispatchProps } from './CardDesigner';
import { connect } from 'react-redux';
import { saveCardDesign, setActiveCard, unSetActiveCard } from 'src/cards/state/card.actions';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.card.activeCard,
    editingShapePosition: state.card.editingShapePosition,
    saving: state.card.savingActiveCard,
    currentUser: state.auth.currentUser
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { saveCardDesign, setActiveCard, unSetActiveCard };

export const CardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
