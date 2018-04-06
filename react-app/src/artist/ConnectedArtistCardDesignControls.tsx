import { connect } from 'react-redux';
import { addTextShape } from '@app/designer/state/designer.actions';
import { AppState } from '@app/shared/state';
import {
  CardDesignControlsDispatchProps,
  CardDesignControlsProps,
  CardDesignControls
} from '@app/designer/controls/CardDesignControls';
import { saveCardDesign } from '@app/artist/state/artist.actions';

function mapStateToProps(state: AppState): CardDesignControlsProps {
  return {
    card: state.designer.activeCard,
    saving: state.artist.savingActiveCard,
    currentUser: state.auth.currentUser,
    activePageIndex: state.designer.activePageIndex
  };
}

const mapDispatchToProps: CardDesignControlsDispatchProps = { saveCardDesign, addTextShape };

export const ConnectedArtistCardDesignControls = connect(mapStateToProps, mapDispatchToProps)(CardDesignControls);
