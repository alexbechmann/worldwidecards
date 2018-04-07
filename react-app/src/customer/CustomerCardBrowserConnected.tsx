import { AppState } from '@app/shared/state';
import { connect } from 'react-redux';
import { CardBrowserProps, CardBrowser, CardBrowserDispatchProps } from '@app/cards/CardBrowser';
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

export const CustomerCardBrowserConnected = connect(mapStateToProps, mapDispatchToProps)(CardBrowser);
