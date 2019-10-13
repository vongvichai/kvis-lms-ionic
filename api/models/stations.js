module.exports = (sequelize, DataType) => {

    const Stations = sequelize.define("Stations", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        underscored: true
    });
    Stations.associate = models => {
        Stations.belongsToMany(models.TimeTables, { through: 'timeTable_station' })
    }
    return Stations;
};