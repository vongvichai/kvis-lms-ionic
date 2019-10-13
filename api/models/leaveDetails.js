module.exports = (sequelize, DataType) => {
    const LeaveDetails = sequelize.define("LeaveDetails", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contact: {
            type: DataType.STRING
        },
        contactInfo: {
            type: DataType.STRING
        }
    }, {
        timestamps: true,
        underscored: true
    });
    LeaveDetails.associate = models => {
        LeaveDetails.belongsTo(models.TimeTables);
        LeaveDetails.belongsTo(models.Stations);
    };

    return LeaveDetails;
};