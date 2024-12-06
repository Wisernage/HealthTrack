const database = require("../config/mysql.config");
const QUERIES = require("../queries/queries");

var doctors = {
    all: function (req, res, next) {
        database.query(QUERIES.SELECT_DOCTORS, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },

    getAllDoctorsAdmin: (req, res) => {
        if (req.user_type == "admin") {
            database.query(QUERIES.SELECT_DOCTORS, (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    res.json(results);
                }
            });
        } else {
            res.json({
                error: true,
                message: "You are not an admin",
            });
        }
    },

    showDoctors: function (req, res, next) {
        database.query(QUERIES.SELECT_CERTIFIED_DOCTORS, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
    getOne: function (req, res, next) {
        database.query(
            QUERIES.SELECT_DOCTOR,
            [req.params.id],
            (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    res.json(results);
                }
            }
        );
    },
    findOne: function (req, res, next) {
        console.log(req.body);
        database.query(
            QUERIES.FIND_DOCTOR,
            [req.body.username, req.body.password],
            (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    res.json(results);
                }
            }
        );
    },

    deletedoctor: function (req, res, next) {
        console.log(req.body);
        console.log(QUERIES.DELETE_DOCTOR);
        if (req.user_type == "admin") {
            database.query(
                QUERIES.DELETE_DOCTOR,
                [req.body.doctor_id],
                (error, results) => {
                    if (!results) {
                        res.json({ error });
                    } else {
                        res.json(results);
                    }
                }
            );
        } else {
            res.json({
                error: true,
                message: "You are not an admin",
            });
        }
    },

    certify: function (req, res, next) {
        console.log(QUERIES.CERTIFY_DOCTOR);
        if (req.user_type == "admin") {
            database.query(
                QUERIES.CERTIFY_DOCTOR,
                [req.body.doctor_id],
                (error, results) => {
                    if (!results) {
                        res.json({ error });
                    } else {
                        res.json(results);
                    }
                }
            );
        } else {
            res.json({
                error: true,
                message: "You are not an admin",
            });
        }
    },
};

module.exports = doctors;
