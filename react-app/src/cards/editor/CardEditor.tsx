import * as React from 'react';
import { Grid, Stepper, Step, StepButton, StyleRulesCallback, Theme, withStyles, WithStyles } from 'material-ui';
import { Card } from '@wwc/core';
import { CardPageContainer } from '../pages/CardPageContainer';

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
          </Grid>
        </Grid>
        <Grid container={true}>
          <Grid item={true} sm={4}>
            <CardPageContainer pageIndex={Card.frontPageIndex()} page={this.props.card.frontPage()} />
          </Grid>
          <Grid item={true} sm={1}>
            <div className="card-preview">
              <CardPageContainer pageIndex={Card.frontPageIndex()} page={this.props.card.frontPage()} />
            </div>
          </Grid>
          <Grid item={true} sm={4}>
            <CardPageContainer pageIndex={Card.innerLeftPageIndex()} page={this.props.card.innerLeftPage()} />
          </Grid>
        </Grid>
      </div>
    );
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
