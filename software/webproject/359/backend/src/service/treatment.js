const database = require("../config/mysql.config");
const QUERIES = require("../queries/queries");

var treatment = {
    all: function (req, res, next) {
        database.query(QUERIES.SELECT_TREATMENTS, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
    getOne: function (req, res, next) {
        database.query(
            QUERIES.SELECT_TREATMENT,
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
    newtreatment: function (req, res, next) {
        var {
            lastname,
            treatment_text,
            start_date,
            end_date,
            user_id,
            amka,
            bloodtest_id,
        } = req.body;

        var myQuery = `INSERT INTO treatment
                (doctor_id, user_id, start_date, end_date, treatment_text, bloodtest_id)
                VALUES
                ('${req.userId}', '${user_id}', '${start_date}', '${end_date}', '${treatment_text}', ${bloodtest_id});`;
        console.log(myQuery);
        // res.json({
        //     message: "ok",
        // });
        database.query(myQuery, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
    getTreatmentByUser: function (req, res, next) {
        database.query(
            QUERIES.SELECT_TREATMENT_BY_USER,
            [req.userId],
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

module.exports = treatment;
