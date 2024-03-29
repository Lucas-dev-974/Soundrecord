const models = require("../models");
const bcrypt = require("bcrypt");

const path = require("path");
const fs = require("fs");
const stream = require("stream");
const {
  GetPagination,
  validator,
  manageCatchErrorModel,
} = require("../utils.js");
const jwt = require("../middleware/Jwt.js");
const { haveModeratorAccess } = require("../middleware/Administration");

const self = (module.exports = {
  get: async function (req, res) {
    let user;

    if (!req.user) {
      const validated = validator(req.params, { pseudo: "string|required" });
      if (validated.errors) return res.status(403).json(validated.errors);
      user = await models.User.findOne({ where: { pseudo: validated.pseudo } });
    } else {
      user = await models.User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["updatedAt", "createdAt", "password"] },
      });
    }

    if (!user)
      return res
        .status(404)
        .json({ message: "L'uttilisateur n'a pas été trouver" });
    user.dataValues.followers = await user.followers(models);

    user.dataValues.totalProductions = (
      await user.getCountOfProductions(models)
    ).count;

    if (!user) return res.status(404).json("L'utilisateur n'existe pas.");
    return res.status(200).json(user);
  },

  all: async function (req, res) {
    let users = null;
    let { page, size } = req.query;
    const { limit, offset } = GetPagination(page, size);

    if (haveModeratorAccess(req)) {
      users = await models.User.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt", "password", "roleid"],
        },
        limit: limit,
        offset: offset,
      });

      return res.status(200).json(users);
    } else
      return res
        .status(401)
        .json({ message: "Vous n'avez pas accès à c'est information" });
  },

  update: async function (req, res) {
    const user = await models.User.findOne({ where: { id: req.params.id } });
    if (!user)
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });

    if (req.user.id != user.dataValues.id)
      return res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé à faire cet action." });

    const validated = validator(req.body, {
      fields: "string|required",
      values: "string|required",
    });

    if (validated.errors) return res.status(200).json();

    const fields = validated.fields.split("|");
    const values = validated.values.split("|");
    console.log("IN UPDATE", validated);

    for (let i = 0; i < fields.length; i++) {
      console.log(fields[i]);
      user.set(fields[i], values[i]);
      user.save();
    }

    return res.status(200).json(user);
  },

  delete: async function (req, res) {
    let validated = validator.validate(req.body, { userid: "int" });
    if (validated.errors) return res.status(400).json(validated);
    let user = await models.User.findByPk(validated.userid).catch((error) => {
      console.log(error);
    });
    if (!user)
      return res
        .status(400)
        .json({ error: "il s'emblerais que l'utilisateur n'existe pas !" });
    try {
      await user.destroy();
    } catch (error) {
      console.log(error);
    }

    return res.status(200).json();
  },

  upload: async function (req, res) {
    // if (!req.AutorizedFile || !req.Isimage)
    //   return res.status(403).json({
    //     error: "Un fichier de type .png - .jpg - .jpeg est attendu !",
    //   });

    const user = await models.User.findByPk(req.user.id);
    console.log("PICTURE FILENAME", req.filename);
    user.set("picture", req.filename);
    user.save();
    return res.status(200).json();
  },

  returnImage: function (res, filePath) {
    if (!fs.existsSync(filePath))
      return res
        .status(403)
        .json({ message: "Une erreur est survenue l'image n'existe pas" });

    const filereader = fs.createReadStream(filePath);
    const ps = new stream.PassThrough(); // Handle error during stream

    stream.pipeline(filereader, ps, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Une erreur est survenue veuillez réesayer plus tard",
        });
      }
    });

    ps.pipe(res);
  },

  picture: async function (req, res) {
    const validated = validator(req.query, { pseudo: "string|required" });
    if (validated.errors) return res.status(403).json(validated.errors);

    const user = await models.User.findOne({
      where: { pseudo: validated.pseudo },
    }).catch((error) => {
      return manageCatchErrorModel(res, error);
    });

    if (!user) return res.status(404).json({ message: "user doesnt exist" });

    let filePath;
    if (!user.dataValues.picture)
      filePath = path.resolve(__dirname, "../public/default-user-picture.png");
    else
      filePath = path.resolve(
        __dirname,
        "../public/" + user.dataValues.picture
      );

    self.returnImage(res, filePath);
  },

  get_creators: async function (req, res) {
    const exclude_fields = { exclude: ["updatedAt", "createdAt", "password"] };

    // Get public creators
    let creators = await models.User.findAll({
      where: { public: true },
      attributes: { ...exclude_fields },
    }).catch((error) => console.log(error));
    creators.rows.forEach(
      (creator, key) => (creators.rows[key] = creator.dataValues)
    );
    // Get like's and return response
    creators = await self.get_likes(creators);
    return res.status(200).json(creators);
  },

  get_likes: function (creators) {
    return new Promise((resolve, reject) => {
      creators.rows.forEach(async (creator, key) => {
        const likes = await models.Liked.findAll({
          where: { model: "creator", modelid: creator.id },
        }).catch((error) => console.log(error));
        creators.rows[key]["likes"] = likes.count;
        if (key + 1 == creators.rows.length) resolve(creators);
      });
    });
  },

  reset_password: async function (req, res) {
    let validated = validator(req.body, {
      _token_: "string|required",
      password: "string|required",
      password_confirmation: "string|required",
    });

    if (validated.errors) return res.status(403).json(validated.fails);

    // Check if password and password confirmation is identic
    if (
      validated.validated.password != validated.validated.password_confirmation
    )
      return res
        .status(403)
        .json({ error: "Les mot de passe ne corresponde pas !" });

    // Check if token is valid and get token data
    let token = jwt.checkToken(validated.validated._token_);
    if (token.error) return res.status(403).json(token);

    console.log(token);

    let user = await models.User.findOne({
      where: { email: token.email },
    }).catch((error) => {
      console.log(error);
    });

    if (!user)
      return res.status(404).json({
        error: "Désolé cet email n'est pas enregistrer dans nos services",
      });
    const password = bcrypt.hashSync(
      validated.validated.password,
      bcrypt.genSaltSync(8)
    );

    try {
      user.password = password;
      user.save();
      return res.status(200).json({ infos: "Mot de passe modifier" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Désolé une erreur est survenue !" });
    }
  },
});
