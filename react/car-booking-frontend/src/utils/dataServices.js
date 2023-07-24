import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_API_URL

const getAllBookings = () => {
    return axios.get(BACKEND_URL + '/booking')
        .then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data.error
    })
}
const getBooking = (id) => {
    return axios.get(BACKEND_URL + '/booking/' + id)
        .then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data.error
        })
}
const addBooking = (newBooking) => {
    return axios.post(BACKEND_URL + '/booking', newBooking)
        .then(res => {
            return res.data
        }).catch(err => {
            throw err.response.data.error
        })
}
const updateBooking = (updatedBooking, id) => {
    return axios.put(BACKEND_URL + '/booking/' + id, updatedBooking)
        .then(res => {
            return res.data
        }).catch(err => {
            throw err.response.data.error
        })
}
const deleteBooking = (id) => {
    return axios.delete(BACKEND_URL + '/booking/' + id)
        .then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data.error
        })
}

const getAllVehicles = () => {
    return axios.get(BACKEND_URL + '/vehicle')
        .then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data.error
        })
}
const getVehicle = (id) => {
    return axios.get(BACKEND_URL + '/vehicle/' + id)
        .then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data.error
        })
}
const addVehicle = (newVehicle) => {
    return axios.post(BACKEND_URL + '/vehicle', newVehicle)
        .then(res => {
            return res.data
        }).catch(err => {
            throw err.response.data.error
        })
}


const getAllUsers = () => {
    return axios.get(BACKEND_URL + '/user')
        .then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data.error
        })
}
const getUser = (id) => {
    return axios.get(BACKEND_URL + '/user/' + id)
        .then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data.error
        })
}

export {
    getAllBookings,
    getBooking,
    addBooking,
    updateBooking,
    deleteBooking,

    getAllUsers,
    getUser,

    getAllVehicles,
    getVehicle,
    addVehicle
}