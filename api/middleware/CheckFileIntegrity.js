const fs = require("fs");
const wav = require("wav");
const NodeID3 = require("node-id3");

const validateWav = (req, res, next) => {
  if (req.Isaudio && req.fileext === ".wav") {
    const filePath = req.filePath;
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        req.fileIntegrity = false;
        return next();
      }
      console.log(req.fileIntegrity);
      try {
        const reader = new wav.Reader();
        reader.on("error", (err) => {
          req.fileIntegrity = false;
        });
        reader.on("format", (format) => {});
        reader.end(data);
        req.fileIntegrity = true;
      } catch (error) {
        req.fileIntegrity = false;
      }

      next();
    });
  } else {
    next();
  }
};

const validateMp3 = (req, res, next) => {
  if (req.Isaudio && req.fileext === ".mp3") {
    const filePath = req.filePath;

    fs.readFile(filePath, (err, data) => {
      if (err) {
        req.fileIntegrity = false;
        return next();
      }

      const tags = NodeID3.read(data);
      if (!tags) {
        req.fileIntegrity = false;
      } else {
        req.fileIntegrity = true;
      }

      next();
    });
  } else {
    req.fileIntegrity = req.fileIntegrity ?? false;
    console.log("file integrity:", req.fileIntegrity);
    next();
  }
};

exports.CheckWavFileIntegrity = validateWav;
exports.CheckMp3FileIntegrity = validateMp3;
