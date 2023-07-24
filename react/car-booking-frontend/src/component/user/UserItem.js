import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import "react-toastify/dist/ReactToastify.css";
import './styles.css'
import dayjs from "dayjs";
import {Link} from "react-router-dom";

const UserItem = ({user}) => {

    const onEmailClick = (e) => {
        window.location = 'mailto:' + user.email
    }

    return (
        <TableRow
            key={user.id}
        >
            <TableCell component="th" scope="row">
                {user.id}
            </TableCell>
            <TableCell align="center">{user.firstName}</TableCell>
            <TableCell align="center">{user.lastName}</TableCell>
            <TableCell align="center"><Link to='#' onClick={onEmailClick}>{user.email}</Link></TableCell>
            <TableCell align="center">{dayjs(user.birthday).format('DD-MM-YYYY')}</TableCell>
            <TableCell align="center">{user.bookings.length.toString()}</TableCell>
        </TableRow>
    )
}

export default UserItem