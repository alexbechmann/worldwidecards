import { AppState } from '@app/shared/state';
import { connect } from 'react-redux';
import { setActiveCard, unSetActiveCard } from '@app/designer/state/designer.actions';
import { CardDesignerDispatchProps, CardDesignerProps } from '@app/designer/CardDesigner';
import { CardDesigner } from '@app/designer';
import { UserInfo } from 'firebase';
import { Card } from '@wwc/core';
import { DesignerMode } from '@app/designer/designer-mode';

export interface ConnectedCardDesignerDispatchProps {
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

export interface ConnectedCardDesignerProps {
  mode: DesignerMode;
}

interface Props extends ConnectedCardDesignerDispatchProps, ConnectedCardDesignerProps {}

function mapStateToProps(state: AppState, ownProps: Props): CardDesignerProps {
  return {
    card: state.designer.activeCard,
    editingShapePosition: state.designer.editingShapePosition,
    currentUser: state.auth.currentUser,
    lastSavedDate: state.artist.activeCardLastSavedDate,
    saving: state.artist.savingActiveCard,
    saveCardDesign: ownProps.saveCardDesign,
    mode: ownProps.mode
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { setActiveCard, unSetActiveCard };

export const ConnectedCardDesigner = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
