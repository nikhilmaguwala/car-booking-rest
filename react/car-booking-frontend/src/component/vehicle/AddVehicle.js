import React, {useEffect, useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from "dayjs";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Checkbox, FormControlLabel} from "@mui/material";
import {addButtonStyles} from "../../helper";
import {toast} from "react-toastify";
import {addVehicle} from "../../utils/dataServices";

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

function AddVehicle(props) {
    const { onClose, open, onSuccessFulAdd } = props;

    const [licensePlate, setLicensePlate] = useState('');
    const [vin, setVin] = useState('');
    const [color, setColor] = useState('');
    const [active, setActive] = useState(true);
    const [model, setModel] = useState('');
    const [validTill, setValidTill] = useState(dayjs());
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setValidTill(dayjs())
        onClose();
    }

    const handleSubmit = () => {
        if(licensePlate.trim() === '') {
            toast.error("Licence Plate Invalid !", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if(vin.trim() === '') {
            toast.error("Vin is Invalid !", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if(color.trim() === '') {
            toast.error("Color is Invalid!", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if(model.trim() === '') {
            toast.error("Model is incorrect !", {
                position: toast.POSITION.TOP_LEFT
            });
        } else if(validTill <= dayjs()) {
            toast.error("Valid till is not Correct !", {
                position: toast.POSITION.TOP_LEFT
            });
        } else {
            setIsLoading(true);
            const newVehicle = {
                licensePlate: licensePlate,
                vin: vin,
                color: color,
                model: model,
                active: active,
                validTill: validTill
            }
            addVehicle(newVehicle).then(res => {
                setIsLoading(false);
                onSuccessFulAdd();
                handleClose();
            }).catch(err => {
                setIsLoading(false);
                toast.error(err, {
                    position: toast.POSITION.TOP_LEFT
                });
            })
        }
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
                <DialogTitle sx={{ m: 1, p: 0}}>Add New Vehicle</DialogTitle>
                <Box sx={{ alignItems: 'center', m: 1, mt: 2  }}>
                    <TextField value={licensePlate} onChange={e => setLicensePlate(e.target.value)} id="outlined-basic" label="License Plate" variant="outlined" />
                    <TextField value={vin} onChange={e => setVin(e.target.value)} sx={{ mx: 1 }} id="outlined-basic" label="Vin" variant="outlined" />
                </Box>
                <Box sx={{ alignItems: 'center', m: 1, mt: 2 }}>
                    <TextField value={model} onChange={e => setModel(e.target.value)} id="outlined-basic" label="Model" variant="outlined" />
                    <TextField value={color} onChange={e => setColor(e.target.value)} sx={{ mx: 1 }} id="outlined-basic" label="Color" variant="outlined" />
                </Box>
                <Box sx={{ m: 1, mt: 2 }}>
                    <FormControl sx={{ maxWidth: 195 }}>
                        <DatePicker
                            label="Valid Till"
                            value={validTill}
                            minDate={dayjs()}
                            onChange={(newValue) => setValidTill(newValue)}
                        />
                    </FormControl>
                    <FormControl sx={{ mx: 4, mt: 1 }}>
                        <FormControlLabel control={<Checkbox sx={{ color: '#CC0033', '&.Mui-checked':{ color: '#AA142D' }}} checked={active} onChange={() => setActive(!active)} />} label="Active" />
                    </FormControl>
                </Box>
                <Box sx={{ m: 1, mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={addButtonStyles}
                    >
                        Add Vehicle
                    </Button>
                    <Button sx={{ mx: 1 }} variant="outlined" color="error" onClick={handleClose}>
                        cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddVehicle