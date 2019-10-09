/**
 * Created by M.C on 2017/9/15.
 */

module.exports = app => {
    "use strict";
    const Stations = app.db.models.Stations;

    app.route("/stations")
        .all(app.auth.authenticate())
        .get((req, res) => {
            // console.log(`req.body: ${req.body}`);
            Stations.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Stations.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/stations/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Stations.findOne({
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
        .put((req, res) => {
            Stations.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.status(412).json({ msg: error.message }));
        })
        .delete((req, res) => {
            console.log(req.body)
            Stations.destroy({
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