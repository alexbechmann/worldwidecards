import * as React from 'react';
import { Card } from '@core/index';
import { Paper, Grid } from 'material-ui';
import { Stage, Layer, Text, Rect } from 'react-konva';
import * as Konva from 'konva';

class ColoredRect extends React.Component {
  state = {
    color: 'green',
    x: 0,
    y: 0
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  handleDragEnd = (e: any) => {
    console.log(e);
    const mouseEvent: MouseEvent = e.evt;
    this.setState({
      x: mouseEvent.layerX,
      y: mouseEvent.layerY
    });
  };
  render() {
    return (
      <Rect
        x={this.state.x}
        y={this.state.y}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
        draggable={true}
        onDragEnd={this.handleDragEnd}
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
      <Grid container={true}>
        <Grid item={true}>
          <Paper>
            {this.props.card.title}
            {this.renderCanvas()}
          </Paper>
        </Grid>
      </Grid>
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
