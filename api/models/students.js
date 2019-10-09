module.exports = (sequelize, DataType) => {
    "use strict";
    const Students = sequelize.define("Students", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataType.STRING(7),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataType.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        surname: {
            type: DataType.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        gender: {
            type: DataType.ENUM("M", "F"),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        phone: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                not: ['[a-z]', 'i']
            }
        },
        // email: {
        //     type: DataType.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate: {
        //         isEmail: true
        //     }
        // },
        room: {
            type: DataType.STRING(5),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fullName: {
            type: DataType.VIRTUAL,
            get: function() {
                return `${this.name} ${this.surname}`;
            }
        }
    }, {
        timestamps: true,
        underscored: true
    });
    Students.associate = models => {
        Students.belongsToMany(models.Parents, { through: 'ParentStudent' });
        Students.belongsToMany(models.Leaves, { through: 'LeaveStudents' });
    }
    return Students;
};