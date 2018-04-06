import { AppState } from '@app/shared/state';
import { connect } from 'react-redux';
import { setActiveCard, unSetActiveCard } from '@app/designer/state/designer.actions';
import { CardDesignerDispatchProps, CardDesignerProps } from '@app/designer/CardDesigner';
import { CardDesigner } from '@app/designer';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.designer.activeCard,
    editingShapePosition: state.designer.editingShapePosition,
    currentUser: state.auth.currentUser,
    lastSavedDate: state.artist.activeCardLastSavedDate,
    saving: state.artist.savingActiveCard
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { setActiveCard, unSetActiveCard };

export const ConnectedArtistCardDesigner = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
