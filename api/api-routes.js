const express = require("express");

// Controllers
const AuthController = require("./controllers/Authentication");
const SessionController = require("./controllers/Session");
const AudioController = require("./controllers/Audio");
const UserController = require("./controllers/User");
const ProfileSetting = require("./controllers/ProfileSetting");
const Liked = require("./controllers/Liked");
const Search = require("./controllers/Search");

// Middleware
const MulterFilesManager = require("./middleware/MulterFileManager");
const EmailController = require("./controllers/EmailController");
const CheckFileIntegrity = require("./middleware/CheckFileIntegrity");
const { checkAutority } = require("./middleware/Administration");

exports.router = (() => {
  let router = express.Router();

  // Authentications routes
  router.route("/auth").patch(AuthController.register);
  router.route("/auth").post(AuthController.login);
  router.route("/auth").get(AuthController.checkToken); // Test le token

  // Users route
  router.route("/users").get(checkAutority, UserController.all);
  router.route("/user/:id").get(checkAutority, UserController.get);
  router.route("/user").get(checkAutority, UserController.get);
  router.route("/user/:id").patch(checkAutority, UserController.update);
  router.route("/user").delete(checkAutority, UserController.delete);
  router
    .route("/user/reset-password")
    .put(checkAutority, UserController.reset_password);
  // Creators
  router.route("/creators").get(UserController.get_creators);

  // User picture
  // router
  //   .route("/picture")
  //   .post(
  //     MulterFilesManager.upload.single("profile_picture"),
  //     UserController.upload
  //   );
  // router.route("/picture/").get(UserController.picture);

  // Profile routes
  // router.route("/profile").get(ProfileSetting.getProfile);
  // router.route("/profile/banner").get(ProfileSetting.banner_image);

  // Profile Setting
  // router
  //   .route("/profile-setting/banner-upload")
  //   .post(
  //     MulterFilesManager.upload.single("banner-img"),
  //     ProfileSetting.upload
  //   );
  // router
  //   .route("/profile-setting/banner-img")
  //   .delete(ProfileSetting.delete_banner);
  // router.route("/profile-setting").get(ProfileSetting.get);
  // router.route("/profile-settings").get(ProfileSetting.all);
  // router.route("/profile-setting").patch(ProfileSetting.update);

  // Sessions routes
  router.route("/session").post(SessionController.create);
  router.route("/sessions").get(SessionController.all);
  router.route("/session/:sessionid").get(SessionController.get);
  router.route("/session/:id").delete(SessionController.delete);
  router.route("/session").patch(SessionController.update);
  router
    .route("/session/import-in")
    .post(
      MulterFilesManager.upload.single("audio"),
      CheckFileIntegrity.CheckWavFileIntegrity,
      SessionController.importIn
    );
  router
    .route("/session/import-from-library")
    .post(SessionController.importInFromLibrary);

  // Pists routes

  router.route("/store").get(AudioController.store);
  router.route("/library").get(AudioController.library);
  router.route("/audio/:id").get(AudioController.get);
  router
    .route("/audio")
    .post(
      MulterFilesManager.upload.single("audio"),
      CheckFileIntegrity.CheckWavFileIntegrity,
      CheckFileIntegrity.CheckMp3FileIntegrity,
      AudioController.Import
    );
  router.route("/audio/:id").delete(AudioController.delete);
  router.route("/audio").patch(AudioController.update);

  // session_track
  // router
  //   .route("/where/session_track")
  //   .get(AudioController.checkWherePistIsImported);
  // router.route("/session_track/:sessionid").get(AudioController.getImported);
  // router.route("/session_track").patch(AudioController.UpdatePist);
  // router.route("/session_track").post(AudioController.importInFromPistID);
  // router.route("/session_track/:pistid").delete(AudioController.deleteIn);

  // // Liked routes
  // router.route("/like").get(Liked.get);
  // router.route("/like").post(Liked.like);

  // // Search routes
  // router.route("/search/sessions").post(Search.SearchSession);
  // router.route("/search/pists").post(Search.SearchImport);
  // router.route("/search/users").post(Search.SearchUser);

  // Mail routes
  // router.route("/mail/password-reset").post(EmailController.reset_password);
  return router;
})();
