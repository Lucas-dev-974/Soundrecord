const express = require('express')
const cors = require("cors");
// Server params
const port        = process.env['SERVER_port']
const corsOptions = {
    origin: process.env['CORS_OPTIONS_ORIGIN']
} 


// Instanciate server
const app     = express()
app.use(cors(corsOptions));

app.use(express.json());                      // Parsse request of content-type: application/json
app.use(express.urlencoded({extended: true}))// Parse request of content-type: application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

app.get('/get-file', (req, res) => {
    let file = fs.readFileSync(__dirname + '/medias/')
    res.setHeader('Content-Length', file.length)
    // res.
})


app.listen(port, () => console.log('Server Started on http://localhost:3000'))