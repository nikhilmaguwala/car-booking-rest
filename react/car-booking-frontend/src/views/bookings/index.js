import React, {useEffect, useState} from 'react'
import './index.css'
import {deleteBooking, getAllBookings} from "../../utils/dataServices";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BookingItem from "../../component/booking/BookingItem";

import Fab from '@mui/material/Fab';
import {toast} from "react-toastify";
import AddBooking from "../../component/booking/AddBooking";
import EditBooking from "../../component/booking/EditBooking";
import {ModalStyles} from "../../helper";
import DeleteDialog from "../../component/booking/DeleteDialog";

const Bookings = () => {

    const [bookings, setBookings] = useState([])
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentBookingId, setCurrentBookingId] = useState('')
    const [currentDeleteId, setCurrentDeleteId] = useState('')

    const openDialog = () => setOpenAddDialog(true)
    const handleClose = () => setOpenAddDialog(false);

    const openEditModal = () => setOpenEditDialog(true);

    const openDeleteDialog = () => setIsDeleteDialogOpen(true);

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setCurrentDeleteId('');
    }

    const onDeleteDialogConfirm = () => {
        deleteBooking(currentDeleteId).then(() => {
            fetchBookings();
            closeDeleteDialog();
            toast.warn("Booking is Deleted!", {
                position: toast.POSITION.TOP_CENTER
            });
        }).catch((err) => {
            toast.error(err, {
                position: toast.POSITION.TOP_LEFT
            });
        })
    }

    const handleEditClose = () => setOpenEditDialog(false);

    const onEditClick = (id) => {
        setCurrentBookingId(id);
        openEditModal();
    }

    useEffect(() => {
        fetchBookings();
    },[])

    const fetchBookings = () => {
        getAllBookings().then(bookings => {
            setBookings(bookings)
        }).catch(err => {
            toast.error(err, {
                position: toast.POSITION.TOP_LEFT
            });
        })
    }

    const deleteItem = (id) => {
        setCurrentDeleteId(id);
        openDeleteDialog();
    }

    const onSuccessFulAdd = () => {
        fetchBookings();
        toast.success("Added New Booking!", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const onSuccessFulUpdate = () => {
        setCurrentBookingId('');
        fetchBookings();
        toast.success("Updated Booking!", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    return (
        <div>
            <Fab aria-label="add"
                 onClick={openDialog}
                 sx={ModalStyles}>
                <i className='bx bx-plus add-button'></i>
            </Fab>
            <DeleteDialog open={isDeleteDialogOpen} handleClose={closeDeleteDialog} onConfirm={onDeleteDialogConfirm} />
            <AddBooking open={openAddDialog} onSuccessFulAdd={onSuccessFulAdd} onClose={handleClose} />
            <EditBooking open={openEditDialog} bookingId={currentBookingId} onClose={handleEditClose} onSuccessFulUpdate={onSuccessFulUpdate} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">Vehicle</TableCell>
                            <TableCell align="center">User</TableCell>
                            <TableCell align="center">Start Date</TableCell>
                            <TableCell align="center">End Date</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => {
                            return <BookingItem key={booking.id} booking={booking} deleteItem={deleteItem} onEditClick={onEditClick}/>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Bookings