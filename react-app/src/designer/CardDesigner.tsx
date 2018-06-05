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
  Button,
  Paper,
  Hidden
} from '@material-ui/core';
import { Card, constants, Shape } from '@wwc/core';
import { CardPage } from '@app/cards/pages/CardPage';
import { ShapePosition } from '@app/cards/shapes/shape-position';
import { RouteComponentProps } from 'react-router';
import { UserInfo } from 'firebase';
import { TimeAgo } from '@app/shared/ui';
import { DesignerMode } from '@app/designer/designer-mode';
import { CardDesignControls } from '@app/designer/controls/CardDesignControls';
import { SetActiveCardArgs } from '@app/designer/state/designer.action-types';
import { AppState } from '@app/state/app.state';
import { setActiveCard, unSetActiveCard, setEditingShape, setActivePage } from '@app/designer/state/designer.actions';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import { ImageControlsDialog } from '@app/designer/controls/images/ImageControlsDialog';
import { TextControlsDialog } from '@app/designer/controls/text/TextControlsDialog';
import { TextControls } from '@app/designer/controls/text/TextControls';
import { ImageControls } from '@app/designer/controls/images/ImageControls';

type StyleClassNames =
  | 'root'
  | 'button'
  | 'cardControlsCard'
  | 'previewArea'
  | 'miniPreview'
  | 'miniPreviewDesktop'
  | 'miniPreviewMobile';

