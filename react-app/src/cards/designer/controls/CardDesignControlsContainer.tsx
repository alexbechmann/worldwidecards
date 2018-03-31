import { connect } from 'react-redux';
import { CardDesignControls, CardDesignControlsProps, CardDesignControlsDispatchProps } from './CardDesignControls';
import { saveCardDesign, addTextShape } from '@app/cards/designer/state/designer.actions';
import { AppState } from '@app/shared/state';

function mapStateToProps(state: AppState): CardDesignControlsProps {
  return {
    card: state.designer.activeCard,
    saving: state.designer.savingActiveCard,
    currentUser: state.auth.currentUser,
    activePageIndex: state.designer.activePageIndex
  };
}

const mapDispatchToProps: CardDesignControlsDispatchProps = { saveCardDesign, addTextShape };

export const CardDesignControlsContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesignControls);
