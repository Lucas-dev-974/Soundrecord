require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET

module.exports = {
    generateToken: function(user){
        return jwt.sign({
            userID: user.id,
            password: user.password
        }, JWT_SIGN_SECRET, {expiresIn: '1h'})
    },

    parseauthorization: function(authorization){
        return (authorization != null || authorization !== "Bearer undefined") ? authorization.replace('Bearer ', '') : null
    },

    isAuthorized: function(req, res, next){
        let headerAuth = req.headers['authorization']
        let token = module.exports.parseauthorization(headerAuth)

        if(req.path !== "/api/auth/"){
            if(token !== null){
                try{
                    let jwtToken = jwt.verify(token, JWT_SIGN_SECRET)

                    if(jwtToken !== null){
                        req.userID = jwtToken.userID
                    }
                }catch(err){
                    console.log(err);
                    return res.status(401).json({'error': 'Votre connexion n\'est plus valable ! Reconnectez-vous.'})
                }
            }else{
                return res.status(401).json({
                    error: "Token non Autorisée, veuillez vou connecté !"
                })
            }
            next()
        }else next()

    },
}