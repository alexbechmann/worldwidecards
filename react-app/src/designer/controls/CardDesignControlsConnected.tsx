import { connect } from 'react-redux';
import { addTextShape } from '@app/designer/state/designer.actions';
import { AppState } from '@app/shared/state';
import { CardDesignControlsDispatchProps, CardDesignControlsProps, CardDesignControls } from './CardDesignControls';
import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';
import { deleteCardDesign } from '@app/artist/state/artist.actions';
import { combineContainers } from '@app/shared/helpers/combine-containers';
import { withRouter } from 'react-router';

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
    saveCardDesign: ownProps.saveCardDesign,
    mode: state.designer.activeCardDesignMode
  };
}

const mapDispatchToProps: CardDesignControlsDispatchProps = { addTextShape, deleteCardDesign };

export const CardDesignControlsConnected: React.ComponentType<Props> = combineContainers(CardDesignControls, [
  c => connect(mapStateToProps, mapDispatchToProps)(c),
  c => withRouter(c)
]);
