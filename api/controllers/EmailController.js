const { send_mail } = require("../middleware/Email.js");
const { validator } = require("../utils.js");
const jwt = require("../middleware/Jwt.js");

require("dotenv").config();

module.exports = {
  get_mail: function (req, res) {},

  send_mail: async function (req, res) {
    let validated = validator(req.body, {
      to: "string|required",
      subject: "string|required",
      content: "string|required",
    });
    if (validated.failsSize > 0) return res.status(403).json(validated.fails);

    send_mail(res, validated.to, validated.subject, validated.content);
  },

  reset_password: function (req, res) {
    let validated = validator(req.body, { email: "string|required" });

    if (validated.errors != undefined)
      return res.status(400).json(validated.errors);

    // Generate email token to verify for next step
    const user = { email: validated.email };
    const token = jwt.generateToken(user, true);

    // Build email content
    let email = {
      to: validated.email,
      subject: "Reset password",
      text:
        'Cliquer <a href="http://localhost:8080/authentication?mail_service=' +
        token +
        '&type=reset_password">ici</a> pour réinitialisé votre mot de passe',
    };

    // Send email when send return response
    send_mail(res, email, token);
  },
};
