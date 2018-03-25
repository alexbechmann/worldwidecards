import * as React from 'react';
import * as Konva from 'konva';
import { Rect } from 'react-konva';

export class ColoredRect extends React.Component {
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
    const rect: any = e.target;
    this.setState({
      x: rect.attrs.x,
      y: rect.attrs.y
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
        shadowBlur={0}
        onClick={this.handleClick}
        draggable={true}
        onDragEnd={this.handleDragEnd}
      />
    );
  }
}
