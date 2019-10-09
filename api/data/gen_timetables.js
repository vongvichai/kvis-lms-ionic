import { Sequelize } from "sequelize";

const sequelize = new Sequelize("", "", "", {
    dialect: "sqlite",
    storage: "../kvislms.sqlite",
    define: {
        underscored: true
    }
});
const Stations = sequelize.import("../models/stations.js");
const Schedules = sequelize.import("../models/schedules.js");
const TimeTables = sequelize.import("../models/timeTables.js");
TimeTables.belongsToMany(Stations, { through: 'TimeTableStations' });
Schedules.hasMany(TimeTables);

const schedules_array = [{
        "expired": "2019-06-26 11:24:45",
        "timeTable": [{ "trip": 1, "out_kvis": "", "in_kvis": "2019-05-06 16:00:00" }]
    },
    {
        "expired": "2019-06-26 11:24:45",
        "timeTable": [{ "trip": 2, "out_kvis": "2019-05-10 17:00:00", "in_kvis": "2019-05-11 16:00:00" },
            { "trip": 2, "out_kvis": "", "in_kvis": "2019-05-12 07:00:00" }
        ]
    },
    {
        "expired": "2019-06-26 11:24:45",
        "timeTable": [{ "trip": 3, "out_kvis": "2019-05-17 17:00:00", "in_kvis": "2019-05-20 16:00:00" },
            { "trip": 3, "out_kvis": "2019-05-18 08:30:00", "in_kvis": "" }
        ]
    },
    {
        "expired": "2019-06-26 11:24:45",
        "timeTable": [{ "trip": 4, "out_kvis": "2019-05-24 17:00:00", "in_kvis": "2019-05-26 16:00:00" },
            { "trip": 4, "out_kvis": "2019-05-25 13:00:00", "in_kvis": "" }
        ]
    },
    {
        "expired": "2019-06-26 11:24:45",
        "timeTable": [{ "trip": 5, "out_kvis": "2019-05-31 17:00:00", "in_kvis": "2019-06-03 16:00:00" },
            { "trip": 5, "out_kvis": "2019-06-01 08:30:00", "in_kvis": "" },
            { "trip": 5, "out_kvis": "2019-06-01 13:00:00", "in_kvis": "" }
        ]
    },
    { "expired": "2019-06-26 11:24:45", "timeTable": [{ "trip": 6, "out_kvis": "2019-06-07 17:00:00", "in_kvis": "2019-06-09 16:00:00" }] },
    { "expired": "2019-06-26 11:24:45", "timeTable": [{ "trip": 7, "out_kvis": "2019-06-14 17:00:00", "in_kvis": "2019-06-16 16:00:00" }] },
    { "expired": "2019-06-26 11:24:45", "timeTable": [{ "trip": 8, "out_kvis": "2019-06-21 17:00:00", "in_kvis": "2019-06-23 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 9, "out_kvis": "2019-06-28 17:00:00", "in_kvis": "2019-06-30 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 10, "out_kvis": "2019-07-05 17:00:00", "in_kvis": "2019-07-07 16:00:00" }] },
    {
        "expired": null,
        "timeTable": [{ "trip": 11, "out_kvis": "2019-07-12 17:00:00", "in_kvis": "2019-07-21 16:00:00" },
            { "trip": 11, "out_kvis": "2019-07-13 08:30:00", "in_kvis": "" }
        ]
    },
    { "expired": null, "timeTable": [{ "trip": 12, "out_kvis": "2019-07-26 17:00:00", "in_kvis": "2019-07-29 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 13, "out_kvis": "2019-07-27 08:30:00", "in_kvis": "" }] },
    { "expired": null, "timeTable": [{ "trip": 14, "out_kvis": "2019-08-02 17:00:00", "in_kvis": "2019-08-04 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 15, "out_kvis": "2019-08-09 17:00:00", "in_kvis": "2019-08-12 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 15, "out_kvis": "2019-08-10 14:00:00", "in_kvis": "" }] },
    { "expired": null, "timeTable": [{ "trip": 16, "out_kvis": "2019-08-16 17:00:00", "in_kvis": "2019-08-18 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 17, "out_kvis": "2019-08-23 17:00:00", "in_kvis": "2019-08-25 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 18, "out_kvis": "2019-08-30 17:00:00", "in_kvis": "2019-09-01 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 19, "out_kvis": "2019-09-06 17:00:00", "in_kvis": "2019-09-08 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 20, "out_kvis": "2019-09-13 17:00:00", "in_kvis": "2019-09-15 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 21, "out_kvis": "2019-09-20 17:00:00", "in_kvis": "2019-09-22 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 22, "out_kvis": "2019-09-27 17:00:00", "in_kvis": "2019-10-14 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 22, "out_kvis": "2019-09-28 08:30:00", "in_kvis": "" }] },
    { "expired": null, "timeTable": [{ "trip": 23, "out_kvis": "2019-10-18 17:00:00", "in_kvis": "2019-10-20 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 24, "out_kvis": "2019-10-25 17:00:00", "in_kvis": "2019-10-27 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 25, "out_kvis": "2019-11-01 17:00:00", "in_kvis": "2019-11-03 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 26, "out_kvis": "2019-11-15 17:00:00", "in_kvis": "2019-11-17 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 27, "out_kvis": "2019-11-22 17:00:00", "in_kvis": "2019-11-24 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 28, "out_kvis": "2019-11-29 17:00:00", "in_kvis": "2019-12-01 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 29, "out_kvis": "2019-12-06 17:00:00", "in_kvis": "2019-12-08 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 30, "out_kvis": "2019-12-13 17:00:00", "in_kvis": "2019-12-15 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 31, "out_kvis": "2019-12-20 17:00:00", "in_kvis": "2019-12-22 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 32, "out_kvis": "2019-12-27 17:00:00", "in_kvis": "2020-01-05 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 32, "out_kvis": "2019-12-28 08:30:00", "in_kvis": "" }] },
    { "expired": null, "timeTable": [{ "trip": 34, "out_kvis": "2020-01-10 17:00:00", "in_kvis": "2020-01-12 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 35, "out_kvis": "2020-01-24 17:00:00", "in_kvis": "2020-01-26 16:00:00" }] },
    { "expired": null, "timeTable": [{ "trip": 36, "out_kvis": "2020-01-31 17:00:00", "in_kvis": "2020-02-02 16:00:00" }] }
];

Schedules.sync({ force: true }).done(async() => {
    await TimeTables.sync({ force: true }).done();
    let stations = await Stations.findAll().then(s => { return s });

    schedules_array.map(o => {
        // let { expired, timeTable: [trip, ...restTrip] } = o;
        // console.log(expired, trip, restTrip);
        Schedules.create({ expired: new Date(o.expired + 'Z') })
            .then(s => {
                o.timeTable.map(t => {
                    if (t.out_kvis) {
                        TimeTables.create({
                            trip: t.trip,
                            tripType: 'OUT',
                            datetime: new Date(t.out_kvis + 'Z'),
                            ScheduleId: s.id
                        }).then(t => {
                            t.addStations(stations);
                        })
                    }
                    if (t.in_kvis) {
                        TimeTables.create({
                            trip: t.trip,
                            tripType: 'IN',
                            datetime: new Date(t.in_kvis + 'Z'),
                            ScheduleId: s.id
                        }).then(t => {
                            t.addStations(stations);
                        })
                    }
                })
            })
            .catch(error => console.log(error));
    });

});