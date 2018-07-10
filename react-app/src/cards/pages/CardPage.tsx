import * as React from 'react';
import { Paper, withTheme } from '@material-ui/core';
import { Stage, Layer, Text } from 'react-konva';
import { Shape, Page, constants, mathHelper } from '@wwc/core';
import { ImageRect } from '../shapes/ImageRect';
import Measure, { BoundingRect } from 'react-measure';
import { WithThemeProps } from '@app/shared/styles/with-theme-props';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { DesignerMode } from '@app/designer/designer-mode';
import { combineContainers } from 'combine-containers';
import { setEditingShape, updateShapePosition, sortShapes } from '@app/designer/state/designer.actions';
import { connect } from 'react-redux';
import { AppState } from '@app/state/app.state';
import { ConnectedReduxProps } from '@app/state/connected-redux-props';

interface CardPageProps {
  page: Page;
  pageIndex: number;
  editingShapePosition?: ShapePosition;
  editable: boolean;
  mode: DesignerMode;
}

interface State {
  bounds: Partial<BoundingRect>;
}

interface Props extends ConnectedReduxProps, CardPageProps, WithThemeProps {}

class CardPage extends React.Component<Props, State> {
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
                <Paper elevation={10}>
                  <Stage
                    scaleX={this.calculateScaleX()}
                    scaleY={this.calculateScaleY()}
                    width={this.calculateWidth()}
                    height={this.calculateHeight()}
                  >
                    <Layer>{this.renderShapes()}</Layer>
                    {/* <Layer>{this.renderHighlightZone()}</Layer> */}
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
    return mathHelper.calculateHeight({
      width: this.calculateWidth(),
      originalWidth: this.props.page.width,
      originalHeight: this.props.page.height
    });
  }

  renderShapes() {
    return this.props.page.shapes.map((shape: Shape, index: number) => {
      const draggable =
        this.props.mode === DesignerMode.Artist ? this.props.editable : this.props.editable && shape.allowUserEdit;
      switch (shape.type) {
        case constants.shapes.types.image: {
          return (
            <ImageRect
              key={index}
              href={shape.imageData!.href}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              onClick={() => this.setEditingShape(index)}
              onTap={() => this.setEditingShape(index)}
              draggable={draggable}
              onDragMove={e => this.handleDragEvent(e, index)}
              onDragEnd={() => this.props.dispatch(sortShapes({ pageIndex: this.props.pageIndex }))}
              cropData={shape.imageData!.crop}
              ratio={shape.imageData!.ratio}
              preventDefault={this.props.editable}
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
              draggable={draggable}
              fill={shape.textData!.color}
              onClick={() => this.setEditingShape(index)}
              onTap={() => this.setEditingShape(index)}
              onDragMove={e => this.handleDragEvent(e, index)}
              preventDefault={this.props.editable}
              onDragEnd={() => this.props.dispatch(sortShapes({ pageIndex: this.props.pageIndex }))}
            />
          );
        }
        default: {
          return null;
        }
      }
    });
  }

  setEditingShape(shapeIndex: number) {
    if (this.props.editable) {
      this.props.dispatch(
        setEditingShape({
          pageIndex: this.props.pageIndex,
          shapeIndex: shapeIndex
        })
      );
    }
  }

  // renderHighlightZone() {
  //   const { editingShapePosition, theme } = this.props;
  //   if (
  //     editingShapePosition &&
  //     this.props.pageIndex === editingShapePosition.pageIndex &&
  //     this.props.page.shapes[editingShapePosition.shapeIndex] != null
  //   ) {
  //     const editingShape: Shape = this.props.page.shapes[editingShapePosition.shapeIndex];
  //     return (
  //       <Rect
  //         x={editingShape.x}
  //         y={editingShape.y}
  //         width={editingShape.width}
  //         height={10}
  //         fill={theme.palette.secondary.main}
  //         opacity={0.5}
  //         draggable={this.props.editable}
  //         onDragMove={e => this.handleDragEvent(e, editingShapePosition.shapeIndex)}
  //       />
  //     );
  //   }
  //   return null;
  // }

  handleDragEvent = (e: any, index: number) => {
    const rect: any = e.target;
    this.props.dispatch(
      updateShapePosition({
        pageIndex: this.props.pageIndex,
        shapeIndex: index,
        x: rect.attrs.x,
        y: rect.attrs.y
      })
    );
  };
}

interface CardPageExtendedProps {
  page: Page;
  pageIndex: number;
  editable: boolean;
}

function mapStateToProps(state: AppState, ownProps: CardPageExtendedProps): CardPageProps {
  const { page, pageIndex, editable } = ownProps;
  return {
    page,
    pageIndex,
    editable,
    editingShapePosition: state.designer.editingShapePosition,
    mode: state.designer.activeCardDesignMode
  };
}

export default combineContainers(withTheme(), connect(mapStateToProps))(CardPage) as React.ComponentType<
  CardPageExtendedProps
>;
