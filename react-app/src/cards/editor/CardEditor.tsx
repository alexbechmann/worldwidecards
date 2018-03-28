import * as React from 'react';
import { Grid, Stepper, Step, StepButton, StyleRulesCallback, Theme, withStyles, WithStyles } from 'material-ui';
import { Card, Shape } from '@wwc/core';
import { CardPage } from 'src/cards/pages/CardPage';
import { ImageControls } from 'src/cards/editor/controls/ImageControls';

type StyleClassNames = 'root';

const styles: StyleRulesCallback<StyleClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});

export interface CardEditorProps {
  card: Card;
  editingShape?: Shape;
}

export interface CardEditorDispatchProps {
  setEditingShape: (shape: Shape) => any;
}

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
          </Grid>
        </Grid>
        <Grid container={true}>
          <Grid item={true} sm={4} xs={12}>
            {this.renderControlsForPage(Card.frontPageIndex())}
            <CardPage
              onShapeClick={this.props.setEditingShape}
              pageIndex={Card.frontPageIndex()}
              page={this.props.card.frontPage()}
            />
          </Grid>
          <Grid item={true} sm={8} xs={12}>
            <p>Work area</p>
          </Grid>
        </Grid>
      </div>
    );
  }

  renderControlsForPage(index: number) {
    if (this.props.editingShape) {
      return <ImageControls />;
    } else {
      return null;
    }
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
