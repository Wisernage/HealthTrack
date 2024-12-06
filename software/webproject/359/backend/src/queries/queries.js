const QUERIES = {
    SELECT_USERS: "SELECT * FROM users",
    SELECT_USER: "SELECT * FROM users WHERE user_id = ?",
    SELECT_DOCTORS: "SELECT * FROM doctors",
    SELECT_DOCTOR: "SELECT * FROM doctors WHERE doctor_id = ?",
    SELECT_CERTIFIED_DOCTORS: "SELECT * FROM doctors WHERE certified = 1",
    FIND_USER: "SELECT * FROM users WHERE username = ? AND password = ?",
    FIND_DOCTOR: "SELECT * FROM doctors WHERE username = ? AND password = ?",
    SELECT_RANDEVOUZ_DOCTOR: "SELECT * FROM randevouz WHERE doctor_id = ?",
    SELECT_RANDEVOUZ__DAY:
        "SELECT * FROM randevouz WHERE CAST(date_time as DATE) = CAST(? as DATE) AND doctor_id = ?",
    DELETE_DOCTOR: "DELETE FROM doctors WHERE doctor_id = ?",
    DELETE_USER: "DELETE FROM users WHERE user_id = ?",
    CERTIFY_DOCTOR: "UPDATE doctors SET certified = 1 WHERE doctor_id = ?",
    SELECT_BLOODTESTS_BY_AMKA: "SELECT * FROM bloodtest WHERE amka = ?",
    SELECT_TREATMENT_BY_USER: "SELECT * FROM treatment WHERE user_id = ?",
};
module.exports = QUERIES;
