import { AppState } from '@app/shared/state';
import { connect } from 'react-redux';
import { CardBrowserProps, CardBrowser } from '@app/cards/CardBrowser';
import { DesignerMode } from '@app/designer/designer-mode';

function mapStateToProps(state: AppState): CardBrowserProps {
  return {
    designs: state.artist.myDesigns,
    loading: state.artist.loadingMyDesigns,
    headline: 'My Designs',
    cardSelectText: 'Edit',
    mode: DesignerMode.Artist
  };
}

export const ConnectedArtistDesignsBrowser = connect(mapStateToProps, null)(CardBrowser);
