import { Sequelize } from "sequelize";
import moment from "moment"

const sequelize = new Sequelize("", "", "", {
    dialect: "sqlite",
    storage: "../kvislms.sqlite",
    define: {
        underscored: true
    }
});
const Leaves = sequelize.import("../models/leaves.js");
const LeaveDetails = sequelize.import("../models/leaveDetails.js");
const Students = sequelize.import("../models/students.js");
const Parents = sequelize.import("../models/parents.js");
const TimeTables = sequelize.import("../models/timeTables.js");
const Stations = sequelize.import("../models/stations.js");

const Details = Leaves.hasMany(LeaveDetails, { as: 'details' });
Leaves.belongsTo(Parents, { as: 'parent' });
Leaves.belongsTo(Students, { as: 'student' });
LeaveDetails.belongsTo(TimeTables, { as: 'timeTable' })
LeaveDetails.belongsTo(Stations, { as: 'station' })

const leaves_array = [{
    //      id: id.value,
    date: new Date(),
    type: 'Home Visiting',
    reason: 'No Reason AT ALL',
    remarks: 'Movie: To Sir With Love',
    studentId: 166,
    parentId: 383,
    cancelled: false,

    details: [{
            type: 'DEPART',
            timeTableId: 1,
            stationId: 1,
            date: null,
            contact: 'Father',
            contactInfo: 'John/0810123456'
        },
        {
            type: 'ARRIVE',
            timeTableId: null,
            stationId: null,
            date: moment('2019-10-16 17:30:00'),
            contact: 'Mother',
            contactInfo: 'Marry/0817894561'
        }
    ]
}];


// LeaveDetails.sync({ force: true })
// Leaves.sync({ force: true })

// LeaveDetails.sync({ force: true })
//     .done(() => {
//         Leaves.sync({ force: true })
//             .done(() => {
//                 leaves_array.map(async l => {
//                     await Leaves.create(l, {
//                             include: [{
//                                 association: Details,
//                                 as: 'details'
//                             }]
//                         })
//                         .then(instance => {
//                             console.log(instance);
//                         });
//                 });
//             });
//     });

Leaves.findAll({
        include: [{
            model: LeaveDetails,
            as: "details",
            include: [{
                model: TimeTables,
                as: 'timeTable'
            }],
            include: [{
                model: Stations,
                as: 'station'
            }]
        }, {
            model: Students,
            as: "student"
        }, {
            model: Parents,
            as: "parent"
        }],
        raw: true
    })
    .then(leaves => {
        console.log(leaves);
    });