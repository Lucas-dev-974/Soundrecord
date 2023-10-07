const express = require("express");

const CommentController = require("../controllers/Comment");

exports.router = (() => {
    let router = express.Router();
  
    // Authentications routes
    router.route("/comments").patch(CommentController.mostSignaledComments);

    return router
})();
  