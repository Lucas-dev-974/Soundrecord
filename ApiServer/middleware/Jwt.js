require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET
const models = require('../models/')

module.exports = {
    generateToken: function(user){
        return jwt.sign({
            userID: user.id,
            password: user.password,
            role: user.roleid
        }, JWT_SIGN_SECRET, {expiresIn: '5d'})
    },

    parseauthorization: function(authorization){
        if(typeof(authorization) == 'undefined') return null
        else return authorization.replace('Bearer ', '')
    },

    isAuthorized: async function(req, res, next){
        let headerAuth = req.headers['authorization']
        let token = module.exports.parseauthorization(headerAuth)
        
        // Si le token est spécifié dans l'url via http://url...?token=ferjnfiejrn
        if(req.query.token) token = req.query.token 

        // Continue if is auth routes
        if(req.path == "/api/auth/" && req.method !== 'GET') return next()
 
        if(token !== null){
            // Check if token is valid
            let tokenInfos = module.exports.checkToken(token)   

            // Return error if not
            if(tokenInfos.error) res.status(403).json(tokenInfos) 

            // Get user from database with the userID from the token
            let user = await models.User.findByPk(tokenInfos.userID).catch(error => console.log(error))
            // Set "req.user = user" to have information in all controller that use JWT Middleware
            req.user = user                                          
            // if(!user) return res.status(403).json({'error': 'Votre compte persoit un problèment. L\'accèes y est impossible pour le moment !'})
        }else{
            return res.status(401).json({
                error: "Aucun Token renseigner veuillez vous connectez !"
            })
        }   
        next() // Continue
    },

    checkToken: function(token){
        try{
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
            if(jwtToken !== null){
                return jwtToken
            }
        }catch(err){
            return {error: 'Votre connexion n\'est plus valable ! Reconnectez-vous.'}
        }
    }
}