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
        leaveDate: {
            type: DataType.DATE
        },
        pickupBy: {
            type: DataType.ENUM('กลับเอง', 'ผุ้ปกครอง', 'บุคลลอื่น')
        },
        leaveInfo: {
            type: DataType.STRING
        },
        returnDate: {
            type: DataType.DATE
        },
        dropBy: {
            type: DataType.ENUM('กลับเอง', 'ผุ้ปกครอง', 'บุคลลอื่น')
        },
        returnInfo: {
            type: DataType.STRING
        }
    }, {
        timestamps: true,
        underscored: true
    });
    Leaves.associate = models => {
        Leaves.belongsTo(models.Parents);
        Leaves.belongsToMany(models.Students, {
            through: "LeaveStudents"
        });
        Leaves.belongsTo(models.TimeTables, {
            as: 'timeIn',
            foreignKey: 'timeInId'
        });

        Leaves.belongsTo(models.TimeTables, {
            as: 'timeOut',
            foreignKey: 'timeOutId'
        });
    };

    return Leaves;
};