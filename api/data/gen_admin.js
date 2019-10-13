import { Sequelize } from "sequelize";

const sequelize = new Sequelize("", "", "", {
    dialect: "sqlite",
    storage: "../kvislms.sqlite",
    define: {
        underscored: true
    }
});
const Users = sequelize.import("../models/users.js");

Users.sync({ force: true }).done(() => {
    Users.create({
            name: "admin",
            email: "admin@kvis.ac.th",
            password: "123456",
            role: "Admin"
        })
        .then(result => console.log(result))
        .catch(error => console.log(error));
    Users.create({
            name: "staff",
            email: "staff@kvis.ac.th",
            password: "123456",
            role: "Staff"
        })
        .then(result => console.log(result))
        .catch(error => console.log(error));
})