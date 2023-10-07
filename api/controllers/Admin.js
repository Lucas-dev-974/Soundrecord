const { validator, exclude, manageCatchErrorModel } = require("../utils.js");
const models = require("../models");

module.exports = {
  users: async function(req, res){
    const users = await models.User.findAll({
      attirbutes: {exclude: ["password"]}
    }).catch(error => {return manageCatchErrorModel(res, error)})

    return res.status(200).json(users)
  }, 

  // TODO To check
  getUserComments: async function(req, res){
    const validated = validator(req.params, {
      userid: "required|string"
    })

    if(validated.errors) return res.status(400).json(validated.errors)

    const comments = await models.Comment.findAndCountAll({
      where: { userid: validated.userid }
    }).catch(error => manageCatchErrorModel(error))

    return res.status(200).json(comments)
  },

  signaledComments: async function(req, res){
    const signaled = await models.SignaledComment.findAll({
      group: ['commentid']
    }).catch(error => {return manageCatchErrorModel(res, error)})

    return res.status(200).json(signaled)
  },

  disableComment: async function(req, res){
    const validated = validator(req.body, {
      commentid: 'int|required'
    })

    if(validated.errors) return res.status(400).json(validated.errors)

    const comment = models.Comment.findOne({
      where: validated
    }).catch(error => {return manageCatchErrorModel(res, error)})

    comment.set('enable', !comment.enable)
    comment.save()
    return res.status(200).json(true)
  },

  deactivateUserAccount: async function(req, res){
    const validated = validator(req.body, {
      userid: "required|int"
    })

    if(validated.errors) return res.status(400).json(validated.errors)

    const user = await models.User.findOne({
      where: { id: validated.userid }
    }).catch(error => {return manageCatchErrorModel(error)})

    user.set("enable", !user.enable)
    user.save()

    return res.status(200).json(true)
  },

  sendMessageToUser: async function (req, res) {},

  sendResetPasswordLink: async function (req, res) {},
};
