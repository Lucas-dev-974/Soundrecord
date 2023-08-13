const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER_EMAIL,
    pass: process.env.MAIL_USER_PASSWORD,
  },
});

module.exports = {
  send_mail: function (res, email) {
    message = {
      from: process.env.MAIL_USER_EMAIL,
      to: email.to,
      subject: email.subject,
      text: email.text,
    };

    console.log(message);

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ error: "Une erreur est survenue." });
      } else {
        return res.status(200).json({ infos: "Mail envoyé" });
      }
    });
  },
};
