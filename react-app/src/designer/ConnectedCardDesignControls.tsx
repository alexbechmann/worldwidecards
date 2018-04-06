import { connect } from 'react-redux';
import { addTextShape } from '@app/designer/state/designer.actions';
import { AppState } from '@app/shared/state';
import {
  CardDesignControlsDispatchProps,
  CardDesignControlsProps,
  CardDesignControls
} from '@app/designer/controls/CardDesignControls';
import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';

export interface ConnectedCardDesignControlsDispatchProps {
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

interface Props extends ConnectedCardDesignControlsDispatchProps {}

function mapStateToProps(state: AppState, ownProps: Props): CardDesignControlsProps {
  return {
    card: state.designer.activeCard,
    saving: state.artist.savingActiveCard,
    currentUser: state.auth.currentUser,
    activePageIndex: state.designer.activePageIndex,
    saveCardDesign: ownProps.saveCardDesign
  };
}

const mapDispatchToProps: CardDesignControlsDispatchProps = { addTextShape };

export const ConnectedCardDesignControls: React.ComponentType<Props> = connect(mapStateToProps, mapDispatchToProps)(
  CardDesignControls
);
