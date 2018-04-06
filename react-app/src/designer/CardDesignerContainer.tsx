import { AppState } from '@app/shared/state';
import { CardDesigner, CardDesignerProps, CardDesignerDispatchProps } from './CardDesigner';
import { connect } from 'react-redux';
import { setActiveCard, unSetActiveCard } from '@app/designer/state/designer.actions';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.designer.activeCard,
    editingShapePosition: state.designer.editingShapePosition,
    currentUser: state.auth.currentUser,
    lastSavedDate: state.designer.activeCardLastSavedDate,
    saving: state.designer.savingActiveCard
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { setActiveCard, unSetActiveCard };

export const CardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);