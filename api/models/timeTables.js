module.exports = (sequelize, DataType) => {
    const TimeTables = sequelize.define("TimeTables", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        trip: {
            type: DataType.INTEGER,
            allowNull: false
        },
        tripType: {
            type: DataType.ENUM('IN', 'OUT'),
            allowNull: false
        },
        datetime: {
            type: DataType.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });
    TimeTables.associate = models => {
        TimeTables.belongsToMany(models.Stations, { through: 'TimeTableStations' });
    }
    return TimeTables;
};