const express = require("express");
var cors = require("cors");
const routes = require("./routes.js");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.SERVER_PORT || 3000;

const app = express();
app.use(cors());

app.use(express.json());

routes(app);

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});

// ASKISI 3.... ================================ ....

// app.delete("/bloodTestDeletion/:bloodTestID", function (req, res) {
//     var bloodTestID = req.params.bloodTestID;
//     con.query(
//         `SELECT * FROM bloodtest WHERE bloodtest_id = '${bloodTestID}';`,
//         function (error, results, fields) {
//             if (error) throw error;
//             console.log("Posted: ", results);
//             if (results.length == 0) {
//                 res.status(405);
//                 res.json({
//                     Error: "bloodTestID does not correspond to any bloodtest, cannot delete said bloodtest.",
//                 });
//             } else {
//                 var myQuery = `DELETE FROM bloodtest WHERE bloodtest_id = '${bloodTestID}';`;
//                 con.query(myQuery, function (error, results, fields) {
//                     if (error) throw error;
//                     res.status(200);
//                     res.json({
//                         Results:
//                             "Successfully deleted bloodtest with id = " +
//                             bloodTestID,
//                     });
//                 });
//             }
//         }
//     );
// });

// app.put("/bloodTest/:bloodTestID/:measure/:value", function (req, res) {
//     var bloodTestID = req.params.bloodTestID; //either a value or undefined
//     var measure = req.params.measure;
//     var value = req.params.value;
//     console.log(value);

//     if (value > 0) {
//         con.query(
//             `SELECT * FROM bloodtest WHERE bloodtest_id = '${bloodTestID}';`,
//             function (error, results, fields) {
//                 if (error) throw error;
//                 console.log("Posted: ", results);
//                 if (results.length == 0) {
//                     res.status(405);
//                     res.json({
//                         Error: "bloodTestID does not correspond to any bloodtest, cannot process data.",
//                     });
//                 } else {
//                     if (
//                         measure == "cholesterol" ||
//                         measure == "blood_sugar" ||
//                         measure == "iron" ||
//                         measure == "vitamin_b12" ||
//                         measure == "vitamin_d3"
//                     ) {
//                         var myQuery = `UPDATE bloodtest SET ${measure} = '${value}',${measure}_level = '${selectGet(
//                             measure,
//                             value
//                         )}'  WHERE bloodtest.bloodtest_id = '${bloodTestID}';`;
//                         con.query(myQuery, function (error, results, fields) {
//                             if (error) {
//                                 res.status(405);
//                                 res.json({
//                                     Error: error,
//                                 });
//                             } else {
//                                 res.status(200);
//                                 res.json({
//                                     results,
//                                 });
//                             }
//                         });
//                     } else {
//                         res.status(405);
//                         res.json({
//                             Error: "You cannot change said measurement. Please pick a valid measurement.",
//                         });
//                     }
//                 }
//             }
//         );
//     } else {
//         res.status(405);
//         res.json({
//             Error: "Value should be over 0.",
//         });
//     }
// });

// app.get("/bloodTestMeasure/:AMKA/:Measure", function (req, res) {
//     console.log("vas");
//     var amka = req.params.AMKA;
//     var measure = req.params.Measure;
//     con.query(
//         `SELECT * FROM bloodtest WHERE amka = '${amka}';`,
//         function (error, results, fields) {
//             if (error) throw error;
//             console.log("Posted: ", results);
//             if (results.length == 0) {
//                 res.status(405);
//                 res.json({
//                     Error: "AMKA does not correspond to any user, cannot process data.",
//                 });
//             } else {
//                 var myQuery = `SELECT test_date, medical_center, ${measure}, ${measure}_level FROM bloodtest WHERE amka = '${amka}';`;
//                 console.log(myQuery);
//                 con.query(myQuery, function (error, results, fields) {
//                     if (error) {
//                         res.status(405);
//                         res.json({
//                             Error: error,
//                         });
//                     } else {
//                         res.status(200);
//                         res.json({
//                             results,
//                         });
//                     }
//                 });
//             }
//         }
//     );
// });

