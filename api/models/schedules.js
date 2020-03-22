module.exports = (sequelize, DataType) => {

    const Schedules = sequelize.define("Schedules", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fromDate: {
            type: DataType.DATE
        },
        toDate: {
            type: DataType.DATE
        },
        expired: {
            type: DataType.VIRTUAL,
            get() {
                return Date.now() > this.getDataValue('toDate');
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });
    Schedules.associate = models => {
        Schedules.hasMany(models.TimeTables);
    }
    return Schedules;
};