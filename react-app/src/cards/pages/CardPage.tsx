import * as React from 'react';
import { Paper } from 'material-ui';
import { Stage, Layer, Text } from 'react-konva';
import { TextShape, ImageShape, Shape, Page, constants } from '@wwc/core';
import { ImageRect } from '../shapes/ImageRect';

export interface CardPageDispatchProps {}

export interface CardPageProps {
  page: Page;
  pageIndex: number;
}

interface Props extends CardPageProps, CardPageDispatchProps {}

export class CardPage extends React.Component<Props> {
  render() {
    return (
      <Paper>
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
          <ImageRect key={index} href={shape.href} x={shape.x} y={shape.y} width={shape.width} height={shape.height} />
        );
      } else if (shape instanceof TextShape) {
        return (
          <Text
            x={shape.x}
            y={shape.y}
            key={index}
            width={shape.width}
            height={shape.height}
            fontSize={shape.fontSize}
            text={shape.text}
            align={'center'}
          />
        );
      }
      return null;
    });
  }
}
