const { DefaultStoragePath } = require("../middleware/MulterFileManager.js");
const { validator } = require("../utils.js");
const fs = require("fs");

module.exports = {
  getAudio: function (req, res) {
    // TODO: BUGFIX - validator to take only one rule
    // const validated = validator(req.params, {
    //   id: "required",
    // });
    const validated = req.params;

    if (validator.errors) return res.status(403).json(validator.errors);

    let filePath;

    if (validated.id == "default") {
      filePath = DefaultStoragePath() + "audio.jpg";
    }

    if (!fs.existsSync(filePath))
      return res
        .status(403)
        .json({ error: "Une erreur s'est produite avec le fichier" });

    return res.sendFile(filePath);
  },

  
};