// app.get("/bloodTests/:AMKA/", function (req, res) {
//     var amka = req.params.AMKA;
//     var fromDate = undefined;
//     var toDate = undefined;
//     if (req.query.fromDate !== undefined) {
//         fromDate = new Date(req.query.fromDate);
//     }
//     if (req.query.toDate !== undefined) {
//         toDate = new Date(req.query.toDate);
//     }
//     if (req.query.toDate !== undefined && req.query.fromDate !== undefined) {
//         if (fromDate >= toDate) {
//             res.status(422);
//             res.json({
//                 Error: "fromDate is a later date than toDate, cannot process data.",
//             });
//         }
//     }
//     con.query(
//         `SELECT * FROM bloodtest WHERE amka = '${amka}';`,
//         function (error, results, fields) {
//             if (error) throw error;
//             console.log("Posted: ", results);
//             if (results.length == 0) {
//                 res.status(405);
//                 res.json({
//                     Error: "AMKA does not correspond to any user, cannot process data.",
//                 });
//             } else {
//                 if (
//                     req.query.toDate === undefined &&
//                     req.query.fromDate === undefined
//                 ) {
//                     console.log("aaaaaa");
//                     res.status(200);
//                     res.json({
//                         results,
//                     });
//                 } else {
//                     var myQuery = `SELECT * FROM bloodtest WHERE amka = '${amka}' ${
//                         fromDate != undefined
//                             ? "AND bloodtest.test_date >= '" +
//                               req.query.fromDate +
//                               "'"
//                             : ""
//                     } ${
//                         toDate != undefined
//                             ? "AND bloodtest.test_date <= '" +
//                               req.query.toDate +
//                               "'"
//                             : ""
//                     };`;
//                     console.log(myQuery);
//                     con.query(myQuery, function (error, results, fields) {
//                         // if (error) throw error;
//                         console.log("didrun", results);
//                         res.status(200);
//                         res.json({
//                             results,
//                         });
//                     });
//                 }
//             }
//         }
//     );
//     console.log(amka);
//     console.log(fromDate);
//     console.log(toDate);
// });

// function selectGet(measure, value) {
//     if (measure == "vitamin_d3") {
//         return getVitamin_d3_level(value);
//     } else if (measure == "vitamin_b12") {
//         return getVitamin_b12_level(value);
//     } else if (measure == "cholesterol") {
//         return getCholesterol_level(value);
//     } else if (measure == "blood_sugar") {
//         return getBlood_sugar_level(value);
//     } else if (measure == "iron") {
//         return getIron_level(value);
//     }
// }

// function getVitamin_d3_level(vitamin_d3) {
//     if (vitamin_d3 > 150) {
//         return "High";
//     } else if (vitamin_d3 >= 30) {
//         return "Normal";
//     } else if (vitamin_d3 > 0) {
//         return "Low";
//     }
// }

// function getVitamin_b12_level(vitamin_b12) {
//     if (vitamin_b12 > 925) {
//         return "High";
//     } else if (vitamin_b12 >= 160) {
//         return "Normal";
//     } else if (vitamin_b12 > 0) {
//         return "Low";
//     }
// }

// function getCholesterol_level(cholesterol) {
//     if (cholesterol >= 200) {
//         return "High";
//     } else if (cholesterol < 200 && cholesterol > 0) {
//         return "Normal";
//     }
// }

// function getBlood_sugar_level(blood_sugar) {
//     if (blood_sugar > 110) {
//         return "High";
//     } else if (blood_sugar >= 70) {
//         return "Normal";
//     } else if (blood_sugar > 0) {
//         return "Low";
//     }
// }

// function getIron_level(iron) {
//     if (iron > 150) {
//         return "High";
//     } else if (iron >= 60) {
//         return "Normal";
//     } else if (iron > 0) {
//         return "Low";
//     }
// }

// function createQuery(body) {
//     var query = `INSERT INTO bloodtest (
//       amka, test_date, medical_center,
//       blood_sugar, blood_sugar_level,
//       cholesterol, cholesterol_level,
//       iron, iron_level,
//       vitamin_d3, vitamin_d3_level,
//       vitamin_b12, vitamin_b12_level) VALUES (
//       '${body.amka}', '${body.test_date}', '${body.medical_center}',
//       ${
//           typeof body.blood_sugar == "undefined"
//               ? "null"
//               : "'" + body.blood_sugar + "'"
//       },
//       ${
//           typeof body.blood_sugar == "undefined"
//               ? "null"
//               : "'" + getBlood_sugar_level(body.blood_sugar) + "'"
//       },
//       ${
//           typeof body.cholesterol == "undefined"
//               ? "null"
//               : "'" + body.cholesterol + "'"
//       },
//       ${
//           typeof body.cholesterol == "undefined"
//               ? "null"
//               : "'" + getCholesterol_level(body.cholesterol) + "'"
//       },
//       ${typeof body.iron == "undefined" ? "null" : "'" + body.iron + "'"},
//       ${
//           typeof body.iron == "undefined"
//               ? "null"
//               : "'" + getIron_level(body.iron) + "'"
//       },
//       ${
//           typeof body.vitamin_d3 == "undefined"
//               ? "null"
//               : "'" + body.vitamin_d3 + "'"
//       },
//       ${
//           typeof body.vitamin_d3 == "undefined"
//               ? "null"
//               : "'" + getVitamin_d3_level(body.vitamin_d3) + "'"
//       },
//       ${
//           typeof body.vitamin_b12 == "undefined"
//               ? "null"
//               : "'" + body.vitamin_b12 + "'"
//       },
//       ${
//           typeof body.vitamin_b12 == "undefined"
//               ? "null"
//               : "'" + getVitamin_b12_level(body.vitamin_b12) + "'"
//       }
//     );`;

//     // getVitamin_d3_level(body.vitamin_d3);
//     // getVitamin_b12_level(body.vitamin_b12);
//     // getCholesterol_level(body.cholesterol);
//     // getBlood_sugar_level(body.blood_sugar);
//     // getIron_level(body.iron);
//     return query;
// }
