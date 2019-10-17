module.exports = (sequelize, DataType) => {
    const LeaveDetails = sequelize.define("LeaveDetails", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataType.ENUM('DEPART', 'ARRIVE'),
            allowNull: false
        },
        date: {
            type: DataType.DATE
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