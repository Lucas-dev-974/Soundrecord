require('dotenv').config()
const express    = require('express')
const cors       = require("cors");

const apiRouter = require('./apiRotuer').router
const JwtMidle  = require('./middleware/Jwt').isAuthorized


// Server params
const port        = process.env.SERVER_PORT
const corsOptions = {
    origin: process.env.CORS_OPTIONS_ORIGIN
} 

// Instanciate server
const server     = express()
server.use(JwtMidle)

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({extended: true}))

// Setup Middleware


// Handle Api Routes
server.use('/api/', apiRouter)

server.listen(port, () => console.log('Server Started on http://localhost:' + port))