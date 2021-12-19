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
    apiRouter.route('/sessions/create').post(SessionController.test)
    apiRouter.route('/sessions/update').put(SessionController.test)
    apiRouter.route('/sessions/delete').delete(SessionController.test)

    // Pists routes
    // apiRouter.route('/pists/').get(PistController.get)
    apiRouter.route('/pists/:id').get(PistController.get)
    apiRouter.route('/pists/').post(MulterFilesManager.upload.single('audio'), PistController.import)
    apiRouter.route('/pists/delete').delete(PistController.delete)
    apiRouter.route('/pists/search')

    //
    return apiRouter
})()