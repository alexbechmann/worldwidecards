import * as React from 'react';
import { Paper } from 'material-ui';
import { Stage, Layer, Text } from 'react-konva';
import { TextShape, ImageShape, Shape, Page } from '@wwc/core';
import { ImageRect } from '../shapes/ImageRect';
import Measure, { BoundingRect } from 'react-measure';
import { Rect } from 'react-konva';
import { WithThemeProps } from 'src/shared/styles/with-theme-props';

export interface CardPageDispatchProps {
  updateShapePosition: (pageIndex: number, shapeIndex: number, x: number, y: number) => any;
  setEditingShape: (shape: Shape) => any;
}

export interface CardPageProps {
  page: Page;
  pageIndex: number;
  editingShape?: Shape;
}

interface State {
  bounds: Partial<BoundingRect>;
}

interface Props extends CardPageProps, CardPageDispatchProps, WithThemeProps {}

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
          <div>
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
                    <Layer>{this.renderHighlightZone()}</Layer>
                  </Stage>
                </Paper>
              ) : (
                <span />
              )}
            </div>
          </div>
        )}
      </Measure>
    );
  }

  calculateScaleX(): number {
    return this.state.bounds.width! / this.props.page.width!;
  }

  calculateScaleY(): number {
    return this.state.bounds.height! / this.props.page.height!;
  }

  calculateWidth(): number {
    return this.state.bounds.width!;
  }

  calculateHeight(): number {
    const percentageBetweenWidthAndHeight = this.getPercentageChange(this.props.page.width, this.props.page.height);
    const ratio = 1 + -percentageBetweenWidthAndHeight / 100;
    return this.calculateWidth() * ratio;
  }

  getPercentageChange(oldNumber: number, newNumber: number) {
    var decreaseValue = oldNumber - newNumber;
    return decreaseValue / oldNumber * 100;
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
            onClick={() => this.props.setEditingShape(shape)}
            onTap={() => this.props.setEditingShape(shape)}
            draggable={true}
            onDragMove={e => this.handleDragEnd(e, index)}
          />
        );
      } else if (shape instanceof TextShape) {
        return (
          <Text
            ref={(r: any) => {
              if (r) {
                // console.info(`Text box height: ${r.height()} with text ${shape.text}`);
              }
            }}
            x={shape.x}
            y={shape.y}
            key={index}
            width={shape.width}
            height={shape.height}
            fontSize={shape.fontSize}
            text={shape.text}
            align={'center'}
            draggable={true}
            fill={shape.color}
            onClick={() => this.props.setEditingShape(shape)}
            onTap={() => this.props.setEditingShape(shape)}
            onDragMove={e => this.handleDragEnd(e, index)}
          />
        );
      }
      return null;
    });
  }

  renderHighlightZone() {
    const { editingShape, theme } = this.props;
    if (editingShape) {
      return (
        <Rect
          x={editingShape.x}
          y={editingShape.y}
          width={editingShape.width}
          height={editingShape.height}
          fill={theme.palette.secondary.main}
          opacity={0.5}
        />
      );
    }
    return null;
  }

  handleDragEnd = (e: any, index: number) => {
    const rect: any = e.target;
    this.props.updateShapePosition(this.props.pageIndex, index, rect.attrs.x, rect.attrs.y);
  };
}
