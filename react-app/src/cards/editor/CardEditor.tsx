import * as React from 'react';
import { Grid, Stepper, Step, StepButton, StyleRulesCallback, Theme, withStyles, WithStyles } from 'material-ui';
import { Card, nameof } from '@wwc/core';
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

export interface CardEditorDispatchProps {
  addTextShape: (pageName: string, text: string) => any;
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
            <CardPageContainer pageName={nameof<Card>('frontPage')} page={this.props.card.frontPage} />
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
