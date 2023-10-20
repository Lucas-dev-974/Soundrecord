const bcrypt = require("bcrypt");
const jwt = require("../middleware/Jwt");
const models = require("../models");

const { returnFields, validator } = require("../utils.js");

module.exports = {
  /**
   * Allow user to register him on the app
   * @param {Request} req
   * @param {Response} res
   * @returns
   */
  register: async function (req, res) {
    // 1 - Validate request params required
    let validated = validator(req.body, {
      email: "string|required",
      password: "string|required",
      name: "string|required",
      pseudo: "string|required",
    });

    // If one ore more params not given return errors
    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    // 2 - Search if user email exist in db if exist return error
    let user = await models.User.findOne({
      attributes: ["email"],
      where: {
        email: validated.email,
        pseudo: "string",
      },
    }).catch((error) => console.log(error));

    if (user) {
      return res.status(403).json({
        error: "Cet email est déjà enregistrer, veuillez vous connecté !",
      });
    }

    // 3 - Hash password before registering it in database
    const password = bcrypt.hashSync(validated.password, bcrypt.genSaltSync(8));

    // 4 - Create user
    user = await models.User.create({
      name: validated.name,
      email: validated.email,
      pseudo: validated.pseudo,
      password: password,
      role: 2,
      public: false,
    }).catch((error) => {
      return { error: error };
    });

    if (user.error) {
      return res
        .status(403)
        .json(
          "Désolé une erreur est survenue veuillez ré-essayer plus tard ou nous contacter !"
        );
    }

    // 5 - Lets generate Token for the user
    const token = jwt.generateToken({
      id: user.dataValues.id,
      email: user.dataValues.email,
      role: user.dataValues.role,
    });

    // 6 - return response to user
    return res.status(200).json({
      token: token,
      user: returnFields(user.dataValues, models.User.visible()),
    });
  },

  /**
   * Allow user to login, so if user give compatible
   * pseudo/password return an JWToken with user informations
   * @param {Request} req
   * @param {Result} res
   * @returns
   */
  login: async function (req, res) {
    let validated = validator(
      req.body,
      {
        email: "string|required",
        password: "string|required",
      },
      res
    );

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    let user = await models.User.findOne({
      where: { email: validated.email },
    });

    if (!user)
      return res
        .status(403)
        .json({ errors: "Email ou mot de passe incorrecte" });

    const password = bcrypt.compareSync(validated.password, user.password);
    if (!password) {
      return res
        .status(401)
        .json({ message: "Les informations renseigner sont incorrecte." });
    }

    delete user.dataValues["password"];
    return res.status(200).json({
      user: user.dataValues,
      token: jwt.generateToken(user),
    });
  },

  /**
   * Allow client app to check if token is ever valid
   * @param {*} req
   * @param {*} res
   * @returns
   */
  checkToken: function (req, res) {
    let headerAuth = req.headers["authorization"];
    let token = jwt.parseauthorization(headerAuth);

    if (token == null)
      return res.status(401).json({ error: "Veuillez vous connectez !" });

    let validToken = jwt.checkToken(token);
    if (validToken.error)
      return res
        .status(401)
        .json({ error: "Token invalide veuillez vous reconnecté !" });

    return res.status(200).json(true);
  },

  /**
   * Create default user profile settings
   * @param {*} user_id
   * @returns
   */
  AssingDefaultProfileSettings: async function (user_id) {
    // Row show option | name: show_options | table: profile_settings | options: "email,phone,pseudo,fb,inst,name | default: "fb,inst,pseudo,email""
    const setting_fields = {
      show_fields_options: "fb,inst,name,pseudo,email",
      "banner-color": "#1E1E1E",
    };

    Object.keys(setting_fields).forEach(async (field, key) => {
      let value = Object.values(setting_fields)[key];
      await models.ProfileSettings.create({
        setting_name: field,
        setting_value: value,
        userid: user_id,
      }).catch((error) => console.log(error));
    });

    return setting_fields;
  },
};
