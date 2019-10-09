module.exports = (sequelize, DataType) => {

    const Schedules = sequelize.define("Schedules", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        expired: {
            type: DataType.DATE,
            allowNull: true
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