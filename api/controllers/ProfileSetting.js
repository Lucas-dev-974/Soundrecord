// Default setting: bannerbg - bannercolor - show{profile}: name, email...

const path = require("path");
const models = require("../models");
const { validator, manageCatchErrorModel } = require("../utils.js");
const htmlspecialchars = require("htmlspecialchars");

require("dotenv").config();

const self = (module.exports = {
  get: async function (req, res) {
    const validated = validator(req.query, {
      pseudo: "string|required",
    });

    if (validated.errors) return res.status(403).json(validated.errors);

    let attributes = { exclude: ["password", "email", "updatedAt"] };
    let isMyProfile = false;

    if (req.user && req.user.pseudo == validated.pseudo) {
      isMyProfile = true;
    }

    const user = await models.User.findOne({
      where: { pseudo: validated.pseudo },
      attributes: attributes,
    }).catch((error) => {
      return manageCatchErrorModel(error);
    });
    if (!user)
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });

    user.dataValues.followers = await user.followers(models);
    user.dataValues.tracks = await user.tracks(
      models,
      isMyProfile ? {} : { public: user.dataValues.public }
    );
    user.dataValues.sessions = await user.sessions(
      models,
      isMyProfile ? {} : { public: user.dataValues.public }
    );
    user.dataValues.playlists = await user.playlists(
      models,
      isMyProfile ? {} : { public: user.dataValues.public }
    );

    console.log("USER PROFILE:", user.dataValues.picture);
    return res.status(200).json(user);
  },

  all: async function (req, res, next, userid = null) {
    const userID = req.user.id;

    const user = models.User.findOne({ where: { id: userID } }).catch((error) =>
      console.log(error)
    );
    if (!user)
      return res.status(403).json({ error: "L'utilisateur n'existe pas" });

    const settings = await models.ProfileSettings.findAll({
      where: { userid: userID },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    }).catch((error) => console.log(error));

    const likes = await models.Like.findAll({
      where: { model: "creator", modelid: userID },
    });

    _settings = [
      ...settings,
      { setting_name: "likes", setting_value: likes.count },
    ];

    if (userid) return _settings;
    return res.status(200).json(_settings);
  },

  update: async function (req, res) {
    let validated = validator(req.body, {
      setting_name: "string",
      value: "string",
    });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    let setting = await models.ProfileSettings.findOne({
      where: {
        userid: req.user.id,
        setting_name: validated.setting_name,
      },
    });

    if (!setting)
      setting = await models.ProfileSettings.create({
        userid: req.user.id,
        setting_name: validated.setting_name,
        setting_value: validated.value,
      });
    else {
      setting.setting_value = validated.value;
      setting = await setting.save();
    }
    res.status(200).json(setting);
  },

  upload: async function (req, res) {
    if (!req.Isimage)
      return res.status(403).json({ error: "Désoler une image est requise !" });

    let banner_img = await models.ProfileSettings.findOne({
      where: { setting_name: "banner-img", userid: req.user.id },
    }).catch((error) => {
      console.log(error);
    });
    if (!banner_img) {
      banner_img = await models.ProfileSettings.create({
        setting_name: "banner-img",
        setting_value: "banner",
        userid: req.user.id,
      }).catch((error) => {
        console.log(error);
      });
    } else {
      banner_img.setting_value = req.filename;
      banner_img.save();
    }

    return res.status(200).json(banner_img.dataValues);
  },

  getProfile: async function (req, res) {
    // Return user infos
    let userid = req.query.userid
      ? htmlspecialchars(req.query.userid)
      : req.user.id;
    if (!userid || isNaN(userid))
      return res.status(403).json({ error: "Aucun identifiant fournie !" });

    let hide_fields = [];
    let settings = await self.all(null, null, null, userid);

    let like = null;
    // Get Like
    if (req.user) {
      like = await models.Like.findAll({
        where: { userid: req.user.id, model: "creator", modelid: userid },
        attributes: { exclude: ["userid"] },
      }).catch((error) => {
        console.log(error);
      });
    }

    settings.forEach((setting, key) => {
      if (setting.dataValues) {
        if (setting.dataValues.setting_name === "hide-fields") {
          hide_fields = setting.dataValues.setting_value.split("-");
          delete settings[key];
        }
        if (setting.dataValues.setting_name === "banner-img") {
          setting.dataValues.setting_value =
            "http://localhost:3000/api/profile/banner?userid=" + userid;
        }
      }
    });

    const user = await models.User.findOne({
      where: { id: userid },
      attributes: {
        exclude: ["password", "updatedAt", "createdAt", ...hide_fields],
      },
    }).catch((error) => console.log(error));

    return res.status(200).json({
      creator: user,
      settings: [...settings],
      like: like.length,
    });
  },

  //TODO: review this method
  // banner_image: async function (req, res) {
  //   let user_id;
  //   if (req.query.userid) user_id = req.query.userid;
  //   else user = req.user.id;
  //   //Search if client have registered banner image
  //   const picture = await models.ProfileSettings.findOne({
  //     where: { userid: user_id, setting_name: "banner-img" },
  //     attributes: ["setting_value"],
  //   }).catch((error) => console.log(error));

  //   if (picture != null) {
  //     let picture_dir =
  //       path.resolve(__dirname, "../public/user-") +
  //       user_id +
  //       "/banner/" +
  //       picture.dataValues.setting_value.replace(/ /g, "");
  //     const filereader = fs.createReadStream(picture_dir);
  //     const ps = new stream.PassThrough(); // Handle error during stream

  //     stream.pipeline(filereader, ps, (err) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(400).json({
  //           error: "Une erreur est survenue veuillez réesayer plus tard",
  //         });
  //       }
  //     });
  //     ps.pipe(res);
  //   }
  // },

  // TODO: review this to
  delete_banner: async function (req, res) {
    let banner_img = await models.ProfileSettings.findOne({
      where: { setting_name: "banner-img", userid: req.user.id },
    });

    const StoragePath =
      path.resolve(__dirname, "..") +
      "/public/user-" +
      req.user.id +
      "/banner/" +
      banner_img.dataValues.setting_value;

    if (banner_img) {
      banner_img.destroy();
      banner_img.save();
      return res.status(200).json();
    } else return res.status(403).json({ error: "une erreur est survenue" });
  },
});
