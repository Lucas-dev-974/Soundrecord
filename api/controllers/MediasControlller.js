const path = require("path");
const { DefaultStoragePath } = require("../middleware/MulterFileManager.js");
const { validator } = require("../utils.js");
const fs = require("fs");

module.exports = {
  getAudio: function (req, res) {
    // TODO: BUGFIX - validator to take only one rule
    // const validated = validator(req.params, {
    //   id: "required",
    // });
    // if (validator.errors) return res.status(403).json(validator.errors);

    const validated = req.params;
    let filePath;

    if (validated.id == "default") {
      filePath = path.resolve(__dirname, "../public/default-audio-picture.jpg");
    }

    if (!fs.existsSync(filePath))
      return res
        .status(403)
        .json({ error: "Une erreur s'est produite avec le fichier" });

    return res.sendFile(filePath);
  },
};
