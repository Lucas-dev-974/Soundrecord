require('dotenv').config()
const express    = require('express')
const cors       = require("cors");

const apiRouter = require('./ApiRouter').router
const JwtMidle  = require('./middleware/Jwt').isAuthorized

// Server params
const port        = process.env.SERVER_PORT
const corsOptions = {
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
} 

// Instanciate server
const server     = express()

// Setup Middleware

server.use(cors(corsOptions))
server.use(JwtMidle)

server.use(express.json());
server.use(express.urlencoded({extended: true}))

// Handle Api Routes
server.use('/api/', apiRouter)

server.listen(port, () => console.log('Server Started on http://localhost:' + port))