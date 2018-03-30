import { AppState } from 'src/shared/state';
import { CardDesigner, CardDesignerProps, CardDesignerDispatchProps } from './CardDesigner';
import { connect } from 'react-redux';
import { saveCardDesign, setActiveCard } from 'src/cards/state/card.actions';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.card.activeCard,
    editingShapePosition: state.card.cardDesigner.editingShapePosition,
    saving: state.card.savingActiveCard
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { saveCardDesign, setActiveCard };

export const CardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
