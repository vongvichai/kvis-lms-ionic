module.exports = (sequelize, DataType) => {
    const Leaves = sequelize.define("Leaves", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: DataType.NOW
        },
        type: {
            type: DataType.ENUM('Home Visiting', 'Business',
                'Sick', 'School Activity', 'Others'),
            allowNull: false
        },
        reason: {
            type: DataType.STRING
        },
        remarks: {
            type: DataType.STRING
        },
        cancelled: {
            type: DataType.BOOLEAN
        }
    }, {
        timestamps: true,
        underscored: true
    });
    Leaves.associate = models => {
        Leaves.belongsTo(models.Parents);
        Leaves.belongsTo(models.Students);
        Leaves.hasMany(models.LeaveDetails);
    };

    return Leaves;
};