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
  CircularProgress,
  Typography
} from 'material-ui';
import { Card, constants, Shape } from '@wwc/core';
import { ImageControls } from './controls/ImageControls';
import { CardPageContainer } from 'src/cards/pages/CardPageContainer';
import { ShapePosition } from 'src/cards/shapes/shape-position';
import { RouteComponentProps } from 'react-router';
import { UserInfo } from 'firebase';
import { TextControlsContainer } from 'src/cards/designer/controls/TextControlsContainer';
import { CardDesignControlsContainer } from 'src/cards/designer/controls/CardDesignControlsContainer';
import { TimeAgo } from 'src/shared/ui';

type StyleClassNames = 'root';

const styles: StyleRulesCallback<StyleClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  }
});

export interface CardDesignerProps {
  card?: Card;
  editingShapePosition?: ShapePosition;
  currentUser?: UserInfo;
  lastSavedDate?: Date;
  saving: boolean;
}

export interface CardDesignerDispatchProps {
  setActiveCard: (user: UserInfo, cardId?: string) => any;
  unSetActiveCard: () => any;
}

interface RouteParameters {
  id: string;
}

interface Props extends CardDesignerProps, CardDesignerDispatchProps, RouteComponentProps<RouteParameters> {}

interface StyledProps extends Props, WithStyles<StyleClassNames> {}

class CardDesignerComponent extends React.Component<StyledProps> {
  render() {
    return this.props.currentUser != null ? (
      <div className={this.props.classes.root}>{this.props.card ? this.renderDesigner() : <CircularProgress />}</div>
    ) : (
      <div>Must be logged in.</div>
    );
  }

  componentDidMount() {
    if (!this.props.card || (this.props.card.id !== this.props.match.params.id && this.props.currentUser)) {
      this.props.setActiveCard(this.props.currentUser!, this.props.match.params.id);
    }
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
              <CardDesignControlsContainer />
              <CardPageContainer
                pageIndex={0}
                page={this.props.card.pages[0]}
                cardId={this.props.card.id!}
                editable={true}
              />
              <br />
              {this.renderSaveStatus()}
            </Grid>
            <Grid item={true} sm={8} xs={12}>
              <p>Work area</p>
              {this.renderControls()}
            </Grid>
          </Grid>
        </div>
      );
    }
    return null;
  }

  renderSaveStatus() {
    if (this.props.saving) {
      return <CircularProgress size={24} />;
    } else if (this.props.lastSavedDate) {
      return (
        <Typography variant="caption">
          Last saved: <TimeAgo date={this.props.lastSavedDate} />
        </Typography>
      );
    } else {
      return null;
    }
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
            return <TextControlsContainer />;
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

  componentWillUnmount() {
    this.props.unSetActiveCard();
  }
}

export const CardDesigner: React.ComponentType<Props> = withStyles(styles, { withTheme: true })(CardDesignerComponent);
