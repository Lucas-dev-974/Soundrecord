const models = require('../models')
const validator = require('../validator')

module.exports = {
    get: async function(req, res){ 
        // retourne la session qui à été modifié en dernier si pas de sessions id en parametre 

        let id = req.query.id ?? null
        if(id !== null && isNaN(id)) return res.status(400).json({error: 'L\'id renseigner est incorrect !'})
        else if(id == null){
            let session = await models.Session.create({
                userid: req.userID,
                session_name: 'Untilted',
            })

            return res.status(200).json(session)
        }

        let session = await models.Session.findByPk(id);
        return res.status(200).json(session)
        
    },

    get_all: function(req, res){

    },

    update: function(req, res){

    },

    delete: function(req, res){
        
    },

    create: async function(req, res){
        let validated = validator.validate(req.body, {'name': 'string' })
        if(validated.errors) return res.status(403).json({error: validated.errors});

        let session = null
        let user = await models.User.findByPk(req.userID)

        try{
            session = await models.Session.create({
                session_name: validated.name,
                user: req.userID,
            })
            session.setUser(user)

        }catch(error){
            return res.status('404 ')
        }
        return res.status(200).json(session)
    },

    update: async function(req, res){
        let validated = validator.validate(req.body, { "id": 'int', 'data_name': 'string', 'data': 'string' })
        if(validated.errors) return res.status(403).json({error: validated.errors});

        console.log(validated.data_name);
        let data_name = validated.data_name.split('|')
        console.log('data_name: ', data_name);
    }
}