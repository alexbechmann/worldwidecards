import * as React from 'react';
import { Paper } from 'material-ui';
import { Stage, Layer, Text } from 'react-konva';
import { Shape, Page, constants } from '@wwc/core';
import { ImageRect } from '../shapes/ImageRect';
import Measure, { BoundingRect } from 'react-measure';
import { Rect } from 'react-konva';
import { WithThemeProps } from 'src/shared/styles/with-theme-props';
import { ShapePosition } from 'src/cards/shapes/shape-position';

export interface CardPageDispatchProps {
  updateShapePosition: (pageIndex: number, shapeIndex: number, x: number, y: number) => any;
  setEditingShape: (position: ShapePosition) => any;
}

export interface CardPageProps {
  page: Page;
  pageIndex: number;
  editingShapePosition?: ShapePosition;
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
      switch (shape.type) {
        case constants.shapes.types.image: {
          return (
            <ImageRect
              key={index}
              href={shape.imageData!.href}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              onClick={() =>
                this.props.setEditingShape({
                  pageIndex: this.props.pageIndex,
                  shapeIndex: index
                })
              }
              onTap={() =>
                this.props.setEditingShape({
                  pageIndex: this.props.pageIndex,
                  shapeIndex: index
                })
              }
              draggable={true}
              onDragMove={e => this.handleDragEnd(e, index)}
            />
          );
        }
        case constants.shapes.types.text: {
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
              fontSize={shape.textData!.fontSize}
              text={shape.textData!.text}
              align={'center'}
              draggable={true}
              fill={shape.textData!.color}
              onClick={() =>
                this.props.setEditingShape({
                  pageIndex: this.props.pageIndex,
                  shapeIndex: index
                })
              }
              onTap={() =>
                this.props.setEditingShape({
                  pageIndex: this.props.pageIndex,
                  shapeIndex: index
                })
              }
              onDragMove={e => this.handleDragEnd(e, index)}
            />
          );
        }
        default: {
          return null;
        }
      }
    });
  }

  renderHighlightZone() {
    const { editingShapePosition, theme } = this.props;
    if (editingShapePosition && this.props.pageIndex === editingShapePosition.pageIndex) {
      const editingShape: Shape = this.props.page.shapes[editingShapePosition.shapeIndex];
      if (editingShape) {
        return (
          <Rect
            x={editingShape.x}
            y={editingShape.y}
            width={editingShape.width}
            height={editingShape.height}
            fill={theme.palette.secondary.main}
            opacity={0.5}
            draggable={true}
            onDragMove={e => this.handleDragEnd(e, editingShapePosition.shapeIndex)}
          />
        );
      }
    }
    return null;
  }

  handleDragEnd = (e: any, index: number) => {
    const rect: any = e.target;
    this.props.updateShapePosition(this.props.pageIndex, index, rect.attrs.x, rect.attrs.y);
  };
}
