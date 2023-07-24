import React, {useEffect, useState} from 'react'
import './index.css'
import SearchBar from "../../utils/SearchBar";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {deleteVehicle, getAllVehicles} from "../../utils/dataServices";
import {toast} from "react-toastify";
import VehicleItem from "../../component/vehicle/VehicleItem";
import Fab from "@mui/material/Fab";
import {ModalStyles} from "../../helper";
import AddVehicle from "../../component/vehicle/AddVehicle";

const Vehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [allVehicles, setAllVehicles] = useState([]);
    const [search, setSearch] = useState('')
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const openAddModal = () => setIsAddModalOpen(true)

    const handleClose = () => setIsAddModalOpen(false)
    const onSuccessFulAdd = () => {
        fetchVehicles();
        toast.success("Added New Vehicle!", {
            position: toast.POSITION.TOP_CENTER
        });
    }

    useEffect(() => {
        fetchVehicles();
    },[])

    const fetchVehicles = () => {
        getAllVehicles().then(vehicleData => {
            setVehicles(vehicleData)
            setAllVehicles(vehicleData)
        }).catch(err => {
            toast.error('Unable to Fetch Vehicles', {
                position: toast.POSITION.TOP_LEFT
            });
        })
    }

    const onSearchChange = (e) => {
        setSearch(e.target.value)
        const newVehicles = allVehicles.filter((vehicle) => {
            return (
                vehicle.licensePlate.toLowerCase().includes(e.target.value.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(e.target.value.toLowerCase()) ||
                vehicle.vin.toLowerCase().includes(e.target.value.toLowerCase()) ||
                vehicle.color.toLowerCase().includes(e.target.value.toLowerCase()) ||
                vehicle.validTill.toLowerCase().includes(e.target.value.toLowerCase())
            )
        })
        setVehicles(newVehicles)
    }

    return (
        <div>
            <Fab aria-label="add"
                 onClick={openAddModal}
                 sx={ModalStyles}>
                <i className='bx bx-plus add-button'></i>
            </Fab>
            <AddVehicle open={isAddModalOpen} onSuccessFulAdd={onSuccessFulAdd} onClose={handleClose} />
            <SearchBar value={search} onChange={onSearchChange} title={'Search'}/>
            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="center">License Plate</TableCell>
                            <TableCell align="center">Vin</TableCell>
                            <TableCell align="center">Model</TableCell>
                            <TableCell align="center">Color</TableCell>
                            <TableCell align="center">Valid Till</TableCell>
                            <TableCell align="center">Active</TableCell>
                            <TableCell align="center">Bookings</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => {
                            return <VehicleItem key={vehicle.id} vehicle={vehicle}/>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Vehicles