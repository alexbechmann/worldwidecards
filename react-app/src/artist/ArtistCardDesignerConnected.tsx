import { connect } from 'react-redux';
import { saveCardDesign, deleteCardDesign } from './state/artist.actions';
import {
  CardDesignerConnected,
  CardDesignerConnectedDispatchProps,
  CardDesignerConnectedProps
} from '@app/designer/CardDesignerConnected';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/shared/state';

const mapDispatchToProps: CardDesignerConnectedDispatchProps = { saveCardDesign, deleteCardDesign };

function mapStateToProps(state: AppState): CardDesignerConnectedProps {
  return {
    mode: DesignerMode.Artist,
    deleting: state.artist.deletingActiveCardDesign
  };
}

export const ArtistCardDesignerConnected = connect(mapStateToProps, mapDispatchToProps)(CardDesignerConnected);
