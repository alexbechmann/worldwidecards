import { AppState } from '@app/shared/state';
import { connect } from 'react-redux';
import { setActiveCard, unSetActiveCard } from '@app/designer/artist/state/artist-designer.actions';
import {
  CardDesignerDispatchProps,
  CardDesignerProps,
  ArtistCardDesigner
} from '@app/designer/artist/ArtistCardDesigner';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.artistDesigner.activeCard,
    editingShapePosition: state.artistDesigner.editingShapePosition,
    currentUser: state.auth.currentUser,
    lastSavedDate: state.artistDesigner.activeCardLastSavedDate,
    saving: state.artistDesigner.savingActiveCard
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { setActiveCard, unSetActiveCard };

export const ArtistCardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(ArtistCardDesigner);
