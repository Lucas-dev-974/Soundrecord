const models = require("../models");
const bcrypt = require("bcrypt");

const path = require("path");
const fs = require("fs");
const stream = require("stream");
const { GetPagination, validator } = require("../utils.js");
const jwt = require("../middleware/Jwt.js");
const { haveModeratorAccess } = require('../middleware/Administration')

const self = (module.exports = {
  get: async function (req, res) {
    let user;
    
    if(!req.user){
      const validated = validator(req.params, { pseudo: "string|required" })
      if(validated.errors) return res.status(403).json(validated.errors)
      user = await models.User.findOne({where: { pseudo: validated.pseudo }})

    }else{
      user = await models.User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ["updatedAt", "createdAt", "password"] },
      });
    }

    user.dataValues.followers = await user.followers(models)
    // * TODO do the count of music created !
    user.dataValues.totalProductions = await user.getCountOfProductions(models)

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
    }else return res.status(401).json({message: "Vous n'avez pas accès à c'est information"})
  },

  update: async function (req, res) {
    const user = await models.User.findOne({ where: { id: req.params.id } });
    if(!user) return res.status(404).json({message: "L'utilisateur n'existe pas."})

    const validated = validator(req.body, {
      name: "string",
      email: "string",
      password: "string",
      facebook_link: "string",
      instagram_link: "string",
      public: "boolean",
    });
    
    let updated = false
    if (!validated.errors) {
      Object.entries(validated).forEach(async data => {
        user.set(data[0], data[1]);
        await user.save();
        updated = true
      });
    }

    if(!updated && Object.keys(validated).length != 0) return res.status(400).json({
      message: "Une erreur est survenue: le champs sur lequel une mise à jour est demander possiblement non existant"
    })
    return res.status(200).json(req.body);
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
    // Check if file is autorized, Setting up in MulterMiddleware
    if (!req.AutorizedFile || !req.Isimage)
      return res.status(403).json({
        error: "Un fichier de type .png - .jpg - .jpeg est attendu !",
      });

    console.log(req.fileInfos);
    let user = await models.User.findByPk(req.user.id);
    user.set("picture", req.fileInfos.originalname);
    await user.save();

    return res.status(200).json();
  },

  returnImage: function(filePath){
    if (!fs.existsSync(filePath)) return false

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
    let userid = req.query.pseudo ?? req.user ? req.user.pseudo : null;
    let picture_dir;

    if (userid == null) return res.status(404).json({message: "Veuillez spécifié le pseudo d'un utilisateur", user: req.user})
    const user = await models.User.findOne({  where: { pseudo: userid } });
    if(!user) return res.status(404).json({message: "user doesnt exist"})

    picture_dir = "../public/user-" + userid + "/picture/" + user.dataValues.picture.replace(/ /g, "")
    if (!fs.existsSync(picture_dir)) picture_dir = "../public/default/defaultUserPicture.png"
    if (!fs.existsSync(picture_dir)) return res.status(404).json({message: "Le fichier n'a pas été retrouver."})

    picture_dir = path.resolve(__dirname, picture_dir);
    this.returnImage(picture_dir)
  },

  get_creators: async function (req, res) {
    const exclude_fields = { exclude: ["updatedAt", "createdAt", "password"] };
    console.log("okok");
    // Get public creators
    let creators = await models.User.findAll({
      where: { public: true },
      attributes: { ...exclude_fields },
    }).catch((error) => console.log(error));
    creators.rows.forEach(
      (creator, key) => (creators.rows[key] = creator.dataValues)
    );
    console.log(creators);
    // Get like's and return response
    creators = await self.get_likes(creators);
    console.log(creators);
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
    if (validated.validated.password != validated.validated.password_confirmation)
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
