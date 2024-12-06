"use strict";
const database = require("./config/mysql.config");
const jwt = require("jsonwebtoken");
const controller = require("./controller");
const {
    login,
    loginAdmin,
    register,
    profile,
    updateProfile,
    showDoctors,
    randevouzForUser,
    updateRandevouzForUser,
    updateRandevouzForDoctor,
    randevouzOfTheDay,
    getAllUsersAdmin,
    getAllDoctorsAdmin,
    about,
    deletedoctor,
    deleteuser,
    certify,
    getContacts,
    getMessage,
    makeContact,
    getPatientTests,
    newtreatment,
    getTreatmentByUser,
    createRandevouz,
    notFound,
} = controller;

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("Token doesn't exists.......");
    } else {
        jwt.verify(token, "oneSecret", (err, decoded) => {
            console.log("with verification");
            if (err) {
                res.json({ error: true, message: "Authedication failed...." });
            } else {
                req.userId = decoded.id;
                req.firstname = decoded.firstname;
                req.lastname = decoded.lastname;
                req.user_type = decoded.user_type;
                next();
            }
        });
    }
};

module.exports = (app) => {
    app.get("/verifytoken", verifyJWT, (req, res) => {
        const { userId, firstname, lastname, user_type } = req;
        res.json({ id: userId, firstname, lastname, user_type });
    });
    app.route("/login").post(login);
    app.route("/loginadmin").post(loginAdmin);
    app.route("/register").post(register);
    app.get("/profile", verifyJWT, profile);
    app.get("/randevouz/:id", verifyJWT, randevouzForUser);
    app.put("/randevouz", verifyJWT, updateRandevouzForUser);
    app.post("/randevouzoftheday", verifyJWT, randevouzOfTheDay);
    app.put("/randevouzbydoctor", verifyJWT, updateRandevouzForDoctor);
    app.get("/allusers", verifyJWT, getAllUsersAdmin);
    app.get("/alldoctors", verifyJWT, getAllDoctorsAdmin);
    app.put("/profile", verifyJWT, updateProfile);

    app.delete("/deletedoctor", verifyJWT, deletedoctor);
    app.delete("/deleteuser", verifyJWT, deleteuser);
    app.put("/certify", verifyJWT, certify);
    app.get("/messages", verifyJWT, getMessage);
    app.get("/contacts", verifyJWT, getContacts);
    app.post("/makecontact", verifyJWT, makeContact);
    app.post("/mypatienttests", verifyJWT, getPatientTests);
    app.post("/newtreatment", verifyJWT, newtreatment);
    app.get("/treatmentbyuser", verifyJWT, getTreatmentByUser);
    app.post("/createrandevouz", verifyJWT, createRandevouz);

    app.route("/showdoctors").get(showDoctors);
    app.route("/about").get(about);

    app.post("/newBloodTest/", function (req, res) {
        console.log("body came as : ", req.body);
        console.log("body.amka came as : ", req.body.amka);
        if (
            req.body.amka !== undefined &&
            req.body.test_date !== undefined &&
            req.body.medical_center !== undefined
        ) {
            let optionalFields = [
                req.body.blood_sugar,
                req.body.cholesterol,
                req.body.iron,
                req.body.vitamin_d3,
                req.body.vitamin_b12,
            ];
            let dataDate = new Date(req.body.test_date);
            let currentDate = new Date(Date.now());
            if (optionalFields.find((x) => x <= 0) === undefined) {
                if (optionalFields.find((x) => x > 0) !== undefined) {
                    if (
                        optionalFields.find(
                            (x) =>
                                (typeof Number(x) != "number" ||
                                    isNaN(Number(x))) &&
                                typeof x != undefined
                        ) === undefined
                    ) {
                        if (dataDate <= currentDate) {
                            database.query(
                                createQuery(req.body),
                                function (error, results, fields) {
                                    if (error) throw error;
                                    console.log("Posted: ", results);
                                    res.status(200);
                                    res.json(results);
                                }
                            );
                        } else {
                            res.status(422);
                            res.json({
                                error: true,
                                message:
                                    "Date is either wrongly formatted or is a future date, cannot process data.",
                            });
                        }
                    } else {
                        res.status(422);
                        res.json({
                            error: true,
                            message:
                                "One of the fields has an invalid type of value, cannot process data.",
                        });
                    }
                } else {
                    res.status(422);
                    res.json({
                        error: true,
                        message:
                            "No field has been numerically defined, cannot process data.",
                    });
                }
            } else {
                res.status(422);
                res.json({
                    error: true,
                    message:
                        "A field is negative or zero, cannot process data.",
                });
            }
            console.log(req.body);
        } else {
            res.status(422);
            res.json({
                error: true,
                message:
                    "You have not added one of the three required fields, cannot process data.",
            });
        }
    });
    app.route("*").get(notFound);
};

