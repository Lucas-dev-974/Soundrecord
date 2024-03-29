require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { publicPath } = require("./middleware/PublicPath");
const { checkPagingParams } = require("./middleware/Paging");
const Administration = require("./middleware/Administration");
const router = require("./api-routes").router;
const adminRoutes = require("./routes/admin.routes").router;

const JwtMidle = require("./middleware/Jwt").isAuthorized;
// Server params
const port = process.env.SERVER_PORT;

// Instanciate server
const server = express();
server.use(cors());
server.use(cors());
server.use(JwtMidle);
server.use(Administration.checkAutority);
server.use(publicPath);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(checkPagingParams);

server.use("/api/", router);
server.use("/api/admin/", adminRoutes);

server.listen(port, () => console.log("http://localhost:" + port));
