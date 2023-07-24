import React, {useEffect, useState} from 'react'
import './index.css'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import UserItem from "../../component/user/UserItem";

import {getAllUsers} from "../../utils/dataServices";
import {toast} from "react-toastify";
import SearchBar from "../../utils/SearchBar";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchUsers();
    },[])

    const fetchUsers = () => {
        getAllUsers().then(usersData => {
            setUsers(usersData)
            setAllUsers(usersData)
        }).catch(err => {
            toast.error('Unable to Fetch Users', {
                position: toast.POSITION.TOP_LEFT
            });
        })
    }

    const onSearchChange = (e) => {
        setSearch(e.target.value)
        const newUsers = allUsers.filter((user) => user.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
        setUsers(newUsers)
    }

    return (
        <div>
            <SearchBar value={search} onChange={onSearchChange} title={'Search by Last Name'}/>
            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Birthdate</TableCell>
                            <TableCell align="center">Total Bookings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => {
                            return <UserItem key={user.id} user={user}/>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users