import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { Tooltip, IconButton, MenuItem, Menu } from 'material-ui';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';
import { AddTextShapeArgs } from '@app/designer/state/designer.action-types';
import { DeleteCardDesignArgs } from '@app/artist/state/artist.action-types';
import { DesignerMode } from '@app/designer/designer-mode';
import { RouterProps, RouteComponentProps, withRouter } from 'react-router';
import { routes } from '@app/shared/router/routes';
import * as Icons from '@material-ui/icons';
import { addTextShape } from '@app/designer/state/designer.actions';
import { deleteCardDesign } from '@app/artist/state/artist.actions';
import { combineContainers } from 'combine-containers';
import { connect } from 'react-redux';
import { AppState } from '@app/state/app.state';

type StyleClassNames = 'button';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  }
});

export interface DispatchProps {
  addTextShape: (args: AddTextShapeArgs) => any;
  deleteCardDesign: (args: DeleteCardDesignArgs) => any;
}

export interface ConnectProps {
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
  extends DispatchProps,
    ConnectProps,
    RouterProps,
    RouteComponentProps<{ id: string }>,
    WithStyles<StyleClassNames> {}

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
                  this.props
                    .deleteCardDesign({
                      id: this.props.card.id
                    })
                    .then(() => {
                      this.props.history.push(routes.myDesigns.build());
                    });
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
              this.props.addTextShape({
                pageIndex: this.props.activePageIndex,
                page: this.props.card!.pages[this.props.activePageIndex]
              });
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

interface CardDesignControlsProps {
  saveCardDesign: (user: UserInfo, card: Card) => any;
}

function mapStateToProps(state: AppState, ownProps: Props): ConnectProps {
  return {
    card: state.designer.activeCard,
    saving: state.artist.savingActiveCard || state.artist.deletingActiveCardDesign,
    currentUser: state.auth.currentUser,
    activePageIndex: state.designer.activePageIndex,
    saveCardDesign: ownProps.saveCardDesign,
    mode: state.designer.activeCardDesignMode
  };
}

const mapDispatchToProps: DispatchProps = { addTextShape, deleteCardDesign };

export const CardDesignControls: React.ComponentType<CardDesignControlsProps> = combineContainers(
  CardDesignControlsComponent,
  [connect(mapStateToProps, mapDispatchToProps), withStyles(styles), withRouter]
);
