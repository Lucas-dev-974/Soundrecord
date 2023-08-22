const multer = require("multer");
const path = require("path");
const fs = require("fs");

const StoragePath = (userID) =>
  path.resolve(__dirname, "..") + "/public/user-" + userID + "/";

const DefaultStoragePath = () =>
  path.resolve(__dirname, "..") + "/public/default/";

exports.StoragePath = (userID) => StoragePath(userID);
exports.DefaultStoragePath = DefaultStoragePath;
/**
 * @summary Storage fonction allow to define where to save file in fonction of req.path
 */
const storage = multer.diskStorage({
  /**
   * @summary Destination function allow to define the folder of the file
   * @param {Request} req
   * @param {File} file
   * @param {Function} cb
   */
  destination: async (req, file, cb) => {
    // Location to import all file for the user
    let folder_file = StoragePath(req.user.id);
    req.folder_file = folder_file;

    req.fileInfos = file;
    req.fileInfos["date"] = Date.now();

    // If the folder does'nt exist create one
    if (!fs.existsSync(folder_file))
      fs.mkdirSync(folder_file, { recursive: true });
    cb(null, folder_file);
  },

  /**
   * @summary in this i define:
   *  - "filename" for the database (req.filename)
   *  - "filePath" for check file integrity (req.filePath)
   *  - ""
   * @param {Request} req
   * @param {File} file
   * @param {Function} cb
   */
  filename: (req, file, cb) => {
    const name = file.originalname.replace(/ /g, "");
    req.filename = name;
    req.filePath = req.folder_file + req.fileInfos.date + "-" + name;
    req.fileSrc = "user-" + req.user.id + "/" + name;
    cb(null, req.fileInfos.date + "-" + name);
  },
});

exports.upload = multer({
  /**
   * @summary This fontion allow to filter the file via it extension
   * @param {Request}  req
   * @param {File}     file
   * @param {Function} callback
   */
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    let extensions_img = [".jpeg", ".png", ".jpg"];
    let extensions_sng = [".mp3", ".wav"];

    req.Isaudio = false;
    req.Isimage = false;
    req.AutorizedFile = false;

    console.log(extensions_img.includes(ext), extensions_sng.includes(ext));
    // If the extension name is not included in extensions arrays
    if (extensions_img.includes(ext) || extensions_sng.includes(ext)) {
      req.AutorizedFile = true;
    } else callback(null, false); // Return an error

    if (extensions_sng.includes(ext)) {
      req.Isaudio = true;
    } else req.Isimage = true;

    req.filename = file;
    req.fileext = ext;

    callback(null, true);
  },

  storage: storage,
});
