const database = require("../config/mysql.config");
const jwt = require("jsonwebtoken");
const QUERIES = require("../queries/queries");

var users = {
    all: function (req, res) {
        database.query(QUERIES.SELECT_USERS, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json(results);
            }
        });
    },
    getAllUsersAdmin: (req, res) => {
        if (req.user_type == "admin") {
            database.query(QUERIES.SELECT_USERS, (error, results) => {
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
    getOne: function (req, res) {
        database.query(
            QUERIES.SELECT_USER,
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
    login: function (req, res) {
        database.query(
            QUERIES.FIND_DOCTOR,
            [req.body.username, req.body.password],
            (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    if (results.length == 0) {
                        database.query(
                            QUERIES.FIND_USER,
                            [req.body.username, req.body.password],
                            (error, results) => {
                                if (!results) {
                                    res.json({ error });
                                } else {
                                    if (results.length == 0) {
                                        console.log(
                                            "~~~~~No user or doctor found!~~~~"
                                        );
                                        res.json({
                                            error: true,
                                            message:
                                                "Username or Password are incorrect!",
                                        });
                                    } else {
                                        console.log("~~~~~Found User!~~~~");
                                        console.log(results[0]);
                                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
                                        res.json(
                                            loginResponse({
                                                id: results[0].user_id,
                                                firstname: results[0].firstname,
                                                lastname: results[0].lastname,
                                                user_type: "user",
                                                height: results[0].height,
                                                weight: results[0].weight,
                                                age: getAge(
                                                    results[0].birthdate
                                                ),
                                                lon: results[0].lon,
                                                lat: results[0].lat,
                                                amka: results[0].amka,
                                            })
                                        );
                                    }
                                }
                            }
                        );
                    } else {
                        console.log("~~~~~Found Doctor!~~~~");
                        console.log(results[0]);
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
                        if (results[0].certified == "0") {
                            res.json({
                                error: true,
                                message:
                                    "You are not a certified doctor yet! Please contact admin!",
                            });
                        } else {
                            res.json(
                                loginResponse({
                                    id: results[0].doctor_id,
                                    firstname: results[0].firstname,
                                    lastname: results[0].lastname,
                                    user_type: "doctor",
                                    height: results[0].height,
                                    weight: results[0].weight,
                                    age: getAge(results[0].birthdate),
                                    lon: results[0].lon,
                                    lat: results[0].lat,
                                    amka: results[0].amka,
                                })
                            );
                        }
                    }
                }
            }
        );
    },
    loginAdmin: function (req, res) {
        database.query(
            QUERIES.FIND_USER,
            [req.body.username, req.body.password],
            (error, results) => {
                if (!results) {
                    res.json({ error });
                } else {
                    if (results.length == 0) {
                        console.log("~~~~~No admin found!~~~~");
                        res.json({
                            error: true,
                            message: "Username or Password are incorrect!",
                        });
                    } else if (results[0].username == "admin") {
                        console.log("~~~~~Found admin!~~~~");
                        console.log(results[0]);
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
                        res.json(
                            loginResponse({
                                id: results[0].user_id,
                                firstname: results[0].firstname,
                                user_type: "admin",
                                height: results[0].height,
                                weight: results[0].weight,
                                age: getAge(results[0].birthdate),
                                lon: results[0].lon,
                                lat: results[0].lat,
                                amka: results[0].amka,
                            })
                        );
                    } else {
                        console.log("~~~~~Found User but not admin~~~~");
                        res.json({
                            error: true,
                            message: "Username or Password are incorrect!",
                        });
                    }
                }
            }
        );
    },
    getSelf: function (req, res) {
        database.query(
            req.user_type == "user"
                ? QUERIES.SELECT_USER
                : QUERIES.SELECT_DOCTOR,
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
    updateProfile: function (req, res) {
        const {
            username,
            email,
            password,
            firstname,
            lastname,
            birthdate,
            gender,
            amka,
            country,
            city,
            address,
            lat,
            lon,
            telephone,
            height,
            weight,
            blooddonor,
            bloodtype,
            specialty,
            doctor_info,
        } = req.body;
        var query;
        if (req.user_type == "doctor")
            query = `UPDATE doctors
                SET email = '${email}',
                    password = '${password}',
                    firstname = '${firstname}',
                    lastname = '${lastname}',
                    gender = '${gender}',
                    country = '${country}',
                    city = '${city}',
                    address = '${address}',
                    lat = '${lat}',
                    lon = '${lon}',
                    telephone = '${telephone}',
                    height = '${height}',
                    weight = '${weight}',
                    blooddonor = '${blooddonor}',
                    bloodtype = '${bloodtype}',
                    specialty = '${specialty}',
                    doctor_info = '${doctor_info}'
                WHERE
                    doctor_id = '${req.userId}'`;
        else if (req.user_type == "user") {
            query = `UPDATE users
                SET email = '${email}',
                    password = '${password}',
                    firstname = '${firstname}',
                    lastname = '${lastname}',
                    gender = '${gender}',
                    country = '${country}',
                    city = '${city}',
                    address = '${address}',
                    lat = '${lat}',
                    lon = '${lon}',
                    telephone = '${telephone}',
                    height = '${height}',
                    weight = '${weight}',
                    blooddonor = '${blooddonor}',
                    bloodtype = '${bloodtype}'
                WHERE
                    user_id = '${req.userId}'`;
        }
        database.query(query, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json({
                    message: "Profile updated successfully!",
                });
            }
        });
    },
    register: function (req, res) {
        console.log("in here...", req.body);
        const {
            username,
            email,
            password,
            firstname,
            lastname,
            birthdate,
            gender,
            amka,
            country,
            city,
            address,
            lat,
            lon,
            telephone,
            height,
            weight,
            blooddonor,
            bloodtype,
            specialty,
            doctor_info,
            certified,
            doctor,
        } = req.body;
        var query;
        if (doctor == "1")
            query = `INSERT INTO doctors
                    ( username, email, password, firstname, lastname,
                    birthdate, gender, amka, country, city, address,
                    lat, lon, telephone,  height, weight, blooddonor,
                    bloodtype, specialty, doctor_info, certified )
                VALUES  
                    ('${username}', '${email}', '${password}', '${firstname}', '${lastname}',
                    '${birthdate}', '${gender}', '${amka}', '${country}', '${city}', '${address}',
                    '${lat}', '${lon}', '${telephone}', '${height}', '${weight}', '${blooddonor}',
                    '${bloodtype}', '${specialty}', '${doctor_info}', '0')`;
        else {
            query = `INSERT INTO user
            (username, email, password, firstname, lastname,
             birthdate, gender, amka, country, city, address,
             lat, lon, telephone, height, weight, blooddonor, bloodtype)
         VALUES  
             ('${username}','${email}', '${password}', '${firstname}', '${lastname}',
              '${birthdate}', '${gender}', '${amka}', '${country}', '${city}', '${address}',
             '${lat}', '${lon}', '${telephone}', '${height}', '${weight}', '${blooddonor}', '${bloodtype}')`;
        }
        console.log("query:", query);
        database.query(query, (error, results) => {
            if (!results) {
                res.json({ error });
            } else {
                res.json({
                    message: "Profile updated successfully!",
                });
            }
        });
    },

    deleteuser: function (req, res, next) {
        console.log(req.body);
        console.log(QUERIES.DELETE_USER);
        if (req.user_type == "admin") {
            database.query(
                QUERIES.DELETE_USER,
                [req.body.user_id],
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

function loginResponse({
    id,
    firstname,
    lastname,
    user_type,
    height,
    weight,
    age,
    lon,
    lat,
    amka,
}) {
    const payload = { id, firstname, lastname, user_type };
    const token = jwt.sign(payload, "oneSecret", {
        expiresIn: 86400, // expires in one day.
    });
    console.log("created token", token);
    return [
        {
            token,
            id,
            firstname,
            lastname,
            user_type,
            height,
            weight,
            age,
            lon,
            lat,
            amka,
        },
    ];
}

function getAge(dateString) {
    var today = new Date();
    var birthdate = new Date(dateString);
    var age = today.getFullYear() - birthdate.getFullYear();
    var m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
}

module.exports = users;