const styles: StyleRulesCallback<StyleClassNames> = (theme: Theme) => ({
  root: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  cardControlsCard: {
    padding: theme.spacing.unit
  },
  previewArea: {
    padding: '5% 20% 0px 20%',
    background: 'silver'
  },
  miniPreview: {
    position: 'fixed',
    background: 'white',
    zIndex: 10000
  },
  miniPreviewDesktop: {
    top: '147px',
    right: theme.spacing.unit,
    width: '170px'
  },
  miniPreviewMobile: {
    top: theme.spacing.unit,
    right: theme.spacing.unit,
    width: '140px'
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
  activePageIndex: number;
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

interface CardDesignerComponentDispatchProps {
  setActiveCard: (args: SetActiveCardArgs) => any;
  setEditingShape: (position: ShapePosition) => any;
  unSetActiveCard: () => any;
  setActivePage: (pageIndex: number) => any;
}

interface RouteParameters {
  id: string;
}

interface Props
  extends CardDesignerComponentProps,
    CardDesignerComponentDispatchProps,
    RouteComponentProps<RouteParameters>,
    WithStyles<StyleClassNames> {}

interface State {
  showMiniPreviewMobile: boolean;
}

class CardDesignerComponent extends React.Component<Props, State> {
  state: State = {
    showMiniPreviewMobile: false
  };

  constructor(props: Props) {
    super(props);
    this.updateMiniPreviewState = this.updateMiniPreviewState.bind(this);
  }

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
    window.addEventListener('scroll', this.updateMiniPreviewState);
    window.addEventListener('resize', this.updateMiniPreviewState);
  }

  updateMiniPreviewState() {
    this.setState({
      showMiniPreviewMobile: window.scrollY > 200
    });
  }

  renderDesigner() {
    const { classes } = this.props;
    if (this.props.card) {
      return (
        <div>
          {this.renderStepper()}
          {this.renderMiniPreview()}
          <div className={this.props.classes.root}>
            <CardDesignControls saveCardDesign={this.props.saveCardDesign} />
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6} lg={8}>
                <div className={classes.previewArea}>
                  <CardPage
                    pageIndex={this.props.activePageIndex}
                    page={this.props.card.pages[this.props.activePageIndex]}
                    editable={true}
                  />
                  <br />
                </div>
                {this.renderSaveStatus()}
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                {/* {this.renderArtistShapeControls()} */}
                {/* {this.renderSelectShapeButtons()} */}
                {this.renderInlineControls()}
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }
    return null;
  }

  renderMiniPreview() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.showMiniPreviewMobile && (
          <Hidden lgUp>
            <div className={`${classes.miniPreview} ${classes.miniPreviewMobile}`}>
              <CardPage
                pageIndex={this.props.activePageIndex}
                page={this.props.card!.pages[this.props.activePageIndex]}
                editable={false}
              />
            </div>
          </Hidden>
        )}
        <Hidden mdDown>
          <div className={`${classes.miniPreview} ${classes.miniPreviewDesktop}`}>
            <CardPage
              pageIndex={this.props.activePageIndex}
              page={this.props.card!.pages[this.props.activePageIndex]}
              editable={true}
            />
          </div>
        </Hidden>
      </div>
    );
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

  // renderArtistShapeControls() {
  //   const { editingShapePosition } = this.props;
  //   if (editingShapePosition && this.props.card) {
  //     const editingShape: Shape = this.props.card.pages[editingShapePosition.pageIndex].shapes[
  //       editingShapePosition.shapeIndex
  //     ];
  //     if (this.canEditShape(editingShape)) {
  //       return this.renderShapeControlDialog(editingShape, editingShapePosition);
  //     }
  //   }
  //   return null;
  // }

  renderShapeControl(shape: Shape, shapePosition: ShapePosition) {
    switch (shape.type) {
      case constants.shapes.types.image: {
        return (
          <ImageControls
            shape={shape}
            shapePosition={shapePosition}
            page={this.props.card!.pages[this.props.activePageIndex]}
          />
        );
      }
      case constants.shapes.types.text: {
        return (
          <TextControls
            shape={shape}
            shapePosition={shapePosition}
            page={this.props.card!.pages[this.props.activePageIndex]}
          />
        );
      }
      default: {
        return null;
      }
    }
  }

  renderShapeControlDialog(shape: Shape, shapePosition: ShapePosition) {
    switch (shape.type) {
      case constants.shapes.types.image: {
        return (
          <Hidden mdUp>
            <ImageControlsDialog
              shape={shape}
              shapePosition={shapePosition}
              page={this.props.card!.pages[this.props.activePageIndex]}
            />
          </Hidden>
        );
      }
      case constants.shapes.types.text: {
        return (
          <Hidden mdUp>
            <TextControlsDialog
              shape={shape}
              shapePosition={shapePosition}
              page={this.props.card!.pages[this.props.activePageIndex]}
            />
          </Hidden>
        );
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
      return this.props.card!.pages[this.props.activePageIndex].shapes.map((shape, index) => {
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

  renderInlineControls() {
    const { classes } = this.props;
    if (this.props.card) {
      return (
        <Grid container spacing={24}>
          {this.props.card!.pages[this.props.activePageIndex].shapes.map((shape, index) => {
            return (
              <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                {this.canEditShape(shape) ? (
                  <Paper className={classes.cardControlsCard}>
                    {this.renderShapeControl(shape, {
                      pageIndex: this.props.activePageIndex,
                      shapeIndex: index
                    })}
                  </Paper>
                ) : (
                  <React.Fragment />
                )}
              </Grid>
            );
          })}
        </Grid>
      );
    }
    return null;
  }

  renderStepper() {
    const steps = ['Front page', 'Inner right', 'Inner left', 'Back'];
    return (
      <Stepper nonLinear={true} activeStep={this.props.activePageIndex}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepButton onClick={() => this.props.setActivePage(index)} completed={false}>
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
    window.removeEventListener('scroll', this.updateMiniPreviewState);
    window.removeEventListener('resize', this.updateMiniPreviewState);
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
    saveCardDesign: ownProps.saveCardDesign,
    activePageIndex: state.designer.activePageIndex
  };
}

const mapDispatchToProps: CardDesignerComponentDispatchProps = {
  setActiveCard,
  unSetActiveCard,
  setEditingShape,
  setActivePage
};

export const CardDesigner: React.ComponentType<CardDesignerProps> = combineContainers(CardDesignerComponent, [
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
]);
