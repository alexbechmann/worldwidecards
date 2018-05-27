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
  Button
} from 'material-ui';
import { Card, constants, Shape } from '@wwc/core';
import { ImageControls } from './controls/images/ImageControls';
import { CardPage } from '@app/cards/pages/CardPage';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { RouteComponentProps } from 'react-router';
import { UserInfo } from 'firebase';
import { TimeAgo } from '@app/shared/ui';
import { TextControls } from './controls/text/TextControls';
import { DesignerMode } from '@app/designer/designer-mode';
import { CardDesignControls } from '@app/designer/controls/CardDesignControls';
import { SetActiveCardArgs } from '@app/designer/state/designer.action-types';
import { AppState } from '@app/state/app.state';
import { setActiveCard, unSetActiveCard, setEditingShape } from '@app/designer/state/designer.actions';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';

type StyleClassNames = 'root' | 'button';

const styles: StyleRulesCallback<StyleClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  }
});

interface CardDesignerComponentProps {
  card?: Card;
  editingShapePosition?: ShapePosition;
  currentUser?: UserInfo;
  lastSavedDate?: Date;
  saving: boolean;
  deleting: boolean;
  mode: DesignerMode;
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

interface CardDesignerComponentDispatchProps {
  setActiveCard: (args: SetActiveCardArgs) => any;
  setEditingShape: (position: ShapePosition) => any;
  unSetActiveCard: () => any;
}

interface RouteParameters {
  id: string;
}

interface Props
  extends CardDesignerComponentProps,
    CardDesignerComponentDispatchProps,
    RouteComponentProps<RouteParameters>,
    WithStyles<StyleClassNames> {}

class CardDesignerComponent extends React.Component<Props> {
  render() {
    if (this.props.deleting) {
      return <CircularProgress />;
    }
    return this.props.currentUser != null || this.props.mode === DesignerMode.Customer ? (
      <div>{this.props.card ? this.renderDesigner() : <CircularProgress />}</div>
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
          {this.renderStepper()}
          <div className={this.props.classes.root}>
            <Grid container={true}>
              <Grid item={true} xs={8} sm={5} lg={3}>
                <CardDesignControls saveCardDesign={this.props.saveCardDesign} />
                <CardPage pageIndex={0} page={this.props.card.pages[0]} editable={true} />
                <br />
                {this.renderSaveStatus()}
              </Grid>
              <Grid item={true} xs={12} sm={7} lg={9}>
                <p>Work area {this.props.mode}</p>
                {this.renderArtistShapeControls()}
                {this.renderSelectShapeButtons()}
              </Grid>
            </Grid>
          </div>
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
      if (this.canEditShape(editingShape)) {
        return this.renderShapeControl(editingShape, editingShapePosition);
      }
    }
    return null;
  }

  renderShapeControl(shape: Shape, shapePosition: ShapePosition) {
    switch (shape.type) {
      case constants.shapes.types.image: {
        return <ImageControls shape={shape} shapePosition={shapePosition} page={this.props.card!.pages[0]} />;
      }
      case constants.shapes.types.text: {
        return <TextControls shape={shape} shapePosition={shapePosition} page={this.props.card!.pages[0]} />;
      }
      default: {
        return null;
      }
    }
  }

  canEditShape(shape: Shape) {
    return shape && !(this.props.mode === DesignerMode.Customer && !shape.allowUserEdit);
  }

  renderSelectShapeButtons() {
    if (this.props.card) {
      return this.props.card!.pages[0].shapes.map((shape, index) => {
        return (
          <div key={index}>
            {this.canEditShape(shape) ? (
              <div>
                <Button
                  className={this.props.classes.button}
                  onClick={() =>
                    this.props.setEditingShape({
                      pageIndex: 0,
                      shapeIndex: index
                    })
                  }
                >
                  Edit {shape.type} {index}
                </Button>
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

export interface CardDesignerConnectProps {
  mode: DesignerMode;
  deleting: boolean;
}

export interface CardDesignerDispatchProps {
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

export interface CardDesignerProps extends CardDesignerConnectProps, CardDesignerDispatchProps {}

function mapStateToProps(state: AppState, ownProps: CardDesignerProps): CardDesignerComponentProps {
  return {
    card: state.designer.activeCard,
    editingShapePosition: state.designer.editingShapePosition,
    currentUser: state.auth.currentUser,
    lastSavedDate: state.artist.activeCardLastSavedDate,
    saving: state.artist.savingActiveCard,
    deleting: ownProps.deleting,
    mode: ownProps.mode,
    saveCardDesign: ownProps.saveCardDesign
  };
}

const mapDispatchToProps: CardDesignerComponentDispatchProps = { setActiveCard, unSetActiveCard, setEditingShape };

export const CardDesigner: React.ComponentType<CardDesignerProps> = combineContainers(CardDesignerComponent, [
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
]);