function selectGet(measure, value) {
    if (measure == "vitamin_d3") {
        return getVitamin_d3_level(value);
    } else if (measure == "vitamin_b12") {
        return getVitamin_b12_level(value);
    } else if (measure == "cholesterol") {
        return getCholesterol_level(value);
    } else if (measure == "blood_sugar") {
        return getBlood_sugar_level(value);
    } else if (measure == "iron") {
        return getIron_level(value);
    }
}

function getVitamin_d3_level(vitamin_d3) {
    if (vitamin_d3 > 150) {
        return "High";
    } else if (vitamin_d3 >= 30) {
        return "Normal";
    } else if (vitamin_d3 > 0) {
        return "Low";
    }
}

function getVitamin_b12_level(vitamin_b12) {
    if (vitamin_b12 > 925) {
        return "High";
    } else if (vitamin_b12 >= 160) {
        return "Normal";
    } else if (vitamin_b12 > 0) {
        return "Low";
    }
}

function getCholesterol_level(cholesterol) {
    if (cholesterol >= 200) {
        return "High";
    } else if (cholesterol < 200 && cholesterol > 0) {
        return "Normal";
    }
}

function getBlood_sugar_level(blood_sugar) {
    if (blood_sugar > 110) {
        return "High";
    } else if (blood_sugar >= 70) {
        return "Normal";
    } else if (blood_sugar > 0) {
        return "Low";
    }
}

function getIron_level(iron) {
    if (iron > 150) {
        return "High";
    } else if (iron >= 60) {
        return "Normal";
    } else if (iron > 0) {
        return "Low";
    }
}

function createQuery(body) {
    var query = `INSERT INTO bloodtest (
      amka, test_date, medical_center,
      blood_sugar, blood_sugar_level,
      cholesterol, cholesterol_level,
      iron, iron_level,
      vitamin_d3, vitamin_d3_level,
      vitamin_b12, vitamin_b12_level) VALUES (
      '${body.amka}', '${body.test_date}', '${body.medical_center}',
      ${
          typeof body.blood_sugar == "undefined"
              ? "null"
              : "'" + body.blood_sugar + "'"
      },
      ${
          typeof body.blood_sugar == "undefined"
              ? "null"
              : "'" + getBlood_sugar_level(body.blood_sugar) + "'"
      },
      ${
          typeof body.cholesterol == "undefined"
              ? "null"
              : "'" + body.cholesterol + "'"
      },
      ${
          typeof body.cholesterol == "undefined"
              ? "null"
              : "'" + getCholesterol_level(body.cholesterol) + "'"
      },
      ${typeof body.iron == "undefined" ? "null" : "'" + body.iron + "'"},
      ${
          typeof body.iron == "undefined"
              ? "null"
              : "'" + getIron_level(body.iron) + "'"
      },
      ${
          typeof body.vitamin_d3 == "undefined"
              ? "null"
              : "'" + body.vitamin_d3 + "'"
      },
      ${
          typeof body.vitamin_d3 == "undefined"
              ? "null"
              : "'" + getVitamin_d3_level(body.vitamin_d3) + "'"
      },
      ${
          typeof body.vitamin_b12 == "undefined"
              ? "null"
              : "'" + body.vitamin_b12 + "'"
      },
      ${
          typeof body.vitamin_b12 == "undefined"
              ? "null"
              : "'" + getVitamin_b12_level(body.vitamin_b12) + "'"
      }
    );`;

    // getVitamin_d3_level(body.vitamin_d3);
    // getVitamin_b12_level(body.vitamin_b12);
    // getCholesterol_level(body.cholesterol);
    // getBlood_sugar_level(body.blood_sugar);
    // getIron_level(body.iron);
    return query;
}
