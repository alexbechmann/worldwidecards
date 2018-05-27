import { connect } from 'react-redux';
import { saveCardDesign } from './state/artist.actions';
import { CardDesigner, CardDesignerConnectProps, CardDesignerDispatchProps } from '@app/designer/CardDesigner';
import { DesignerMode } from '@app/designer/designer-mode';
import { AppState } from '@app/state/app.state';

const mapDispatchToProps: CardDesignerDispatchProps = { saveCardDesign };

function mapStateToProps(state: AppState): CardDesignerConnectProps {
  return {
    mode: DesignerMode.Artist,
    deleting: state.artist.deletingActiveCardDesign
  };
}

export const ArtistCardDesigner = connect(mapStateToProps, mapDispatchToProps)(CardDesigner);
