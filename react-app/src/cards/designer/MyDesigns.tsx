import * as React from 'react';
import { Card } from '@wwc/core';
import { CardPageContainer } from 'src/cards/pages/CardPageContainer';
import { Grid, Typography, Button } from 'material-ui';
import { Link } from 'react-router-dom';
import { routes } from 'src/shared/router/routes';

export interface MyDesignsProps {
  designs: Card[];
}

export class MyDesigns extends React.Component<MyDesignsProps> {
  render() {
    return (
      <div>
        <Typography variant="headline">My Designs</Typography>
        {this.renderLink('New card', undefined)}
        <Grid container={true}>
          {this.props.designs.map(card => {
            return (
              <Grid key={card.id} item={true} xs={12} sm={3} xl={2}>
                <CardPageContainer page={card.pages[0]} pageIndex={0} cardId={card.id!} />
                {this.renderLink('Edit', card.id)}
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }

  renderLink(text: string, id?: string) {
    const DesignerLink = (props: any) => <Link to={routes.designs.build(id)} {...props} />;
    return <Button component={DesignerLink}>{text}</Button>;
  }
}
