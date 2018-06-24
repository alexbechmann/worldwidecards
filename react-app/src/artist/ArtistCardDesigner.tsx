import { connect } from 'react-redux';
import { saveCardDesign } from './state/artist.actions';
import CardDesigner, { CardDesignerExtendedProps } from '@app/designer/CardDesigner';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/state/app.state';

function mapStateToProps(state: AppState): CardDesignerExtendedProps {
  return {
    mode: DesignerMode.Artist,
    deleting: state.artist.deletingActiveCardDesign,
    saveCardDesign
  };
}

export default connect(mapStateToProps)(CardDesigner);
