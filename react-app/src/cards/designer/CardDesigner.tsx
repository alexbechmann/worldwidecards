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
  Button,
  CircularProgress
} from 'material-ui';
import { Card, constants, Shape } from '@wwc/core';
import { ImageControls } from './controls/ImageControls';
import { TextControls } from './controls/TextControls';
import { CardPageContainer } from 'src/cards/pages/CardPageContainer';
import { ShapePosition } from 'src/cards/shapes/shape-position';

type StyleClassNames = 'root';

const styles: StyleRulesCallback<StyleClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});

export interface CardDesignerProps {
  card?: Card;
  editingShapePosition?: ShapePosition;
}

export interface CardDesignerDispatchProps {
  saveCardDesign: (card: Card) => any;
}

interface Props extends CardDesignerProps, CardDesignerDispatchProps {}

interface StyledProps extends Props, WithStyles<StyleClassNames> {}

class CardDesignerComponent extends React.Component<StyledProps> {
  render() {
    return (
      <div className={this.props.classes.root}>{this.props.card ? this.renderDesigner() : <CircularProgress />}</div>
    );
  }

  renderDesigner() {
    if (this.props.card) {
      return (
        <div>
          <Grid container={true}>
            <Grid item={true} xs={12}>
              {this.renderStepper()}
            </Grid>
          </Grid>
          <Grid container={true}>
            <Grid item={true} sm={4} xs={12}>
              {this.renderControls()}
              <CardPageContainer pageIndex={0} page={this.props.card.pages[0]} cardId={this.props.card.id!} />
            </Grid>
            <Grid item={true} sm={2} xs={12}>
              <p>Work area</p>
              <CardPageContainer pageIndex={0} page={this.props.card.pages[0]} cardId={this.props.card.id!} />
              <br />
              <br />
              <Button onClick={() => this.props.saveCardDesign(this.props.card!)}>Save</Button>
            </Grid>
          </Grid>
        </div>
      );
    }
    return null;
  }

  renderControls() {
    const { editingShapePosition } = this.props;
    if (editingShapePosition && this.props.card) {
      const editingShape: Shape = this.props.card.pages[editingShapePosition.pageIndex].shapes[
        editingShapePosition.shapeIndex
      ];
      if (editingShape) {
        switch (editingShape.type) {
          case constants.shapes.types.image: {
            return <ImageControls />;
          }
          case constants.shapes.types.text: {
            return <TextControls />;
          }
          default: {
            return null;
          }
        }
      }
    }
    return null;
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
