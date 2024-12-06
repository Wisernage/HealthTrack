const database = require("../config/mysql.config");
const QUERIES = require("../queries/queries");
const messages = require("./messages");

var randevouz = {
    all: function (req, res, next) {
        database.query(QUERY.SELECT_RANDEVOUZES, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
    getOne: function (req, res, next) {
        database.query(
            QUERY.SELECT_RANDEVOUZ,
            [req.params.id],
            (error, results) => {
                console.log(req.params.id);
                if (!results) {
                    res.json({ error });
                } else {
                    res.json(results);
                }
            }
        );
    },
    randevouzForUser: function (req, res, next) {
        database.query(
            QUERIES.SELECT_RANDEVOUZ_DOCTOR,
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
    updateRandevouzForUser: function (req, res, next) {
        const { randevouz_id, user_id, status } = req.body;
        query = `UPDATE randevouz
        SET user_id = '${req.userId}',
            status = '${status}'
        WHERE
            randevouz_id = '${randevouz_id}'`;

        console.log(req.body);
        if (status === "cancelled") {
            req.body.message = `${req.firstname} ${req.lastname} has cancelled your appointment, (randevouz id cancelled ${req.body.randevouz_id})`;
            database.query(query, (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    messages.makeContact(req, res);
                }
            });
        } else {
            database.query(query, (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    res.json(results);
                }
            });
        }
    },
    updateRandevouzForDoctor: function (req, res, next) {
        const { randevouz_id } = req.body;
        query = `UPDATE randevouz
        SET status = 'cancelled'
        WHERE
            randevouz_id = '${randevouz_id}'`;
        if (req.body.user_id === null) {
            database.query(query, (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    res.json(results);
                }
            });
        } else {
            database.query(query, (error, results) => {
                req.body.message = `The doctor ${req.firstname} ${req.lastname} has cancelled your appointment, please reschedule. (randevouz id cancelled ${req.body.randevouz_id})`;
                console.log(req.body);
                if (!results) {
                    res.json({ error });
                } else {
                    messages.makeContact(req, res);
                }
            });
        }
    },

    createRandevouz: function (req, res, next) {
        const { time, doctor_info, user_id, day, price } = req.body;
        let hours = Math.floor(+time / 3600); // get hours
        let minutes = Math.floor((+time - hours * 3600) / 60); // get minutes
        let seconds = +time - hours * 3600 - minutes * 60; //  get seconds
        let calced_time = `${day} ${hours}:${minutes}:00`;

        var myquery = `INSERT INTO randevouz (user_id, doctor_id, date_time, price, doctor_info, status)
        VALUES (0, '${req.userId}', '${calced_time}', '${price}', '${doctor_info}', 'free');`;
        console.log(myquery);
        database.query(myquery, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
        // } else {
        //     database.query(query, (error, results) => {
        //         req.body.message = `The doctor ${req.firstname} ${req.lastname} has cancelled your appointment, please reschedule. (randevouz id cancelled ${req.body.randevouz_id})`;
        //         console.log(req.body);
        //         if (!results) {
        //             res.json({ error });
        //         } else {
        //             messages.makeContact(req, res);
        //         }
        //     });
        // }
    },
    randevouzOfTheDay: function (req, res, next) {
        database.query(
            QUERIES.SELECT_RANDEVOUZ__DAY,
            [req.body.date, req.userId],
            (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    res.json(results);
                }
            }
        );
    },
};

module.exports = randevouz;
