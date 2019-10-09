import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
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
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        role: {
            type: DataType.ENUM("Admin", "Staff", "User"),
            validate: {
                notEmpty: true
            },
            defaultValue: "User"
        }
    }, {
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        timestamps: true,
        underscored: true
    });
    Users.isPassword = (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
    }
    return Users;
};