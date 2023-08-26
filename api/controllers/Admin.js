const { validator, exclude, manageCatchErrorModel } = require("../utils.js");
const models = require("../models");

module.exports = {
  users: async function(req, res){
    const users = await models.User.findAll({
      attirbutes: {exclude: ["password"]}
    }).catch(error => {return manageCatchErrorModel(error)})

    return res.status(200).json(users)
  },

  

  getUserComments: function(req, res){},

  signaledComments: function(req, res){},

  disableComment: function(req, res){},

  deactivateUserAccount: function(req, res){},

  sendMessageToUser: function (req, res) {},

  sendResetPasswordLink: function (req, res) {},
};
