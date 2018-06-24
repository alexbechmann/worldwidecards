import * as React from 'react';
import { Card } from '@wwc/core';
import CardPage from '@app/cards/pages/CardPage';
import {
  Grid,
  Typography,
  CircularProgress,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';
import { routes } from '@app/shared/router/routes';
import RouteButton from '@app/shared/ui/RouteButton';
import { DesignerMode } from '@app/designer/designer-mode';
import { ConnectedReduxProps } from '@app/state/connected-redux-props';
import { startWatchingAllCardDesigns } from '@app/customer/state/customer.actions';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';

export interface CardBrowserProps {
  designs: Card[];
  loading: boolean;
  headline: string;
  mode: DesignerMode;
  cardSelectText: string;
  isSubscribedToCardChanges: boolean;
}

type ClassNames = 'root' | 'bottomMargin';

const styles: StyleRulesCallback<ClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit * 2
  }
});

interface Props extends CardBrowserProps, ConnectedReduxProps, WithStyles<ClassNames> {}

class CardBrowser extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.bottomMargin}>
          <Typography className={this.props.classes.bottomMargin} variant="headline">
            {this.props.headline}
          </Typography>
          {this.renderNewCardButton()}
        </div>
        <Grid container={true} spacing={16}>
          {this.props.designs.map(card => {
            const to =
              this.props.mode === DesignerMode.Artist
                ? routes.artistDesigner.build(card.id)
                : routes.customerDesigner.build(card.id);
            return (
              <Grid key={card.id} item={true} xs={12} sm={3} xl={2}>
                <CardPage page={card.pages[0]} pageIndex={0} editable={false} />
                <RouteButton fullWidth={true} to={to}>
                  {this.props.cardSelectText}
                </RouteButton>
              </Grid>
            );
          })}
        </Grid>
        {this.renderLoadingState()}
      </div>
    );
  }

  componentDidMount() {
    if (this.props.mode === DesignerMode.Customer && !this.props.isSubscribedToCardChanges) {
      this.props.dispatch(startWatchingAllCardDesigns());
    }
  }

  renderNewCardButton() {
    const to =
      this.props.mode === DesignerMode.Artist ? routes.artistDesigner.build() : routes.customerDesigner.build();

    return <RouteButton to={to}>New Card</RouteButton>;
  }

  renderLoadingState() {
    return this.props.loading ? (
      <CircularProgress />
    ) : this.props.designs.length > 0 ? (
      <span />
    ) : (
      <div>No designs yet.</div>
    );
  }
}

export default combineContainers(CardBrowser, [withStyles(styles), connect()]) as React.ComponentType<CardBrowserProps>;
