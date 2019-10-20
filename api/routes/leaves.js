/**
 * Created by M.C on 2017/9/15.
 */

module.exports = app => {
    "use strict";
    const Leaves = app.db.models.Leaves,
        LeaveDetails = app.db.models.LeaveDetails,
        Students = app.db.models.Students,
        Parents = app.db.models.Parents,
        TimeTables = app.db.models.TimeTables,
        Stations = app.db.models.Stations;

    app.route("/leaves")
        .all(app.auth.authenticate())
        .get((req, res) => {
            // console.log(`req.body: ${req.body}`);
            Leaves.findAll({ where: { user_id: req.user.id } })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Leaves.create(req.body, {
                    include: [LeaveDetails, Students, Parents
                        // association: Leaves.associations.LeaveDetails
                    ]
                })
                .then(async leave => {
                    let student = await Students.findByPk(req.body.studentId);
                    let parent = await Parents.findByPk(req.body.parentId);
                    leave.setStudent(student);
                    leave.setParent(parent);
                    leave.LeaveDetails.map(async d => {
                        let timeTable = await TimeTables.findByPk(d.TimeTableId);
                        let station = await Stations.findByPk(d.StationId);
                        d.setTimeTable(timeTable);
                        d.setStation(station);
                    });
                    res.json(leave);
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/leaves/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Leaves.findOne({
                    where: {
                        id: req.params.id,
                        user_id: req.user.id
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
        Leaves.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
};