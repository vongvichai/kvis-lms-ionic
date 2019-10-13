module.exports = (sequelize, DataType) => {
    "use strict";
    const Parents = sequelize.define("Parents", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        surname: {
            type: DataType.STRING,
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
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
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
    Parents.associate = models => {
        Parents.belongsTo(models.Users);
        Parents.belongsToMany(models.Students, { through: 'parent_student' });
    };
    return Parents;
};

/*
Parent ID.,Student ID.,Name,Surname,Gender,Phone,Email,password
*/