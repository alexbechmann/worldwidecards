import { AppState } from '@app/state/app.state';
import { connect } from 'react-redux';
import CardBrowser, { CardBrowserProps } from '@app/cards/CardBrowser';
import { DesignerMode } from '@app/designer/designer-mode';

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

export default connect(mapStateToProps)(CardBrowser);
