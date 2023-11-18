const express = require("express")
const API_SERVER = require("./services/service")
const bodyParser = require("body-parser")
const  configDotenv  = require("dotenv")
const CORS = require("cors")

configDotenv.config();

const {init} = require("./dbConfig")

init()

const HTTP_SERVER = express()

HTTP_SERVER.use(CORS({
    origin:["http://localhost:3000"],
    methods:['PUT','POST']
}))

HTTP_SERVER.use(bodyParser.json())
HTTP_SERVER.use(bodyParser.urlencoded({ extended: true }))

// parse application/json


const PORT = 5000

HTTP_SERVER.listen(PORT,process.env.NODE_HOSTNAME,()=>{
    console.log(`listening to request on the port ${PORT}`)
})

HTTP_SERVER.use("/api",API_SERVER)
