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
TimeTables.belongsToMany(Stations, { through: 'timeTable_station' });
Schedules.hasMany(TimeTables);

const schedules_array = [{
        "fromDate": "2019-05-01 00:00:00",
        "toDate": "2019-05-04 00:00:00",
        "timeTable": [{ "out_kvis": "", "in_kvis": "2019-05-06 16:00:00" }]
    },
    {
        "fromDate": "2019-05-07 00:00:00",
        "toDate": "2019-05-09 00:00:00",
        "timeTable": [{ "out_kvis": "2019-05-10 17:00:00", "in_kvis": "2019-05-11 16:00:00" },
            { "out_kvis": "", "in_kvis": "2019-05-12 07:00:00" }
        ]
    },
    {
        "fromDate": "2019-05-12 00:00:00",
        "toDate": "2019-05-14 00:00:00",
        "timeTable": [{ "out_kvis": "2019-05-17 17:00:00", "in_kvis": "2019-05-20 16:00:00" },
            { "out_kvis": "2019-05-18 08:30:00", "in_kvis": "" }
        ]
    },
    {
        "fromDate": "2019-05-19 00:00:00",
        "toDate": "2019-05-21 00:00:00",
        "timeTable": [{ "out_kvis": "2019-05-24 17:00:00", "in_kvis": "2019-05-26 16:00:00" },
            { "out_kvis": "2019-05-25 13:00:00", "in_kvis": "" }
        ]
    },
    {
        "fromDate": "2019-05-27 00:00:00",
        "toDate": "2019-05-30 00:00:00",
        "timeTable": [{ "out_kvis": "2019-05-31 17:00:00", "in_kvis": "2019-06-03 16:00:00" },
            { "out_kvis": "2019-06-01 08:30:00", "in_kvis": "" },
            { "out_kvis": "2019-06-01 13:00:00", "in_kvis": "" }
        ]
    },
    {
        "fromDate": "2019-06-02 00:00:00",
        "toDate": "2019-06-04 00:00:00",
        "timeTable": [{ "out_kvis": "2019-06-07 17:00:00", "in_kvis": "2019-06-09 16:00:00" }]
    },
    {
        "fromDate": "2019-06-10 00:00:00",
        "toDate": "2019-06-12 00:00:00",
        "timeTable": [{ "out_kvis": "2019-06-14 17:00:00", "in_kvis": "2019-06-16 16:00:00" }]
    },
    {
        "fromDate": "2019-06-17 00:00:00",
        "toDate": "2019-06-20 00:00:00",
        "timeTable": [{ "out_kvis": "2019-06-21 17:00:00", "in_kvis": "2019-06-23 16:00:00" }]
    },
];

Schedules.sync({ force: true }).done(async() => {
    await TimeTables.sync({ force: true }).done();
    let stations = await Stations.findAll().then(s => { return s });

    schedules_array.map(o => {
        // let { expired, timeTable: [trip, ...restTrip] } = o;
        // console.log(expired, trip, restTrip);
        Schedules.create({
                fromDate: new Date(o.fromDate + 'Z'),
                toDate: new Date(o.toDate + 'Z')
            })
            .then(s => {
                o.timeTable.map(t => {
                    if (t.out_kvis) {
                        TimeTables.create({
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

TimeTables.findAll({
        where: {
            tripType: 'OUT',
            trip: 22
        },
        attributes: ['id',
            'trip',
            'tripType',
            'datetime'
        ],
        include: [{
            model: Stations,
            attributes: ['id', 'name'],
            required: false,
        }],
        nest: true,
        raw: true
    })
    .then(ts => {
        console.log(ts);
    })