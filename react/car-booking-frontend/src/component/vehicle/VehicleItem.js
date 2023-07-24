import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "react-toastify/dist/ReactToastify.css";
import './styles.css'
import dayjs from "dayjs";

const VehicleItem = ({vehicle}) => {

    return (
        <TableRow
            key={vehicle.id}
        >
            <TableCell component="th" scope="row">
                {vehicle.id}
            </TableCell>
            <TableCell align="center">{vehicle.licensePlate}</TableCell>
            <TableCell align="center">{vehicle.vin}</TableCell>
            <TableCell align="center">{vehicle.model}</TableCell>
            <TableCell align="center">{vehicle.color}</TableCell>
            <TableCell align="center">{dayjs(vehicle.validTill).format('DD-MM-YYYY')}</TableCell>
            <TableCell align="center">{vehicle.active ? <i className='bx bx-check check-icon'></i> : <i className='bx bx-x x-icon'></i>}</TableCell>
            <TableCell align="center">{vehicle.bookings.length.toString()}</TableCell>
        </TableRow>
    )
}

export default VehicleItem