import * as React from 'react';
import { Paper } from 'material-ui';
import { Stage, Layer, Text } from 'react-konva';
import { TextShape, ImageShape, Shape, Page, constants } from '@wwc/core';
import { ImageRect } from '../shapes/ImageRect';
import { Position } from '@wwc/core';

export interface CardPageDispatchProps {
  updateShapePosition: (pageIndex: number, shapeIndex: number, position: Position) => any;
}

export interface CardPageProps {
  page: Page;
  pageIndex: number;
}

interface Props extends CardPageProps, CardPageDispatchProps {}

export class CardPage extends React.Component<Props> {
  render() {
    return (
      <Paper
        style={{ width: constants.card.dimensions.portrait.width, height: constants.card.dimensions.portrait.height }}
      >
        <Stage width={constants.card.dimensions.portrait.width} height={constants.card.dimensions.portrait.height}>
          <Layer>{this.renderShapes()}</Layer>
        </Stage>
      </Paper>
    );
  }

  renderShapes() {
    return this.props.page.shapes.map((shape: Shape, index: number) => {
      if (shape instanceof ImageShape) {
        return (
          <ImageRect
            key={index}
            href={shape.href}
            x={shape.position.x}
            y={shape.position.y}
            width={270}
            height={250}
            onDragEnd={e => this.handleDragEnd(e, index)}
          />
        );
      } else if (shape instanceof TextShape) {
        return (
          <Text
            x={shape.position.x}
            y={shape.position.y}
            key={index}
            width={250}
            fontSize={shape.fontSize}
            draggable={true}
            text={shape.text}
            align={'center'}
            onDragEnd={e => this.handleDragEnd(e, index)}
          />
        );
      }
      return null;
    });
  }

  handleDragEnd = (e: any, index: number) => {
    const rect: any = e.target;
    this.props.updateShapePosition(this.props.pageIndex, index, {
      x: rect.attrs.x,
      y: rect.attrs.y
    });
  };
}
