import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from 'material-ui';
import { DialogProps, withMobileDialog } from 'material-ui/Dialog';

interface Props extends DialogProps {
  open: boolean;
  handleClose: () => void;
  dialogTitle: string;
  dialogDescription?: string;
}

class TextControlsComponent extends React.Component<Props> {
  render() {
    const { fullScreen } = this.props;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={this.props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{this.props.dialogTitle}</DialogTitle>
        <DialogContent>
          {this.props.dialogDescription && <DialogContentText>{this.props.dialogDescription}</DialogContentText>}
          {this.props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary" autoFocus={true}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export const DialogPopup: React.ComponentType<Props> = withMobileDialog<Props>()(TextControlsComponent);
