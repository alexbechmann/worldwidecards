import { AppState } from 'src/shared/state';
import { CardDesigner, CardDesignerProps, CardDesignerDispatchProps } from './CardDesigner';
import { connect } from 'react-redux';
import { setActiveCard, unSetActiveCard } from 'src/cards/designer/state/designer.actions';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.designer.activeCard,
    editingShapePosition: state.designer.editingShapePosition,
    currentUser: state.auth.currentUser,
    lastSavedDate: state.designer.activeCardLastSavedDate
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { setActiveCard, unSetActiveCard };

export const CardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
