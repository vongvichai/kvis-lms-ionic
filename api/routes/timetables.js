/**
 * Created by M.C on 2017/9/15.
 */

module.exports = app => {
    "use strict";
    const TimeTables = app.db.models.TimeTables;

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
                .then(result => res.json(result))
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
        TimeTables.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
};