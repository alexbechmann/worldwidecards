import { AppState } from '@app/state';
import { connect } from 'react-redux';
import { setActiveCard, unSetActiveCard, setEditingShape } from '@app/designer/state/designer.actions';
import { CardDesignerDispatchProps, CardDesignerProps } from '@app/designer/CardDesigner';
import { CardDesigner } from '@app/designer';
import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';

export interface CardDesignerConnectedDispatchProps {
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

export interface CardDesignerConnectedProps {
  mode: DesignerMode;
  deleting: boolean;
}

interface Props extends CardDesignerConnectedDispatchProps, CardDesignerConnectedProps {}

function mapStateToProps(state: AppState, ownProps: Props): CardDesignerProps {
  return {
    card: state.designer.activeCard,
    editingShapePosition: state.designer.editingShapePosition,
    currentUser: state.auth.currentUser,
    lastSavedDate: state.artist.activeCardLastSavedDate,
    saving: state.artist.savingActiveCard,
    deleting: ownProps.deleting,
    saveCardDesign: ownProps.saveCardDesign,
    mode: ownProps.mode
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { setActiveCard, unSetActiveCard, setEditingShape };

export const CardDesignerConnected = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
