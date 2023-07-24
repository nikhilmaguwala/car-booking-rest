module.exports = function(sequelize, DataTypes) {
    const Booking = sequelize.define("Booking", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            field: "id",
            primaryKey: !0
        },
        active: {
            type: DataTypes.BOOLEAN,
            field: 'active',
        },
        startDate: {
            type: DataTypes.DATE,
            field: 'start_date'
        },
        endDate: {
            type: DataTypes.DATE,
            field: 'end_date'
        },
        userId: {
            type: DataTypes.UUID,
            field: 'userId'
        },
        vehicleId: {
            type: DataTypes.UUID,
            field: 'vehicleId'
        }
    }, {});

    return Booking;
}