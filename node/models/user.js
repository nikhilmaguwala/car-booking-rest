module.exports = function(sequelize, DataTypes) {
  User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      field: "id",
      primaryKey: !0
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name"
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name"
    },
    email: {
      type: DataTypes.STRING,
      field: "email"
    },
    birthday: {
      type: DataTypes.DATE,
      field: "birthday"
    },
  }, {});

  return User;
}