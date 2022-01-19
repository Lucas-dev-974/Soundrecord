const express         = require('express')
const AuthController = require('./controllers/AuthController')
const SessionController = require('./controllers/SessionController')
const PistController = require('./controllers/PistController')

const MulterFilesManager = require('./middleware/MulterFileManager')

exports.router = (() => {
    let apiRouter = express.Router()

    // Authentications routes
    apiRouter.route('/auth/').patch(AuthController.register)
    apiRouter.route('/auth/').post(AuthController.login)
    apiRouter.route('/auth/').get(AuthController.checkToken)  // Test le token

    // Sessions routes
    apiRouter.route('/sessions/').get(SessionController.get)
    apiRouter.route('/sessions/').post(SessionController.create)
    apiRouter.route('/sessions/').delete(SessionController.delete)
    apiRouter.route('/sessions/').patch(SessionController.update)

    // Pists routes
    apiRouter.route('/pists/').get(PistController.getAll)
    apiRouter.route('/pists/:id').get(PistController.get)
    apiRouter.route('/pists/').post(MulterFilesManager.upload.single('audio'), PistController.Import)
    apiRouter.route('/pists/').delete(PistController.delete)
    apiRouter.route('/pists/').patch()

    //
    return apiRouter
})()