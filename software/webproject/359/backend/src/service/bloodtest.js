const database = require("../config/mysql.config");
const QUERIES = require("../queries/queries");

var bloodtest = {
    all: function (req, res, next) {
        database.query(QUERY.SELECT_BLOODTESTS, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
    getOne: function (req, res, next) {
        database.query(
            QUERY.SELECT_BLOODTEST,
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
    getPatientTests: function (req, res, next) {
        console.log("body:", req.body);
        console.log("body:", QUERIES.SELECT_BLOODTESTS_BY_AMKA);
        database.query(
            QUERIES.SELECT_BLOODTESTS_BY_AMKA,
            [req.body.amka],
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

module.exports = bloodtest;
