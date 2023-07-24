import React, {useEffect, useState} from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {getUser, getVehicle} from "../../utils/dataServices";
import "react-toastify/dist/ReactToastify.css";
import './styles.css'
import dayjs from "dayjs";

const BookingItem = ({booking, deleteItem, onEditClick}) => {

    const [user, setUser] = useState({});
    const [vehicle, setVehicle] = useState({});

    useEffect(() => {
        fetchDetails()
    },[booking])

    const fetchDetails = () => {
        getUser(booking.UserId).then(userData => {
            setUser(userData)
        })
        getVehicle(booking.VehicleId).then(vehicleData => {
            setVehicle(vehicleData)
        })
    }

    return (
        <TableRow
            key={booking.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {booking.id}
            </TableCell>
            <TableCell align="center">{vehicle && (vehicle.licensePlate + ' ' + vehicle.model + '(' + vehicle.color + ')')}</TableCell>
            <TableCell align="center">{user && (user.firstName + ' ' + user.lastName)}</TableCell>
            {/*<TableCell align="center">{booking.active ? <i className='bx bx-check check-icon'></i> : <i className='bx bx-x x-icon'></i>}</TableCell>*/}
            <TableCell align="center">{booking && dayjs(booking.startDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell align="center">{booking && dayjs(booking.endDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell align="center"><i onClick={() => onEditClick(booking.id)} className='bx bx-edit edit-icon'></i></TableCell>
            <TableCell align="center"><i onClick={() => deleteItem(booking.id)} className='bx bx-trash delete-icon'></i></TableCell>
        </TableRow>
    )
}

export default BookingItem