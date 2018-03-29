import { AppState } from 'src/shared/state';
import { CardDesigner, CardDesignerProps, CardDesignerDispatchProps } from './CardDesigner';
import { connect } from 'react-redux';
import { saveCardDesign } from 'src/cards/state/card.actions';
import { RouteComponentProps } from 'react-router';

interface RouteParameters {
  id: string;
}

function mapStateToProps(state: AppState, ownProps: RouteComponentProps<RouteParameters>): CardDesignerProps {
  return {
    card: state.card.myDesigns.find(design => design.id === ownProps.match.params.id),
    editingShapePosition: state.card.cardDesigner.editingShapePosition
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = { saveCardDesign };

export const CardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
