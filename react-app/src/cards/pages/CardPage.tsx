import * as React from 'react';
import { Paper } from 'material-ui';
import { Stage, Layer, Text } from 'react-konva';
import { TextShape, ImageShape, Shape, Page } from '@wwc/core';
import { ImageRect } from '../shapes/ImageRect';
import Measure, { BoundingRect } from 'react-measure';

export interface CardPageDispatchProps {}

export interface CardPageProps {
  page: Page;
  pageIndex: number;
}

interface State {
  bounds: Partial<BoundingRect>;
}

interface Props extends CardPageProps, CardPageDispatchProps {}

export class CardPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      bounds: {
        width: -1,
        height: -1
      }
    };
  }
  render() {
    return (
      <Measure
        bounds={true}
        onResize={contentRect => {
          this.setState({ bounds: contentRect.bounds! });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            {this.state.bounds.width! > -1 ? (
              <Paper>
                <Stage
                  scaleX={this.calculateScaleX()}
                  scaleY={this.calculateScaleY()}
                  width={this.calculateWidth()}
                  height={this.calculateHeight()}
                >
                  <Layer>{this.renderShapes()}</Layer>
                </Stage>
              </Paper>
            ) : (
              <span />
            )}
          </div>
        )}
      </Measure>
    );
  }

  calculateScaleX(): number {
    const a = this.props.page.width!;
    const b = this.state.bounds.width!;
    return b / a;
  }

  calculateScaleY(): number {
    const a = this.props.page.height!;
    const b = this.state.bounds.height!;
    return b / a;
  }

  calculateWidth(): number {
    return this.state.bounds.width!;
  }

  calculateHeight(): number {
    return this.calculateWidth() * 1.414;
  }

  renderShapes() {
    return this.props.page.shapes.map((shape: Shape, index: number) => {
      if (shape instanceof ImageShape) {
        return (
          <ImageRect
            key={index}
            href={shape.href}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            onClick={console.log}
            draggable={true}
          />
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
            draggable={true}
          />
        );
      }
      return null;
    });
  }
}
