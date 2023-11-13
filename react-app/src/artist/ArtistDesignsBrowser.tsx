import { AppState } from '@app/state/app.state';
import { connect } from 'react-redux';
import CardBrowser, { CardBrowserProps } from '@app/cards/CardBrowser';
import { DesignerMode } from '@app/designer/designer-mode';

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

export default connect(mapStateToProps)(CardBrowser);
