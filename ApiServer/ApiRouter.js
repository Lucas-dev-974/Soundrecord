const express         = require('express')
const AuthController = require('./controllers/AuthController')
const SessionController = require('./controllers/SessionController')
const PistController = require('./controllers/ImportController')

const MulterFilesManager = require('./middleware/MulterFileManager')
const UserController = require('./controllers/UserController')
const ImportController = require('./controllers/ImportController')

exports.router = (() => {
    let apiRouter = express.Router()

    // Authentications routes
    apiRouter.route('/auth/').patch(AuthController.register)
    apiRouter.route('/auth/').post(AuthController.login)
    apiRouter.route('/auth/').get(AuthController.checkToken)  // Test le token

    // Users route
    apiRouter.route('/users/').get(UserController.get)
    apiRouter.route('/users/').get(UserController.get)
    apiRouter.route('/users/').patch(UserController.update)
    apiRouter.route('/users/').delete(UserController.delete)
    apiRouter.route('/users/').post(MulterFilesManager.upload.single('image'), UserController.upload)
    apiRouter.route('/user/').get(UserController.getPicture)

    // Sessions routes
    apiRouter.route('/sessions/').get(SessionController.get)
    apiRouter.route('/sessions/').post(SessionController.create)
    apiRouter.route('/sessions/:sessionid').delete(SessionController.delete)
    apiRouter.route('/sessions/').patch(SessionController.update)

    // Pists routes
    apiRouter.route('/pists/:id').get(PistController.get)
    apiRouter.route('/pists/').get(PistController.getAll)
    apiRouter.route('/pists/').post(MulterFilesManager.upload.single('audio'), PistController.Import)
    apiRouter.route('/pists/:pistid').delete(PistController.delete)
    apiRouter.route('/pists/').patch(PistController.update)

    // ImportedIn routesCheck
    apiRouter.route('/importedin/where/').get(ImportController.checkWherePistIsImported)
    apiRouter.route('/importedin/:sessionid').get(ImportController.getImported)
    apiRouter.route('/importedin/').patch(ImportController.UpdatePist)
    apiRouter.route('/importedin/').post(ImportController.importInFromPistID)
    apiRouter.route('/importedin/:sessionid/:pistid').delete(ImportController.deleteIn)
    
    
    // Text routes
    apiRouter.route('/text/').patch(SessionController.updateText)
    return apiRouter
})() 