import * as React from 'react';
import { Card } from '@core/index';

export interface CardEditorProps {
  card: Card;
}

export class CardEditor extends React.Component<CardEditorProps> {
  render() {
    return <div>{this.props.card.title}</div>;
  }
}
