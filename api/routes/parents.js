/**
 * Created by M.C on 2017/9/15.
 */

module.exports = app => {
    "use strict";
    const Parents = app.db.models.Parents;
    const Students = app.db.models.Students;
    const Users = app.db.models.Users;

    app.route("/parents")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Parents.findAll({
                    include: [{
                        model: Students,
                        as: 'Students'
                    }, {
                        model: Users,
                        as: 'User'
                    }]
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Parents.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/parents/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Parents.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: [Students, {
                        model: Users,
                        attributes: ['id', 'name', 'email', 'role']
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
        }).put((req, res) => {
            Parents.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => res.status(412).json({ msg: error.message }));
        }).delete((req, res) => {
            Parents.destroy({
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