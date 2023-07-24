module.exports = function(sequelize, DataTypes) {
  Vehicle = sequelize.define("Vehicle", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      field: "id",
      primaryKey: !0
    },
    licensePlate: {
      type: DataTypes.STRING,
      field: "licensePlate",
      unique: true
    },
    vin: {
      type: DataTypes.STRING,
      field: "vin"
    },
    model: {
      type: DataTypes.STRING,
      field: "model"
    },
    color: {
      type: DataTypes.STRING,
      field: "color"
    },
    validTill: {
      type: DataTypes.DATE,
      field: "valid_till"
    },
    active: {
      type: DataTypes.BOOLEAN,
      field: "active"
    }
  }, {});

  return Vehicle
}