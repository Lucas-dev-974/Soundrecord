const bcrypt = require('bcrypt')
const jwt    = require('../middleware/Jwt')
const models = require('../models')
const _validator = require('../validator')

const {returnFields, validator} = require('../utils.js')
const self = module.exports = {
    register: async function(req, res){
        let validated = validator(req.body, {
            'email':     'string:required',
            'password':  'string:required',
            'name':      'string:required',
            'pseudo':    'string:required'
        }) 
        if(validated.failsSize > 0) return res.status(403).json(validated.fails)
        
        let user = await models.User.findOne({ attributes: ['email'], where: {email: validated.validated.email} })
        if(user)   return res.status(403).json({'error': 'Cet email est déjà enregistrer, veuillez vous connecté !'})

        const password = bcrypt.hashSync(validated.validated.password, bcrypt.genSaltSync(8))
        
        // Create user
        user = await models.User.create({ 
            name: validated.validated.name,
            email: validated.validated.email,
            password: password,
            role: 2
        }).catch(error => {return res.status(403).json({ error: error })})
        
        // Let generate Token for the user
        const token = jwt.generateToken({ 
            id:    user.dataValues.id,
            email: user.dataValues.email,
            role:  user.dataValues.role,
        }) 

        return res.status(200).json({
            token: token,
            user: returnFields(user.dataValues, models.User.visible())
        })
    },

    login: async function(req, res){
        let validated = validator(req.body, {
            'email': 'string:required',
            'password': 'string:required'
        })
        
        if(Object.entries(validated.fails).length > 0) return res.status(403).json({error: validated})
        
        let user = await models.User.findOne({ where: {email: validated.validated.email} })
        
        if(!user) return res.status(403).json({'errors': 'Email ou mot de passe incorrecte'})

        let comparation = bcrypt.compareSync(validated.validated.password, user.password)
        if(!comparation) return res.status(401).json({error: 'Identifiant incorrect'})

        return res.status(200).json({
            user:  returnFields(user.dataValues, models.User.visible()),
            token: jwt.generateToken(user)
        })
        // bcrypt.compare(validated.validated.password, user.password, (err, resBycrypt) => {
        //     if(resBycrypt) return res.status(200).json({
        //         'user': returnFields(user.dataValues, ['email', 'id', 'name', 'picture', 'roleid²']),
        //         'token': jwt.generateToken(user)
        //     })
        //     else return res.status(403).json({'error': 'Email ou mot de passe incorrecte'})
        // })
    },

    checkToken: function(req, res ){
        let headerAuth = req.headers['authorization']
        let token      = jwt.parseauthorization(headerAuth)
        
        if(token == null) return res.status(401).json({error: 'Veuillez vous connectez !'})

        let validToken = jwt.checkToken(token)
        if(validToken.error) return res.status(401).json({error: 'Token invalide veuillez vous reconnecté !'})

        return res.status(200).json(true)
    },

    AssingDefaultProfileSettings: async function(user_id){
        // Row show option | name: show_options | table: profile_settings | options: "email,phone,pseudo,fb,inst,name | default: "fb,inst,pseudo,email""
        const setting_fields = {
            show_fields_options: 'fb,inst,name,pseudo,email',
            'banner-color': '#1E1E1E',
        }
        
        Object.keys(setting_fields).forEach(async (field, key) => {
            let value = Object.values(setting_fields)[key]
            await models.ProfileSettings.create({setting_name: field, setting_value: value, userid: user_id})
            .catch(error => console.log(error))
        });

        return setting_fields
    }
}