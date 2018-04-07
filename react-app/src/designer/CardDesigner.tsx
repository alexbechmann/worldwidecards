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
  Typography,
  Divider
} from 'material-ui';
import { Card, constants, Shape } from '@wwc/core';
import { ImageControls } from './controls/ImageControls';
import { CardPageContainer } from '@app/cards/pages/CardPageContainer';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { RouteComponentProps } from 'react-router';
import { UserInfo } from 'firebase';
import { TimeAgo } from '@app/shared/ui';
import { ConnectedTextControls } from '@app/designer/controls/ConnectedTextControls';
import { DesignerMode } from '@app/designer/designer-mode';
import { ConnectedCardDesignControls } from '@app/designer/ConnectedCardDesignControls';
import { SetActiveCardArgs } from '@app/designer/state/designer.action-types';

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
  saveCardDesign: (user: UserInfo, card: Card) => any;
  mode: DesignerMode;
}

export interface CardDesignerDispatchProps {
  setActiveCard: (args: SetActiveCardArgs) => any;
  unSetActiveCard: () => any;
}

interface RouteParameters {
  id: string;
}

interface Props extends CardDesignerProps, CardDesignerDispatchProps, RouteComponentProps<RouteParameters> {}

interface StyledProps extends Props, WithStyles<StyleClassNames> {}

class CardDesignerComponent extends React.Component<StyledProps> {
  render() {
    return this.props.currentUser != null || this.props.mode === DesignerMode.Customer ? (
      <div className={this.props.classes.root}>{this.props.card ? this.renderDesigner() : <CircularProgress />}</div>
    ) : (
      <div>Must be logged in.</div>
    );
  }

  componentDidMount() {
    if (!this.props.card || (this.props.card.id !== this.props.match.params.id && this.props.currentUser)) {
      this.props.setActiveCard({
        user: this.props.currentUser!,
        cardId: this.props.match.params.id,
        mode: this.props.mode
      });
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
              <ConnectedCardDesignControls saveCardDesign={this.props.saveCardDesign} />
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
              <p>Work area {this.props.mode}</p>
              {this.props.mode === DesignerMode.Artist
                ? this.renderArtistShapeControls()
                : this.renderCustomerShapeControls()}
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

  renderArtistShapeControls() {
    const { editingShapePosition } = this.props;
    if (editingShapePosition && this.props.card) {
      const editingShape: Shape = this.props.card.pages[editingShapePosition.pageIndex].shapes[
        editingShapePosition.shapeIndex
      ];
      if (editingShape) {
        return this.renderShapeControl(editingShape, editingShapePosition);
      }
    }
    return null;
  }

  renderCustomerShapeControls() {
    if (this.props.card) {
      return this.props.card!.pages[0].shapes.sort((a, b) => (a.y! < b.y! ? 1 : -1)).map((shape, index) => {
        return (
          <div key={index}>
            {shape.allowUserEdit ? (
              <div>
                {this.renderShapeControl(shape, {
                  pageIndex: 0,
                  shapeIndex: index
                })}
                <Divider light={true} />
              </div>
            ) : (
              <span />
            )}
          </div>
        );
      });
    }
    return null;
  }

  renderShapeControl(shape: Shape, shapePosition: ShapePosition) {
    switch (shape.type) {
      case constants.shapes.types.image: {
        return <ImageControls />;
      }
      case constants.shapes.types.text: {
        return <ConnectedTextControls shape={shape} shapePosition={shapePosition} page={this.props.card!.pages[0]} />;
      }
      default: {
        return null;
      }
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

  componentWillUnmount() {
    this.props.unSetActiveCard();
  }
}

export const CardDesigner: React.ComponentType<Props> = withStyles(styles, { withTheme: true })(CardDesignerComponent);
