import * as React from 'react';
import { Paper, Grid, Stepper, Step, StepButton, StyleRulesCallback, Theme, withStyles, WithStyles } from 'material-ui';
import { Stage, Layer, Text } from 'react-konva';
import { Card, TextShape, ImageShape, Shape } from '@wwc/core';
import { ColoredRect } from './ColoredRect';
import { ImageRect } from './ImageRect';

type StyleClassNames = 'root';

const styles: StyleRulesCallback<StyleClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});

export interface CardEditorProps {
  card: Card;
}

export interface CardEditorDispatchProps {}

interface Props extends CardEditorProps, CardEditorDispatchProps {}

interface StyledProps extends Props, WithStyles<StyleClassNames> {}

class CardEditorComponent extends React.Component<StyledProps> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <Grid container={true}>
          <Grid item={true} xs={12}>
            {this.props.card.title}
            {this.renderStepper()}
            {this.renderCanvas()}
          </Grid>
        </Grid>
      </div>
    );
  }

  renderCanvas() {
    return (
      <Paper
        style={{
          width: 300,
          height: 500
        }}
      >
        <Stage width={300} height={500}>
          <Layer>
            {this.renderShapes()}
            <ColoredRect />    
          </Layer>
        </Stage>
      </Paper>
    );
  }

  renderShapes() {
    this.props.card.frontPage.shapes.map((shape: Shape, index: number) => {
      if(shape instanceof ImageShape) {
        return <ImageRect href={shape.href} x={shape.position.x} y={shape.position.y} width={270} height={250} />
      }
      else if(shape instanceof TextShape) {
        return <Text x={shape.position.x}
        y={shape.position.y}
        key={index}
        width={250}
        fontSize={shape.fontSize}
        draggable={true}
        text={shape.text}
        align={'center'} />
      }
      return null;
    });
  }

  renderStepper() {
    const steps = ['Front page', 'Inner right', 'Inner left', 'Back'];
    return (
      <Stepper nonLinear={true} activeStep={0}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepButton onClick={() => null} completed={false}>
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    );
  }
}

export const CardEditor: React.ComponentType<Props> = withStyles(styles, { withTheme: true })(CardEditorComponent);
