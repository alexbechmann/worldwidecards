import * as React from 'react';
import { Card } from '@core/index';
import { Paper } from 'material-ui';
import { Stage, Layer, Text, Rect } from 'react-konva';
import * as Konva from 'konva';

class ColoredRect extends React.Component {
  state = {
    color: 'green'
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
        draggable={true}
      />
    );
  }
}

export interface CardEditorProps {
  card: Card;
}

export class CardEditor extends React.Component<CardEditorProps> {
  render() {
    return (
      <Paper>
        {this.props.card.title}
        {this.renderCanvas()}
      </Paper>
    );
  }

  renderCanvas() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          <ColoredRect />
        </Layer>
      </Stage>
    );
  }
}
