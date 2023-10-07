const models = require("../models/");
const { validator, manageCatchErrorModel } = require("../utils.js");

module.exports = {
  Followeur: async function (req, res) {
    const validated = validator(req.query, { userid: "int|required" });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    const follows = await models.Follows.findAndCountAll({
      where: { userFollowed: 1 },
    }).catch(error => {return manageCatchErrorModel(error)});

    return res.status(200).json(follows);
  },

  // ? get all user that following me !
  Followed: async function (req, res) {
    const validated = validator(req.query, { userid: "string"});

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    const follows = await models.Follows.findAndCountAll({
      where: {
        userFolloweur: validated.userid,
      },
    }).catch(error => {return manageCatchErrorModel(error)});;

    return res.status(200).json(follows);
  },

  Follow: async function (req, res) {
    const validated = validator(req.body, { userid: "int|required" });

    if (validated.errors != undefined)
    return res.status(400).json(validated.errors);
  
    const user = await models.User.findOne({where: {id: validated.userid}})
                             .catch(error => {return manageCatchErrorModel(error)});

    if(!user) return res.status(400).json({message: "L'utilisateur n'existe pas."})

    let follow = await models.Follows.findOrCreate({
      where: {
        userFollowed: req.user.id,
        userFolloweur: validated.userid,
      },
    }).catch(error => {return manageCatchErrorModel(error)});;

      
    if (!follow[1]) {
      follow[0].destroy();
      return res.status(200).json({message: "Vous ne suivez plus"})
    }
    return res.status(200).json(follow);
  },
};
