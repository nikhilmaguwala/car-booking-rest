const db = require("../models");
const populateVehicle = async () => {
  try {
    const validTill = new Date('2023-12-25');
    await db.Vehicle.destroy({ truncate: true });
    const newVehicles = await db.Vehicle.bulkCreate([
      { licensePlate: 'IN-1234', vin: '8765-4321', model : 'S4', color: 'red', validTill: validTill, active: true },
      { licensePlate: 'IN-5678', vin: '1234-4321', model : 'Q3', color: 'black', validTill: validTill, active: true},
    ])
      console.log(' Added to Vehicles Into DataBase ...');
    return newVehicles[0]
  } catch (e) {
    console.log(' Error when Adding Vehicles Into Database ... ');
  }
}

const isFutureDate = (date, strict=true) => {
    const validDate = new Date(date);
    const today = new Date();

    validDate.setHours(0,0,0,0)
    today.setHours(0,0,0,0)

    if(!strict) return (today <= validDate)
    return (today < validDate)
}

const isActiveVehicle = async (vehicleId, startDate, endDate) => {
    const vehicle = await db.Vehicle.findAll({
        where: {id: vehicleId}
    })

    const isExpired = checkIfDateExpired(startDate, endDate, vehicle[0].validTill, vehicleId)

    return (vehicle[0].active && !isExpired)
}

const checkIfDateExpired = (startDate, endDate, validDate, vehicleId) => {
    const expireDate = new Date(validDate);
    const firstDate = new Date(startDate);
    const lastDate = new Date(endDate);

    expireDate.setHours(0,0,0,0)
    firstDate.setHours(0,0,0,0)
    lastDate.setHours(0,0,0,0)

    return (firstDate > expireDate || lastDate > expireDate)
}

const changeActiveStatus = async (vehicleId, status) => {
    await db.Vehicle.update({ active: status }, {
        where: {
            id: vehicleId
        }
    })
}

module.exports = {
    populateVehicle,
    isActiveVehicle,
    isFutureDate,
    changeActiveStatus
}