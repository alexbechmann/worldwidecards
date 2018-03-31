import { connect } from 'react-redux';
import { CardDesignControls, CardDesignControlsProps, CardDesignControlsDispatchProps } from './CardDesignControls';
import { saveCardDesign } from 'src/cards/designer/state/designer.actions';
import { AppState } from 'src/shared/state';

function mapStateToProps(state: AppState): CardDesignControlsProps {
  return {
    card: state.designer.activeCard,
    saving: state.designer.savingActiveCard,
    currentUser: state.auth.currentUser
  };
}

const mapDispatchToProps: CardDesignControlsDispatchProps = { saveCardDesign };

export const CardDesignControlsContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesignControls);
