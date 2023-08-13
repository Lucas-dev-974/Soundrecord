require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/ErrorHandler");
const { publicPath } = require("./middleware/PublicPath");

const router = require("./api-routes").router;
const JwtMidle = require("./middleware/Jwt").isAuthorized;

// Server params
const port = process.env.SERVER_PORT;
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

// Instanciate server
const server = express();

// Setup Middleware

server.use(cors(corsOptions));
server.use(JwtMidle);
server.use(publicPath);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Handle Api Routes
server.use("/api/", router);
// server.use(errorHandler);

server.listen(port, () =>
  console.log("Server Started on http://localhost:" + port)
);
