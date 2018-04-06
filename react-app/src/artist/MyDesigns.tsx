import * as React from 'react';
import { Card } from '@wwc/core';
import { CardPageContainer } from '@app/cards/pages/CardPageContainer';
import { Grid, Typography, CircularProgress } from 'material-ui';
import { routes } from '@app/shared/router/routes';
import { RouteButton } from '@app/shared/ui';

export interface MyDesignsProps {
  designs: Card[];
  loading: boolean;
}

export class MyDesigns extends React.Component<MyDesignsProps> {
  render() {
    return (
      <div>
        <Typography variant="headline">My Designs</Typography>
        <RouteButton to={routes.artistDesigner.build()}>New Card</RouteButton>
        <Grid container={true}>
          {this.props.designs.map(card => {
            return (
              <Grid key={card.id} item={true} xs={12} sm={3} xl={2}>
                <CardPageContainer page={card.pages[0]} pageIndex={0} cardId={card.id!} editable={false} />
                <RouteButton fullWidth={true} to={routes.artistDesigner.build(card.id)}>
                  Edit
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
