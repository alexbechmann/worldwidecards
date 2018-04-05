import { connect } from 'react-redux';
import {
  CardDesignControls,
  CardDesignControlsProps,
  CardDesignControlsDispatchProps
} from '../shared/controls/CardDesignControls';
import { AppState } from '@app/shared/state';
import { saveCardDesign, addTextShape } from '@app/designer/artist/state/artist-designer.actions';

function mapStateToProps(state: AppState): CardDesignControlsProps {
  return {
    card: state.artistDesigner.activeCard,
    saving: state.artistDesigner.savingActiveCard,
    currentUser: state.auth.currentUser,
    activePageIndex: state.artistDesigner.activePageIndex
  };
}

const mapDispatchToProps: CardDesignControlsDispatchProps = { saveCardDesign, addTextShape };

export const ArtistCardDesignControlsContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesignControls);
