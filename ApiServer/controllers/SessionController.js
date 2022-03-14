const models = require('../models')
const validator = require('../validator')

const {returnFields} = require('../utils.js')
const { json } = require('body-parser')

module.exports = {
    get: async function(req, res){ // return the current session if id params is given else return all session
        let id = req.query.sessionid ?? null     // For axios request
        // let id = req.body.sessionid ?? null   // For postman request
        
        if(id == null){    // IF NO ID, RETURN ALL SESSION FOR THE USER
            let sessions =  await models.Session.findAll({
                where: { userid: req.user.id },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [  // get relation with include
                    {model: models.Text, attributes: {exclude: ['createdAt', 'updatedAt']}},
                    {model: models.ImportedInProject, attributes: {exclude: ['createdAt', 'updatedAt']}}
                ],
            }).catch(error => { console.log(error) })
            return res.status(200).json({sessions})
        }

        // if id is not number return error
        if(isNaN(id) == true) return res.status(400).json({error: 'L\'id renseigner est incorrect !'})
        
        // IF SESSION ID IS GIVEN
        let session = await models.Session.findOne({ 
            where: {id: id, userid: req.user.id}, 
            attributes: { exclude: ['createdAt', 'updatedAt'] }, 
            include: [
                { model: models.Text,  attributes: {exclude: ['createdAt', 'updatedAt']} },
                { 
                    model: models.ImportedInProject,  
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    include: [{model: models.Import}]   
                }
            ]
        }).catch(error => { console.log(error) })

        if(!session) return res.status(400).json({error: 'La session demandé n\'existe pas !'})
        return res.status(200).json({session})
    },

    delete: async function(req, res){
        // let params = req.body // For postman
        let params = req.params // For web axios

        let validated = validator.validate(params, {sessionid: 'int'})
        if(validated.errors) return res.status(400).json(validated)

        let session = await models.Session.findByPk(validated.sessionid).catch(error => console.log(error))
        if(!session) return res.status(400).json({error: "Il s'emblerais que la session n'existe pas !"})

        session.destroy()

        return res.status(200).json()
    },

    create: async function(req, res){
        // Check of given data
        let validated = validator.validate(req.body, {'name': 'string' })

        let user    = await models.User.findByPk(req.user.id)
        let session = await models.Session.create({
            session_name: validated.name ?? 'Untilted',
            user: req.user.id,
        }).catch(error => { console.log(error) })

        let text = await models.Text.create({
            text: '',
            sessionid: session.id
        }).catch(error => console.log(error))
        
        session.setUser(user)

        session = returnFields(session.dataValues, ['id', 'session_name'])
        session.text = returnFields(text.dataValues, ['id', 'text'])

        return res.status(200).json(session)
    },

    update: async function(req, res){
        let validated = validator.validate(req.body, { "id": 'int', 'name': 'string' })
        if(validated.errors) return res.status(403).json({error: validated.errors});

        let session = await models.Session.findByPk(validated.id)

        if(!session) return res.status(400).json({error: 'La session n\'existe pas !'})
        else if(session.userid !== req.user.id) return res.json(402).json({error: 'Vous n\'ête pas autoriser à modifié cet ressource'})

        try{
            session.set({ session_name: validated.name }) 
            await session.save()
            return res.json('tru')
        }catch(error){
            console.log(error);
            return res.status(500).json({error: 'Une erreur est survenu, veuillez réesayer plus tard !'})
        }
        return res.status(200).json()
    },
    
    importIn: function(req, res){
        let validated = validator.validate(req.body, {
            'id': 'int'
        })
    },

    updateText: async function(req, res){
        let validated = validator.validate(req.body, {text: 'string', id: 'int'})
        if(validated.errors) res.status(200).json(validated)

        let text = await models.Text.findOne({ where: {id: validated.id} })
        if(!text) return res.status(400).json({error: "Le text n'existe pas !"})
        
        text.set('text', validated.text)
        text.save()
        return res.status(200).json(text)
    }
}