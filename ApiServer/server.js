require('dotenv').config()

const express    = require('express')
const cors       = require("cors");

const apiRouter    = require('./apiRotuer').router
const UploadsMidle = require('./middleware/UploadsMid').upload
const JwtMidle     = require('./middleware/Jwt').isAuthorized

// Server params
const port        = process.env.SERVER_PORT
const corsOptions = {
    origin: process.env.CORS_OPTIONS_ORIGIN
} 


// Instanciate server
const server     = express()
server.use(cors(corsOptions));

// Tell to the serve we want parse json and url-encoded from request
server.use(express.json());
server.use(express.urlencoded({extended: true}));


// Setup Middleware
server.use(JwtMidle)
server.use(UploadsMidle)

// Handle Api Routes
server.use('/api/', apiRouter)

server.listen(port, () => console.log('Server Started on http://localhost:' + port))