import React, {useEffect, useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {addBooking, getAllUsers, getAllVehicles, getBooking, updateBooking} from "../../utils/dataServices";
import {toast} from "react-toastify";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from "dayjs";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {addButtonStyles} from "../../helper";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    color: '#000',
    boxShadow: 24,
    p: 4,
};

function EditBooking(props) {
    const { onClose, open, onSuccessFulUpdate, bookingId } = props;

    const [booking, setBooking] = useState({})
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [users, setUsers] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const handleUserChange = (event) => setSelectedUser(event.target.value);
    const handleVehicleChange = (event) => setSelectedVehicle(event.target.value);

    useEffect(() => {
        if(bookingId) {
            fetchBooking();
        }
        loadDetails()
    },[bookingId])

    const handleClose = () => {
        setSelectedUser('');
        setSelectedVehicle('');
        setStartDate(dayjs())
        setEndDate(dayjs())
        setUsers([]);
        setVehicles([]);
        onClose();
    }

    const fetchBooking = () => {
        getBooking(bookingId).then(bookingData => {
            setSelectedUser(bookingData.UserId)
            setSelectedVehicle(bookingData.VehicleId)
            setStartDate(dayjs(bookingData.startDate))
            setEndDate(dayjs(bookingData.endDate))
        }).catch(err => {
            toast.error("Unable to fetch Booking !", {
                position: toast.POSITION.TOP_LEFT
            });
        })
    }

    const handleSubmit = () => {
        if(selectedUser === '') {
            toast.error("No User Selected !", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if(selectedVehicle === '') {
            toast.error("No Vehicle Selected !", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if(startDate >= endDate) {
            toast.error("Start Date Invalid!", {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            setIsLoading(true);
            const updatedBooking = {
                vehicleId: selectedVehicle,
                userId: selectedUser,
                startDate: startDate,
                endDate: endDate
            }
            updateBooking(updatedBooking, bookingId).then(res => {
                setIsLoading(false);
                onSuccessFulUpdate();
                handleClose();
            }).catch(err => {
                toast.error('Unable to Update Booking', {
                    position: toast.POSITION.TOP_LEFT
                });
            })
        }
    }

    const loadDetails = () => {
        getAllUsers().then(usersData => {
            setUsers(usersData);
        }).catch(err => {
            toast.error("Error Fetching Users !", {
                position: toast.POSITION.TOP_LEFT
            });
        })
        getAllVehicles().then(vehiclesData => {
            setVehicles(vehiclesData);
        }).catch(err => {
            toast.error("Error Fetching Vehicles !", {
                position: toast.POSITION.TOP_LEFT
            });
        })
    }

    return (
        <Modal
            open={open}
            // onClose={handleClose}
            // disableBackdropClick
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DialogTitle sx={{ m: 1, p: 0}}>Edit Booking</DialogTitle>
                <Box sx={{ alignItems: 'center'}}>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedUser}
                            label="User"
                            onChange={handleUserChange}
                        >
                            {users.map((user, key) => {
                                return <MenuItem key={key} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedVehicle}
                            label="Vehicle"
                            onChange={handleVehicleChange}
                        >
                            {vehicles.map((vehicle, key) => {
                                return <MenuItem key={key} value={vehicle.id}>{vehicle.licensePlate} ({vehicle.model})</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <FormControl sx={{ m: 1, maxWidth: 200 }}>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, maxWidth: 200 }}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ m: 1, mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={addButtonStyles}
                    >
                        Update Booking
                    </Button>
                    <Button sx={{ mx: 1 }} variant="outlined" color="error" onClick={handleClose}>
                        cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default EditBooking