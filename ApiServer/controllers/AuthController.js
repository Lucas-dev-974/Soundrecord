const bcrypt = require('bcrypt')
const jwt    = require('../middleware/Jwt')
const models = require('../models')
const validator = require('../validator')

module.exports = {
    register: async function(req, res){
        let validated = validator.validate(req.body, {
            'email':    'string',
            'password':  'string',
            'name':     'string'
        }) 

        if(validated.errors) return res.status(403).json(validated)

        let user = await models.User.findOne({ attributes: ['email'], where: {email: validated.email} })
        
        if(user) res.status(403).json({'error': 'Cet email est déjà enregistrer, veuillez vous connecté !'})

        bcrypt.hash(validated.password, 5, async (err, hashed) => {
            models.User.create({ // Création de l'utilisateur
                name: validated.name,
                email: validated.email,
                password: hashed,
                roleID: 2,
                isadmin: false
            }).then(user => {   // Apres création de l'utilisteur
                return res.status(200).json({
                    'token': jwt.generateToken(user)
                })

            }).catch(err => {   // Si erreur lors de la création de l'utilisateur
                return res.status(500).json({error: err})
            })
        })
    },

    login: async function(req, res){
        let validated = validator.validate(req.body, {
            'email': 'string',
            'password': 'string'
        })
        if(validated.errors) res.status(403).json(validated)
        
        let user = await models.User.findOne({ where: {email: validated.email} })

        if(!user) return res.status(403).json({'errors': 'Email ou mot de passe incorrecte'})

        bcrypt.compare(validated.password, user.password, (err, resBycrypt) => {
            if(resBycrypt) return res.status(200).json({
                'userID': user.id,
                'token': jwt.generateToken(user)
            })
            else return res.status(403).json({'error': 'Email ou mot de passe incorrecte'})
        })
    },

    getUser: async function(req, res){
        let headerAuth = req.headers['authorization']
        let userID     = jwt.getUsetId(headerAuth)
        let params = {
            name: 'string',
        }
        let validated  = validator.validate(req.body, params)
        if(validated.errors) return res.json(validated)
        if(userID != -1){
            let user = await models.User.findOne({
                where: {id: userID}
            })

            return res.status(200).json({user})
        }
        return res.status(200).json({userID})
    },

    checkToken: function(req, res ){
        let headerAuth = req.headers['authorization']
        let token      = jwt.parseauthorization(headerAuth)
        console.log('TOKEN: ', token);
        if(token == null) return res.status(401).json({error: 'Veuillez vous connectez !'})


        let validToken = jwt.checkToken(token)
        if(validToken.error) return res.status(401).json({error: 'Token invalide veuillez vous reconnecté !'})

        return res.status(200).json(true)
    }
}