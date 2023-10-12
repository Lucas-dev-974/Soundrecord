require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { publicPath } = require("./middleware/PublicPath");
const { checkPagingParams } = require("./middleware/Paging");
const MediaManager = require("./middleware/MediaManager").handleMediaUrl;

const router = require("./api-routes").router;
const adminRoutes = require("./routes/admin.routes").router

const JwtMidle = require("./middleware/Jwt").isAuthorized;
// Server params
const port = process.env.SERVER_PORT;
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};


// Instanciate server
const server = express();

// ? ... Import

// Setup Middleware
server.use(cors(corsOptions));
server.use(MediaManager)
server.use(JwtMidle);
server.use(publicPath);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(checkPagingParams);

// Handle Api Routes
server.use("/api/", router);

server.use("/api/admin/", adminRoutes)

server.listen(port, () => console.log("http://localhost:" + port));
