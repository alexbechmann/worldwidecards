import { AppState } from '@app/state/app.state';
import { connect } from 'react-redux';
import CardBrowser, { CardBrowserProps, CardBrowserDispatchProps } from '@app/cards/CardBrowser';
import { DesignerMode } from '@app/designer/designer-mode';
import { startWatchingAllCardDesigns } from './state/customer.actions';

function mapStateToProps(state: AppState): CardBrowserProps {
  return {
    designs: state.customer.cards,
    loading: state.customer.loadingCards,
    headline: 'Cards',
    cardSelectText: 'Select',
    mode: DesignerMode.Customer,
    isSubscribedToCardChanges: state.customer.isSubscribedToCardChanges
  };
}

const mapDispatchToProps: CardBrowserDispatchProps = { startWatchingAllCardDesigns };

export default connect(mapStateToProps, mapDispatchToProps)(CardBrowser);
