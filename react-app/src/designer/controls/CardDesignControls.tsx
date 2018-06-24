import * as React from 'react';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Tooltip, IconButton, MenuItem, Menu } from '@material-ui/core';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';
import { DesignerMode } from '@app/designer/designer-mode';
import { RouterProps, RouteComponentProps, withRouter } from 'react-router';
import { routes } from '@app/shared/router/routes';
import * as Icons from '@material-ui/icons';
import { deleteCardDesign } from '@app/artist/state/artist.actions';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import { AppState } from '@app/state/app.state';
import { ConnectedReduxProps } from '@app/state/connected-redux-props';
import { addTextShape } from '@app/designer/state/designer.actions';

type ClassNames = 'button';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  }
});

export interface CardDesignerControlsProps {
  currentUser?: UserInfo;
  card?: Card;
  saving: boolean;
  activePageIndex: number;
  saveCardDesign: (user: UserInfo, card: Card) => any;
  mode: DesignerMode;
}

interface State {
  addShapeDrawerOpen: boolean;
  addShapeDrawerAnchorElement?: HTMLElement;
}

interface Props
  extends ConnectedReduxProps,
    CardDesignerControlsProps,
    RouterProps,
    RouteComponentProps<{ id: string }>,
    WithStyles<ClassNames> {}

class CardDesignControlsComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addShapeDrawerOpen: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Tooltip title="Add shape" placement="top">
          <IconButton className={classes.button} aria-label="Add" onClick={this.toggleDrawer} color="primary">
            <Icons.AddCircle />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save" placement="top">
          <IconButton
            className={classes.button}
            disabled={this.props.saving}
            aria-label="Save"
            color="secondary"
            onClick={() =>
              this.props.saveCardDesign(this.props.currentUser!, this.props.card!).then((c: any) => {
                if (this.props.mode === DesignerMode.Artist) {
                  this.props.history.push(routes.myDesigns.build());
                } else if (this.props.mode === DesignerMode.Customer) {
                  // redirect to basket
                }
              })
            }
          >
            <Icons.Save />
          </IconButton>
        </Tooltip>

        {this.props.mode === DesignerMode.Artist && (
          <Tooltip title="Delete design" placement="top">
            <IconButton
              className={classes.button}
              aria-label="Delete"
              disabled={this.props.saving}
              onClick={() => {
                if (this.props.card && this.props.card.id && window.confirm('Are you sure?')) {
                  const action = deleteCardDesign({
                    id: this.props.card.id
                  });
                  ((action as any) as Promise<any>).then(() => {
                    this.props.history.push(routes.myDesigns.build());
                  });
                  this.props.dispatch(action);
                }
              }}
            >
              <Icons.Delete />
            </IconButton>
          </Tooltip>
        )}
        {this.renderAddShapeDialog()}
      </div>
    );
  }

  toggleDrawer(e?: React.MouseEvent<HTMLElement>) {
    this.setState({
      addShapeDrawerOpen: !this.state.addShapeDrawerOpen,
      addShapeDrawerAnchorElement: e ? e.currentTarget : undefined
    });
  }

  renderAddShapeDialog() {
    if (this.state.addShapeDrawerOpen) {
      return (
        <Menu
          anchorEl={this.state.addShapeDrawerAnchorElement}
          open={this.state.addShapeDrawerOpen}
          onClose={() => this.toggleDrawer()}
        >
          <MenuItem
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              this.props.dispatch(
                addTextShape({
                  pageIndex: this.props.activePageIndex,
                  page: this.props.card!.pages[this.props.activePageIndex]
                })
              );
              this.toggleDrawer();
            }}
          >
            Add textbox
          </MenuItem>
        </Menu>
      );
    } else {
      return null;
    }
  }
}

interface CardDesignControlsExtendedProps {
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

function mapStateToProps(state: AppState, ownProps: CardDesignControlsExtendedProps): CardDesignerControlsProps {
  return {
    card: state.designer.activeCard,
    saving: state.artist.savingActiveCard || state.artist.deletingActiveCardDesign,
    currentUser: state.auth.currentUser,
    activePageIndex: state.designer.activePageIndex,
    saveCardDesign: ownProps.saveCardDesign,
    mode: state.designer.activeCardDesignMode
  };
}

export const CardDesignControls: React.ComponentType<CardDesignControlsExtendedProps> = combineContainers(
  CardDesignControlsComponent,
  [connect(mapStateToProps), withStyles(styles), withRouter]
);
