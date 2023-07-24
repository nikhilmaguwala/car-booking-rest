import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteDialog = ({open, handleClose, onConfirm}) => {
    return <Dialog
        open={open}
        onClose={handleClose}
        sx={{ p:2 }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            Sure, You want to delete this booking?
        </DialogTitle>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={onConfirm}>
                Confirm
            </Button>
        </DialogActions>
    </Dialog>
}

export default DeleteDialog