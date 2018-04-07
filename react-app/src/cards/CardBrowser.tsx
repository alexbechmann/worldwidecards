import * as React from 'react';
import { Card } from '@wwc/core';
import { CardPageContainer } from '@app/cards/pages/CardPageContainer';
import { Grid, Typography, CircularProgress } from 'material-ui';
import { routes } from '@app/shared/router/routes';
import { RouteButton } from '@app/shared/ui';
import { DesignerMode } from '@app/designer/designer-mode';

export interface CardBrowserProps {
  designs: Card[];
  loading: boolean;
  headline: string;
  mode: DesignerMode;
  cardSelectText: string;
}

interface Props extends CardBrowserProps {}

export class CardBrowser extends React.Component<Props> {
  render() {
    return (
      <div>
        <Typography variant="headline">{this.props.headline}</Typography>
        <RouteButton to={routes.artistDesigner.build()}>New Card</RouteButton>
        <Grid container={true}>
          {this.props.designs.map(card => {
            const to =
              this.props.mode === DesignerMode.Artist
                ? routes.artistDesigner.build(card.id)
                : routes.customerDesigner.build(card.id);
            return (
              <Grid key={card.id} item={true} xs={12} sm={3} xl={2}>
                <CardPageContainer page={card.pages[0]} pageIndex={0} cardId={card.id!} editable={false} />
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
