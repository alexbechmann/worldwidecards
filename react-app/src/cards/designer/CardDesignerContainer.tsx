import { AppState } from 'src/shared/state';
import { CardDesigner, CardDesignerProps, CardDesignerDispatchProps } from './CardDesigner';
import { connect } from 'react-redux';

function mapStateToProps(state: AppState): CardDesignerProps {
  return {
    card: state.card.activeCard,
    editingShape: state.card.cardDesigner.editingShape
  };
}

const mapDispatchToProps: CardDesignerDispatchProps = {};

export const CardDesignerContainer = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
