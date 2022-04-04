const express         = require('express')

// Controllers
const AuthController = require('./controllers/AuthController')
const SessionController = require('./controllers/SessionController')
const PistController = require('./controllers/ImportController')

// Middleware
const MulterFilesManager = require('./middleware/MulterFileManager')
const UserController = require('./controllers/UserController')
const ImportController = require('./controllers/ImportController')

exports.router = (() => {
    let apiRouter = express.Router()

    // Authentications routes
    apiRouter.route('/auth').patch(AuthController.register)
    apiRouter.route('/auth').post(AuthController.login)
    apiRouter.route('/auth').get(AuthController.checkToken)  // Test le token

    // Users route    
    apiRouter.route('/user/:id').get(UserController.get)
    apiRouter.route('/users').get(UserController.all)
    apiRouter.route('/user').patch(UserController.update)
    apiRouter.route('/user').delete(UserController.delete)


    // User picture
    apiRouter.route('/picture/:id').post(MulterFilesManager.upload.single('image'), UserController.upload)
    apiRouter.route('/picture/').get(UserController.picture)


    // Sessions routes
    apiRouter.route('/sessions').get(SessionController.all)
    apiRouter.route('/session/:sessionid').get(SessionController.get)
    apiRouter.route('/session').post(SessionController.create)
    apiRouter.route('/session/:sessionid').delete(SessionController.delete)
    apiRouter.route('/session').patch(SessionController.update)

    // Pists routes
    apiRouter.route('/pists').get(PistController.all)
    apiRouter.route('/pist/:id').get(PistController.get)
    apiRouter.route('/pist').post(MulterFilesManager.upload.single('audio'), PistController.Import)
    apiRouter.route('/pist/:pistid').delete(PistController.delete)
    apiRouter.route('/pist').patch(PistController.update)

    // session_track routesCheck
    apiRouter.route('/where/session_track').get(ImportController.checkWherePistIsImported)
    apiRouter.route('/session_track/:sessionid').get(ImportController.getImported)
    apiRouter.route('/session_track').patch(ImportController.UpdatePist)
    apiRouter.route('/session_track').post(ImportController.importInFromPistID)
    apiRouter.route('/session_track/:pistid').delete(ImportController.deleteIn)
    
    
    // Text routes
    apiRouter.route('/text/').patch(SessionController.updateText)
    
    return apiRouter
})() 