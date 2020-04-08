/**
 * Created by M.C on 2017/9/15.
 */

module.exports = app => {
    "use strict";
    const Schedules = app.db.models.Schedules;
    const TimeTables = app.db.models.TimeTables;
    const Stations = app.db.models.Stations;

    app.route("/schedules")
        .all(app.auth.authenticate())
        .get((req, res) => {
            // console.log(`req.body: ${req.body}`);
            Schedules.findAll({
                    include: [{
                        model: TimeTables,
                        as: "TimeTables",
                        include: [Stations]
                    }]
                })
                .then(result => {
                    res.json(result)
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Schedules.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/schedules/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Schedules.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: [{
                        model: TimeTables,
                        as: "TimeTables",
                        include: [Stations]
                    }]
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
        .put((req, res) => {
            Schedules.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(error => res.status(412).json({ msg: error.message }));
        })
        .delete((req, res) => {
            Schedules.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: TimeTables,
                    as: "TimeTables",
                    include: [Stations]
                }]
            })
            .then(result => {
                if (result) {
                    result.destroy().then(r => {
                        res.json(result);
                    });
                } else {
                    res.sendStatus(412);
                }
            })
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
        });
};