'use strict'
const db = require('../models');
const {getActiveStatus, getAlreadyBookedVehicleCheck} = require("./booking.service");
const {isActiveVehicle, isFutureDate} = require('../vehicle/vehicle.service')

// middleware
const checkIDInput = function (req, res, next) {
  if(req.params.id === '') {
    res.status(400).json('Invalid ID supplied');
  } else {
    next();
  }
};
const checkIDExist = function (req, res, next) {
  //console.log('Check ID exist');
  db.Booking.count({ where: { id: req.params.id } }).then(count => {
    if (count !== 0) {
      next();
    } else {
      //console.log('Book not found');
      res.status(400).json('Booking not found');
    }
  });
};

const getAllBookings = (req, res, next) => {
  db.Booking.findAll().then(bookings => {
    res.set('Access-Control-Expose-Headers', 'Content-Range')
    res.set('Content-Range', bookings.length);
    res.status(200).json(bookings)
  })
}

const getBooking = async (req, res, next) => {
  const booking = await db.Booking.findAll({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(booking[0])
}

const createBooking = async (req, res) => {
  if (!req.body.userId){
    res.status(400).json({"error": "No user id specified"});
    return;
  }
  if (!req.body.vehicleId){
    res.status(400).json({"error": "No vehicle id specified"});
    return;
  }
  if (!req.body.startDate){
    res.status(400).json({"error": "No start date specified"});
    return;
  }
  if (!req.body.endDate){
    res.status(400).json({"error": "No end date specified"});
    return;
  }
  if(!isFutureDate(req.body.startDate, false)) {
    res.status(400).json({"error": "start date is not valid!"});
    return;
  }
  if(!isFutureDate(req.body.endDate)) {
    res.status(400).json({"error": "end date is not valid!"});
    return;
  }
  if (!isActiveVehicle(req.body.vehicleId, req.body.startDate, req.body.endDate)) {
    res.status(400).json({"error": "Vehicle is not active!"});
    return;
  }
  if (await getAlreadyBookedVehicleCheck(req.body.vehicleId, req.body.startDate, req.body.endDate)) {
    res.status(400).json({"error": "Vehicle is not Available During Given Dates!"});
    return;
  }

  const active = getActiveStatus(req.body.startDate, req.body.endDate);

  const newBooking = {
    UserId: req.body.userId,
    VehicleId: req.body.vehicleId,
    startDate : req.body.startDate,
    endDate: req.body.endDate,
    active: active
  }

  try {
    const booking = await db.Booking.create(newBooking);
    res.status(200).json(booking);
  } catch (e) {
    res.status(405).json('Error Occurred in Creating Booking!');
  }
}

const updateBooking = async (req, res) => {

  let updatedBooking = {}

  if (req.body.UserId){
    updatedBooking.UserId = req.body.userId
  }
  if (req.body.VehicleId){
    updatedBooking.VehicleId = req.body.vehicleId
  }
  if (req.body.startDate && req.body.endDate){
    updatedBooking.startDate = req.body.startDate
    updatedBooking.endDate = req.body.endDate
  } else if (req.body.startDate || req.body.endDate) {
    res.status(400).json({"error": "Both Start and End Date should be specified!"});
    return;
  }

  if (!isActiveVehicle(req.body.vehicleId, req.body.startDate, req.body.endDate)) {
    res.status(400).json({"error": "Vehicle is not active!"});
    return;
  }

  if (await getAlreadyBookedVehicleCheck(req.body.vehicleId, req.body.startDate, req.body.endDate, req.params.id)) {
    res.status(400).json({"error": "Vehicle is not Available During Given Dates!"});
    return;
  }

  try {
    const booking = await db.Booking.update(updatedBooking,{
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(booking);
  } catch (e) {
    res.status(405).json('Error Occurred in Updating Booking!');
  }
}

const deleteBooking = (req, res) => {
  db.Booking.destroy({
    where: { id: req.params.id }
  }).then(result => {
    res.status(200).json(result);
  });
}

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  checkIDInput,
  checkIDExist
}