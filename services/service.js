const express = require("express")
const AuthenticationRoute = require("../routers/Authentication.routes")

const API_SERVER = express()

API_SERVER.use("/auth",AuthenticationRoute)

module.exports = API_SERVER;