import { Sequelize } from "sequelize";

const sequelize = new Sequelize("", "", "", {
    dialect: "sqlite",
    storage: "../kvislms.sqlite",
    define: {
        underscored: true
    }
});
const Stations = sequelize.import("../models/stations.js");

Stations.sync({ force: true }).done(() => {
    Stations.bulkCreate([{
            name: "PTT Head Office"
        }, {
            name: "Suwannaphumi Airport"
        }])
        .then(result => console.log(result))
        .catch(error => console.log(error));
})