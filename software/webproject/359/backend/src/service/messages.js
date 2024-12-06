const database = require("../config/mysql.config");
const QUERIES = require("../queries/queries");

var messages = {
    all: function (req, res, next) {
        database.query(QUERIES.SELECT_MESSAGES, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
    getOne: function (req, res, next) {
        database.query(
            QUERIES.SELECT_MESSAGE,
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
    getMessage: function (req, res, next) {
        var myQuery = `SELECT message.sender, message.message, doctors.lastname AS doctor_lastname, message.user_id, users.lastname AS user_lastname
        FROM message
        INNER JOIN doctors ON message.doctor_id=doctors.doctor_id
        INNER JOIN users ON message.user_id=users.user_id WHERE ${req.userId} = ${req.user_type}s.${req.user_type}_id`;
        database.query(myQuery, (error, results) => {
            console.log(req.params.id);
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
    getContacts: function (req, res, next) {
        var query1 = ` SELECT DISTINCT doctors.lastname, doctors.doctor_id FROM doctors INNER JOIN randevouz
        on randevouz.doctor_id = doctors.doctor_id WHERE randevouz.status = 'done' AND randevouz.user_id = ?`;
        var query2 = ` SELECT DISTINCT users.lastname, users.user_id, users.amka FROM users INNER JOIN randevouz
        on randevouz.user_id = users.user_id WHERE randevouz.status = 'done' AND randevouz.doctor_id = ?`;
        var myQuery = req.user_type == "user" ? query1 : query2;
        database.query(myQuery, [req.userId], (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },

    makeContact: function (req, res, next) {
        console.log("body", req.body);
        var { message, doctor_id, user_id, lastname } = req.body;
        var myQuery1 = `INSERT INTO message
        (message, sender, doctor_id, user_id)
        VALUES
        ('${message}', 'doctor', ${req.userId}, ${user_id});`;

        var myQuery2 = `INSERT INTO message
        (message, sender, doctor_id, user_id)
        VALUES
        ('${message}', 'user', ${doctor_id}, ${req.userId});`;
        var myQuery = req.user_type == "doctor" ? myQuery1 : myQuery2;
        console.log(myQuery);
        database.query(myQuery, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
};

module.exports = messages;
