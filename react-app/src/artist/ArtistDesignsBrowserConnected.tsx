import { AppState } from '@app/state/app.state';
import { connect } from 'react-redux';
import { CardBrowserProps, CardBrowser, CardBrowserDispatchProps } from '@app/cards/CardBrowser';
import { DesignerMode } from '@app/designer/designer-mode';
import { startWatchingAllCardDesigns } from '@app/customer/state/customer.actions';

function mapStateToProps(state: AppState): CardBrowserProps {
  return {
    designs: state.artist.myDesigns,
    loading: state.artist.loadingMyDesigns,
    headline: 'My Designs',
    cardSelectText: 'Edit',
    mode: DesignerMode.Artist,
    isSubscribedToCardChanges: state.customer.isSubscribedToCardChanges // a way to make this not needed ?
  };
}

const mapDispatchToProps: CardBrowserDispatchProps = { startWatchingAllCardDesigns };

export const ArtistDesignsBrowserConnected = connect(mapStateToProps, mapDispatchToProps)(CardBrowser);
