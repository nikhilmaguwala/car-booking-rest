'use strict'
const db = require('../models');
const {isFutureDate, changeActiveStatus} = require("./vehicle.service");
const {deleteBooking} = require("../booking/booking.service");

// middleware
const checkIDInput = function (req, res, next) {
  //console.log('Check ID input');
  if(req.params.id === '') {
    console.log('Invalid ID supplied', req.params.id);
    res.status(400).json('Invalid ID supplied');
  } else {
    next();
  }
};
const checkIDExist = function (req, res, next) {
  //console.log('Check ID exist');
  db.Vehicle.count({ where: { id: req.params.id } }).then(count => {
    if (count !== 0) {
      next();
    } else {
      //console.log('Book not found');
      res.status(400).json('Index not found');
    }
  });
};

const getAllVehicles = (req, res, next) => {
  db.Vehicle.findAll({ include: ["bookings"] }).then(vehicles => {
    res.set('Access-Control-Expose-Headers', 'Content-Range')
    res.set('Content-Range', vehicles.length);
    res.status(200).json(vehicles)
  })
}

const deactivateVehicle = async (req,res) => {
  changeActiveStatus(req.params.id, false).then(() => {
    res.status(200).json({'message': 'success'})
  })
}

const getVehicle = async (req, res, next) => {
  const vehicle = await db.Vehicle.findAll({
    include: ["bookings"],
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(vehicle[0])
}

const createVehicle = async (req, res) => {
  let errors=[]
  if (!req.body.licensePlate){
    errors.push("No licensePlate specified");
  }
  if (!req.body.vin){
    errors.push("No vin specified");
  }
  if (!req.body.model){
    errors.push("No model specified");
  }
  if (!req.body.color){
    errors.push("No color specified");
  }
  if (!req.body.active){
    errors.push("no active status specified");
  }
  if (!req.body.validTill){
    errors.push("no last valid date specified");
    res.status(400).json({"error": "no last valid date specified"});
    return;
  }
  if(!isFutureDate(req.body.validTill)) {
    errors.push("valid date should be future date!");
  }
  if(errors.length){
    res.status(400).json({"error":errors.join(",")});
    return;
  }

  let newVehicle = {
    licensePlate: req.body.licensePlate,
    vin: req.body.vin,
    model : req.body.model,
    color: req.body.color,
    active: req.body.active,
    validTill: req.body.validTill,
  }

  try {
    const vehicle = await db.Vehicle.create(newVehicle);
    res.status(200).json(vehicle);
  } catch (e) {
    res.status(405).json('Error Occurred in Creating Index!');
  }
}

const updateVehicle = async (req, res) => {

  let updatedVehicle = {
    licensePlate: req.body.firstName,
    vin: req.body.lastName,
    model : req.body.email,
    color: req.body.birthday,
    active: false,
    validTill: ''
  }

  try {
    const vehicle = await db.Vehicle.update(updatedVehicle,{
      where: {
        id: req.params.id
      }
    } );
    res.status(200).json(vehicle);
  } catch (e) {
    res.status(405).json('Error Occurred in Updating Index!');
  }
}

const deleteVehicle = async (req, res) => {
  db.Vehicle.destroy({
    where: { id: req.params.id }
  }).then(result => {
    res.status(200).json(result);
  });
}

module.exports = {
  getAllVehicles,
  getVehicle,
  createVehicle,
  deactivateVehicle,
  updateVehicle,
  deleteVehicle,
  checkIDInput,
  checkIDExist
}