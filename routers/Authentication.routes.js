const express = require("express");
const { createUser, emailVerification, resetPassword, validateEmail, verify, } = require("../controllers/Authentication.controller");
const Authentication = require("../middlewares/Authentication");

const AuthenticationRoute = express.Router()

AuthenticationRoute.post("/signup",createUser)
AuthenticationRoute.post("/signin",emailVerification)
AuthenticationRoute.post("/resetpassword",resetPassword)
AuthenticationRoute.post("/verify",verify)
module.exports = AuthenticationRoute