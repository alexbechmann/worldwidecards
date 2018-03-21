import * as React from 'react';
import { Paper, Grid, Stepper, Step, StepButton, WithStyles } from 'material-ui';
import { Stage, Layer, Text } from 'react-konva';
import { CardEditorProps } from './card-editor.props';
import { ColoredRect } from './ColoredRect';
import { CardEditorClassNames } from './card-editor.styles';

interface Props extends CardEditorProps, WithStyles<CardEditorClassNames> {}

export class CardEditor extends React.Component<Props> {
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
            {this.renderTexts()}
            <ColoredRect />
          </Layer>
        </Stage>
      </Paper>
    );
  }

  renderTexts() {
    return this.props.card.frontPage.texts.map((text, index) => {
      return (
        <Text
          x={text.position.x}
          y={text.position.y}
          key={index}
          width={250}
          fontSize={text.fontSize}
          draggable={true}
          text={text.text}
        />
      );
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
