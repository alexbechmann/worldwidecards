import * as React from 'react';
import {
  Grid,
  Stepper,
  Step,
  StepButton,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
  Button
} from 'material-ui';
import { Card, Shape, ImageShape, TextShape } from '@wwc/core';
import { ImageControls } from './controls/ImageControls';
import { TextControls } from './controls/TextControls';
import { CardPageContainer } from 'src/cards/pages/CardPageContainer';

type StyleClassNames = 'root';

const styles: StyleRulesCallback<StyleClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});

export interface CardDesignerProps {
  card: Card;
  editingShape?: Shape;
}

export interface CardDesignerDispatchProps {
  saveCardDesign: (card: Card) => any;
}

interface Props extends CardDesignerProps, CardDesignerDispatchProps {}

interface StyledProps extends Props, WithStyles<StyleClassNames> {}

class CardDesignerComponent extends React.Component<StyledProps> {
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
            {this.renderControls()}
            <CardPageContainer pageIndex={Card.frontPageIndex()} page={this.props.card.frontPage()} />
          </Grid>
          <Grid item={true} sm={2} xs={12}>
            <p>Work area</p>
            <CardPageContainer pageIndex={Card.frontPageIndex()} page={this.props.card.frontPage()} />
            <br />
            <br />
            <Button onClick={() => this.props.saveCardDesign(this.props.card)}>Save</Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  renderControls() {
    if (this.props.editingShape instanceof ImageShape) {
      return <ImageControls />;
    } else if (this.props.editingShape instanceof TextShape) {
      return <TextControls />;
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

export const CardDesigner: React.ComponentType<Props> = withStyles(styles, { withTheme: true })(CardDesignerComponent);
