const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const basename = path.basename(__filename);

let db = {}

const User = require('./user')(sequelize, Sequelize)
const Vehicle = require('./vehicle')(sequelize, Sequelize)
const Booking = require('./booking')(sequelize, Sequelize)

User.hasMany(Booking, {as: 'bookings'})

Vehicle.hasMany(Booking, {as: 'bookings'})


// Index.associate = function () {
//     Index.hasMany(Index, {as: 'bookings'})
// };
//
// Index.associate = function () {
//     Index.hasMany(Index, {as: 'bookings'})
// };
//
Booking.associate = function () {
    Booking.belongsTo(User, {as: 'userId'})
    Booking.belongsTo(Vehicle, {as: 'vehicleId'})
}

db['User'] = User
db['Vehicle'] = Vehicle
db['Booking'] = Booking

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;