/**
 * Created by M.C on 2017/9/15.
 */

module.exports = app => {
    "use strict";
    const TimeTables = app.db.models.TimeTables;
    const TimeTable_Station = app.db.sequelize.model('timeTable_station');
    const Stations = app.db.models.Stations;

    app.route("/timetables")
        .all(app.auth.authenticate())
        .get((req, res) => {
            // console.log(`req.body: ${req.body}`);
            TimeTables.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            TimeTables.create(req.body)
                .then(result => {
                    req.body.stations.forEach(stationId => {
                        Stations.findByPk(stationId).then(station => {
                            result.addStation(station);
                        });
                    });
                    res.json(result);
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/timetables/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            TimeTables.findOne({
                    where: {
                        id: req.params.id
                    }
                })
                .then(result => {
                    if (result) {
                        res.json(result);
                    } else {
                        res.sendStatus(412);
                    }
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete((req, res) => {
            TimeTables.findByPk(req.params.id, {
                include: [Stations]
            })
            .then(result => {
                result.destroy().then(r => {
                    res.status(200).json(r);
                })
            })
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });                
        })
        .put((req, res) => {
            TimeTables.findByPk(req.params.id, {
                include: [Stations]
            })
            .then(result => {
                if (result) {
                    result.update({
                        tripType: req.body.tripType,
                        datetime: req.body.datetime
                    });
                    result.removeStations(result.Stations);
                    req.body.stations.forEach(stationId => {
                        Stations.findByPk(stationId).then(station => {
                            result.addStation(station);
                        });
                    });
                    res.json(result);
                }
            })
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
        })
};