require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET
const models = require('../models/')

const publicRoutes = require('./public-route.json')

const self = module.exports = {
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

        if(token != null){
            // Check if token is valid
            let tokenInfos = self.checkToken(token)   
            if(!tokenInfos.error) {
                // Get user from database with the userID from the token
                let user = await models.User.findByPk(tokenInfos.userID).catch(error => console.log(error))
                if(user){
                    // Set "req.user = user" to have information in all controller that use JWT Middleware
                    req.user = {
                        id:    user.dataValues.id,
                        email: user.dataValues.email,
                        role:  user.dataValues.role,
                        name:  user.dataValues.name
                    }        
                }                    
            }
        }

        if(self.autorizeRoutes(req.path, req.method) || !self.checkToken(token).error){
            return next()
        }else{
            return res.status(401).json({error: 'Vous n\'êtes pas autorisé'})
        }
    },

    checkToken: function(token){
        try{
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
            if(jwtToken !== null){
                return jwtToken
            }
        }catch(err){
            return {error: {TokenError: 'Invalide'}}
        }
    },

    // Retourne true si la route et renseigner en tant que route public
    // Permet de passer la vérification du token et d'entrer directement dans le controller concerner
    autorizeRoutes: function(asked_path, asked_method){
        let route = asked_method + '|' + asked_path
        if(publicRoutes.routes.includes(route)){
            return true
        } else return false
    }
}