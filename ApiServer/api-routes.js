const express         = require('express')

// Controllers
const AuthController = require('./controllers/Authentication')
const SessionController = require('./controllers/Session')
const ImportController = require('./controllers/Import')
const PistController = require('./controllers/Import')
const UserController = require('./controllers/User')

// Middleware
const MulterFilesManager = require('./middleware/MulterFileManager')
const Liked = require('./controllers/Liked')
const ProfileSetting = require('./controllers/ProfileSetting')
const UnitTestController = require('./controllers/UnitTestController')
const Search = require('./controllers/Search')

exports.router = (() => {
    let router = express.Router()

    // Authentications routes
    router.route('/auth').patch(AuthController.register)
    router.route('/auth').post(AuthController.login)
    router.route('/auth').get(AuthController.checkToken)  // Test le token

    // Users route    
    router.route('/user/:id').get(UserController.get)
    router.route('/user').get(UserController.get)
    router.route('/users').get(UserController.all)
    router.route('/user').patch(UserController.update)
    router.route('/user').delete(UserController.delete)

    // User picture
    router.route('/picture').post(MulterFilesManager.upload.single('profile_picture'), UserController.upload)
    router.route('/picture/').get(UserController.picture)

    // Profile routes
    router.route('/profile').get(ProfileSetting.getProfile)
    router.route('/profile/banner-upload').post(MulterFilesManager.upload.single('banner-img'), ProfileSetting.upload)

    router.route('/profile-setting').get(ProfileSetting.get)
    router.route('/profile-settings').get(ProfileSetting.all)
    router.route('/profile-setting').patch(ProfileSetting.update)

    // Sessions routes
    router.route('/sessions').get(SessionController.all) 
    router.route('/session/:sessionid').get(SessionController.get)
    router.route('/session').post(SessionController.create)
    router.route('/session/:sessionid').delete(SessionController.delete)
    router.route('/session').patch(SessionController.update)

    // Pists routes
    router.route('/pists').get(PistController.all)
    router.route('/pist/:id').get(PistController.get)
    router.route('/pist').post(MulterFilesManager.upload.single('audio'), PistController.Import)
    router.route('/pist/:pistid').delete(PistController.delete)
    router.route('/pist').patch(PistController.update)

    // session_track
    router.route('/where/session_track').get(ImportController.checkWherePistIsImported)
    router.route('/session_track/:sessionid').get(ImportController.getImported)
    router.route('/session_track').patch(ImportController.UpdatePist)
    router.route('/session_track').post(ImportController.importInFromPistID)
    router.route('/session_track/:pistid').delete(ImportController.deleteIn)

    // Liked routes
    router.route('/likes').get(Liked.all)
    router.route('/like').get(Liked.get)
    router.route('/profile/like').post(Liked.ProfileLike)
    router.route('/creation/like').delete(Liked.CreationLike)
    
    
    // Search routes
    router.route('/search/sessions').post(Search.SearchSession)
    router.route('/search/pists').post(Search.SearchImport)
    router.route('/search/users').post(Search.SearchUser)

    return router
})() 