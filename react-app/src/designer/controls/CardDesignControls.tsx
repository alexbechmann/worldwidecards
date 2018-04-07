import * as React from 'react';
import { withStyles, Theme, WithStyles } from 'material-ui/styles';
import { Button } from 'material-ui';
import { Card } from '@wwc/core';
import { UserInfo } from 'firebase';
import { AddTextShapeArgs } from '@app/designer/state/designer.action-types';
import { DeleteCardDesignArgs } from '@app/artist/state/artist.action-types';
import { DesignerMode } from '@app/designer/designer-mode';
import { RouterProps } from 'react-router';
import { routes } from '@app/shared/router/routes';

type ClassNames = 'button' | 'input';

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
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

interface Props extends CardDesignControlsDispatchProps, CardDesignControlsProps, RouterProps {}

interface StyledProps extends Props, WithStyles<ClassNames> {}

export const CardDesignControls: React.ComponentType<Props> = withStyles(styles)(
  class CardDesignControlsComponent extends React.Component<StyledProps> {
    render() {
      const { classes } = this.props;
      return (
        <div>
          <div>
            <Button
              className={classes.button}
              aria-label="Add text box"
              onClick={() =>
                this.props.addTextShape({
                  pageIndex: this.props.activePageIndex
                })
              }
            >
              Add text box
            </Button>
            <Button
              disabled={this.props.saving}
              className={classes.button}
              aria-label="Save design"
              onClick={() => this.props.saveCardDesign(this.props.currentUser!, this.props.card!)}
            >
              Save
            </Button>
            {this.props.mode === DesignerMode.Artist && (
              <Button
                disabled={this.props.saving}
                className={classes.button}
                aria-label="Delete"
                onClick={() => {
                  console.log('hi', this.props.card);
                  if (this.props.card && this.props.card.id) {
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
                Delete
              </Button>
            )}
          </div>
        </div>
      );
    }
  }
);
