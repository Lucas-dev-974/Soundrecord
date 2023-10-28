require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;
const models = require("../models/");

const publicRoutes = require("./public-route.json");
const validator = require("../validator");

const self = (module.exports = {
  /**
   * Generate Token valid 5 days if is not token form mailing, mailing token have 3 houre validity
   * @param {*} user
   * @param {*} mailtoken
   * @returns
   */
  generateToken: function (user, mailtoken = null) {
    console.log("JWT SECRET KEY:", JWT_SIGN_SECRET);
    if (mailtoken !== null)
      return jwt.sign(
        {
          email: user.email,
        },
        JWT_SIGN_SECRET,
        { expiresIn: "3h" }
      );
    else
      return jwt.sign(
        {
          userid: user.id,
          password: user.password,
          role: user.roleid,
        },
        JWT_SIGN_SECRET,
        { expiresIn: "5d" }
      );
  },

  /**
   * Check if Bearer is present in the Request
   * @param {*} authorization
   * @returns
   */
  parseauthorization: function (authorization) {
    if (typeof authorization == "undefined") return null;
    else return authorization.replace("Bearer ", "");
  },

  /**
   * Check if token is valid, if it is extract user informations from the token
   * Store user informations onto the Request to be accessible by controllers
   * @param {Request} req
   * @param {Response} res
   * @param {NextCallback} next
   * @returns
   */
  isAuthorized: async function (req, res, next) {
    let headerAuth = req.headers["authorization"];
    let token = module.exports.parseauthorization(headerAuth);

    // Si le token est spécifié dans l'url via http://url...?token=<token>
    if (req.query.token) token = req.query.token;
    if (token != null) {
      // Check if token is valid
      let tokenInfos = self.checkToken(token);
      if (!tokenInfos.error) {
        // Get user from database with the userid from the token
        let user = await models.User.findByPk(tokenInfos.userid).catch(
          (error) => {
            console.log(error);
            req.token = {
              error:
                "Une erreur de connexion à la base de données c'est produite.",
            };
          }
        );

        if (user) {
          // Set "req.user = user" to have information in all controller that use JWT Middleware
          req.user = {
            id: user.dataValues.id,
            email: user.dataValues.email,
            role: user.dataValues.role,
            pseudo: user.dataValues.pseudo,
          };
        }
      }
    }

    let pseudo = validator.validate(req.query, {
      userPseudo: "string",
    }).userPseudo;

    if (!pseudo && req.user && req.user.pseudo) pseudo = req.user.pseudo;

    if (req.user && pseudo == req.user.pseudo) {
      pseudo = req.user.pseudo;
      req.isMyProfile = true;
    } else req.isMyProfile = false;

    req.userPseudo = pseudo;
    if (req.user) req.token = self.checkToken(token);
    return next();
  },

  /**
   * Check if token is token delivered by this app
   * @param {*} token
   * @returns
   */
  checkToken: function (token) {
    try {
      let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
      if (jwtToken !== null) {
        return jwtToken;
      }
    } catch (err) {
      return { error: { TokenError: "Invalide" } };
    }
  },

  /**
   * Return true if  asked root is public
   * Allow bypass token verification
   * @param {*} asked_path
   * @param {*} asked_method
   * @returns
   */
  autorizeRoutes: function (asked_path, asked_method) {
    let route = asked_method + "|" + asked_path;
    if (publicRoutes.routes.includes(route)) {
      return true;
    } else return false;
  },
});
