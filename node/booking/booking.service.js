const db = require("../models");

const populateBookings = async (userId, vehicleId) => {
    try {
        await db.Booking.destroy({ truncate: true });
        const newBookings = await db.Booking.bulkCreate([
            { active: false, startDate: '2023-08-01', endDate : '2023-08-28', userId: userId, vehicleId: vehicleId },
        ])
        console.log(' Added to Bookings Into DataBase ...');
    } catch (e) {
        console.log(' Error when Adding Vehicles Into Database ... ');
    }
}

const getActiveStatus = (startDate, endDate) => {
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);
    const today = new Date();

    return (today >= firstDate && today <= lastDate)
}

const getAlreadyBookedVehicleCheck = async (vehicleId, startDate, endDate, bookingId = 'abc') => {
    const bookings = await db.Booking.findAll({
        where: {vehicleId: vehicleId}
    })

    let isBooked = false

    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);

    firstDate.setHours(0,0,0,0)
    lastDate.setHours(0,0,0,0)

    if(bookings.length > 0) {
        bookings.forEach(booking => {
            const bookingFirstDate = new Date(booking.startDate);
            const bookingLastDate = new Date(booking.endDate);

            bookingFirstDate.setHours(0,0,0,0)
            bookingLastDate.setHours(0,0,0,0)


            if((firstDate >= bookingFirstDate && firstDate <= bookingLastDate) || (lastDate >= bookingFirstDate && lastDate <= bookingLastDate)) {
                if(bookingId !== booking.id) isBooked = true
            }
        })
    }
    return isBooked
}

const deleteBooking = (id) => {
    db.Booking.destroy({
        where: { id: id }
    }).then(result => {
        console.log('Booking:', id, 'is deleted..!')
    });
}

module.exports = {
    getActiveStatus,
    populateBookings,
    getAlreadyBookedVehicleCheck,
    deleteBooking
}