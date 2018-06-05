import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  withMobileDialog
} from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';

interface Props extends DialogProps {
  open: boolean;
  handleClose: () => void;
  dialogTitle: string;
  dialogDescription?: string;
  extraDialogButtons?: React.ComponentType<ButtonProps>[];
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
          {this.props.dialogDescription && <br />}
          {this.props.children}
        </DialogContent>
        <DialogActions>
          {this.props.extraDialogButtons &&
            this.props.extraDialogButtons.map((ExtraButton, index) => <ExtraButton key={index} />)}
          <Button onClick={this.props.handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export const DialogPopup: React.ComponentType<Props> = withMobileDialog<Props>()(TextControlsComponent);
