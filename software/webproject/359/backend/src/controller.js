"use strict";
const properties = require("../package.json");
const bloodtest = require("./service/bloodtest");
const doctors = require("./service/doctors");
const messages = require("./service/messages");
const randevouz = require("./service/randevouz");
const treatment = require("./service/treatment");
const users = require("./service/users");

//todo check status code
const HttpStatus = {
    OK: { code: 200, status: "OK" },
    CREATED: { code: 201, status: "CREATED" },
    NO_CONTENT: { code: 204, status: "NO_CONTENT" },
    BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
    NOT_FOUND: { code: 404, status: "NOT_FOUND" },
    INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

var controllers = {
    about: (req, res) => {
        var aboutInfo = {
            name: properties.name,
            version: properties.version,
        };
        res.json(aboutInfo);
    },
    login: (req, res) => {
        users.login(req, res);
    },
    loginAdmin: (req, res) => {
        users.loginAdmin(req, res);
    },
    register: (req, res) => {
        users.register(req, res);
    },
    profile: (req, res) => {
        users.getSelf(req, res);
    },
    updateProfile: (req, res) => {
        users.updateProfile(req, res);
    },
    getAllUsersAdmin: (req, res) => {
        users.getAllUsersAdmin(req, res);
    },
    getAllDoctorsAdmin: (req, res) => {
        doctors.getAllDoctorsAdmin(req, res);
    },

    showDoctors: (req, res) => {
        doctors.showDoctors(req, res);
    },
    randevouzForUser: (req, res) => {
        randevouz.randevouzForUser(req, res);
    },
    updateRandevouzForUser: (req, res) => {
        randevouz.updateRandevouzForUser(req, res);
    },
    updateRandevouzForDoctor: (req, res) => {
        randevouz.updateRandevouzForDoctor(req, res);
    },
    randevouzOfTheDay: (req, res) => {
        randevouz.randevouzOfTheDay(req, res);
    },

    deletedoctor: (req, res) => {
        doctors.deletedoctor(req, res);
    },
    deleteuser: (req, res) => {
        users.deleteuser(req, res);
    },
    certify: (req, res) => {
        doctors.certify(req, res);
    },
    getMessage: (req, res) => {
        messages.getMessage(req, res);
    },
    getContacts: (req, res) => {
        messages.getContacts(req, res);
    },
    makeContact: (req, res) => {
        messages.makeContact(req, res);
    },
    newtreatment: (req, res) => {
        treatment.newtreatment(req, res);
    },
    getTreatmentByUser: (req, res) => {
        treatment.getTreatmentByUser(req, res);
    },
    createRandevouz: (req, res) => {
        randevouz.createRandevouz(req, res);
    },

    getPatientTests: (req, res) => {
        console.log("going to bloodtests", req.body);
        bloodtest.getPatientTests(req, res);
    },

    notFound: (req, res) => {
        res.status(HttpStatus.NOT_FOUND.code);
        res.send({ errror: true, message: "API route wasn't found." });
    },
};

module.exports = controllers;
