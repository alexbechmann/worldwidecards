import { AppState } from 'src/shared/state';
import { CardDesigner, CardDesignerProps, CardDesignerDispatchProps } from './CardDesigner';
import { connect } from 'react-redux';
import { saveCardDesign, setActiveCard, unSetActiveCard } from 'src/cards/designer/state/designer.actions';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.designer.activeCard,
    editingShapePosition: state.designer.editingShapePosition,
    saving: state.designer.savingActiveCard,
    currentUser: state.auth.currentUser
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { saveCardDesign, setActiveCard, unSetActiveCard };

export const CardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
