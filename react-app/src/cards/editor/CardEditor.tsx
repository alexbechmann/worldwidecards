import * as React from 'react';
import { Card } from '@core/index';
import { Paper } from 'material-ui';

export interface CardEditorProps {
  card: Card;
}

export class CardEditor extends React.Component<CardEditorProps> {
  render() {
    return <Paper>{this.props.card.title}</Paper>;
  }
}
