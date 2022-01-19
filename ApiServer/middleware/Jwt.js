require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET
const models = require('../models/')

module.exports = {
    generateToken: function(user){
        return jwt.sign({
            userID: user.id,
            password: user.password
        }, JWT_SIGN_SECRET, {expiresIn: '365d'})
    },

    parseauthorization: function(authorization){
        if(typeof(authorization) == 'undefined') return null
        else return authorization.replace('Bearer ', '')
    },

    isAuthorized: async function(req, res, next){
        let headerAuth = req.headers['authorization']
        let token = module.exports.parseauthorization(headerAuth)
        if(req.query.token) token = req.query.token // Si le token est spécifié dans l'url via http://url...?token=ferjnfiejrn

        
        // if(req.path !== "/api/auth/"){ // Authorize l'accès au controller si c'est pour l'authentification
     
        //     next()
        // }
        if(req.path == "/api/auth/" && req.method !== 'GET') return next()

        if(token !== null){
            let tokenInfos = module.exports.checkToken(token)
            if(tokenInfos.error) res.status(403).json(tokenInfos)
            req.userID = tokenInfos.userID

            let user = await models.User.findByPk(tokenInfos.userID)
            if(!user) return res.status(403).json('Votre compte persoit un problèment. L\'accèes y est impossible pour le moment !')
        }else{
            return res.status(401).json({
                error: "Aucun Token renseigner veuillez vous connectez !"
            })
        }
        
        next()
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