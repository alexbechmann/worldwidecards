import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';
import { AddTextShapeArgs } from '@app/designer/state/designer.action-types';
import { DeleteCardDesignArgs } from '@app/artist/state/artist.action-types';
import { DesignerMode } from '@app/designer/designer-mode';
import { RouterProps, RouteComponentProps } from 'react-router';
import { routes } from '@app/shared/router/routes';
import * as Icons from 'material-ui-icons';

type ClassNames = 'button';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  }
});

export interface CardDesignControlsDispatchProps {
  addTextShape: (args: AddTextShapeArgs) => any;
  deleteCardDesign: (args: DeleteCardDesignArgs) => any;
}

export interface CardDesignControlsProps {
  currentUser?: UserInfo;
  card?: Card;
  saving: boolean;
  activePageIndex: number;
  saveCardDesign: (user: UserInfo, card: Card) => any;
  mode: DesignerMode;
}

interface State {
  addShapeDrawerOpen: boolean;
}

interface Props
  extends CardDesignControlsDispatchProps,
    CardDesignControlsProps,
    RouterProps,
    RouteComponentProps<{ id: string }> {}

interface StyledProps extends Props, WithStyles<ClassNames> {}

export const CardDesignControls: React.ComponentType<Props> = withStyles(styles)(
  class CardDesignControlsComponent extends React.Component<StyledProps, State> {
    state = {
      addShapeDrawerOpen: false
    };
    render() {
      const { classes } = this.props;
      return (
        <div>
          <div>
            <IconButton
              className={classes.button}
              aria-label="Save"
              color="primary"
              onClick={() =>
                this.props.saveCardDesign(this.props.currentUser!, this.props.card!).then((c: any) => {
                  if (this.props.mode === DesignerMode.Artist && !this.props.match.params.id) {
                    this.props.history.push(routes.myDesigns.build());
                  }
                })
              }
            >
              <Icons.Save />
            </IconButton>
            <IconButton className={classes.button} aria-label="Add" onClick={() => this.toggleDrawer()}>
              <Icons.AddCircle />
            </IconButton>
            {this.props.mode === DesignerMode.Artist && (
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
            )}
            {this.renderAddShapeDialog()}
          </div>
        </div>
      );
    }

    toggleDrawer() {
      this.setState({
        addShapeDrawerOpen: !this.state.addShapeDrawerOpen
      });
    }

    renderAddShapeDialog() {
      if (this.state.addShapeDrawerOpen) {
        return (
          <Drawer anchor="bottom" open={this.state.addShapeDrawerOpen} onClose={() => this.toggleDrawer()}>
            <List>
              <ListItem
                button={true}
                onClick={() => {
                  this.props.addTextShape({
                    pageIndex: this.props.activePageIndex
                  });
                  this.toggleDrawer();
                }}
              >
                <ListItemIcon>
                  <Icons.Textsms />
                </ListItemIcon>
                <ListItemText primary="Add textbox" />
              </ListItem>
            </List>
          </Drawer>
        );
      } else {
        return null;
      }
    }
  }
);
