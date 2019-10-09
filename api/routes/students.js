/**
 * Created by M.C on 2017/9/15.
 */

module.exports = app => {
    "use strict";
    const Students = app.db.models.Students;
    const Parents = app.db.models.Parents;

    app.route("/students")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Students.findAll({
                    include: [Parents]
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Students.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/students/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Students.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: [Parents]
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
        Students.destroy({
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