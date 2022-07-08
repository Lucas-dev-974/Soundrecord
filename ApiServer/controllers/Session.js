const models = require('../models')
const validator = require('../validator')

const {returnFields, GetPagination, GetPagingDatas} = require('../utils.js')

module.exports = {
    get: async function(req, res){
        // Get the session id from url params
        let id = req.params.sessionid
        if(isNaN(id) == true) return res.status(400).json({error: 'L\'id renseigner est incorrect !'})

        let session = await models.Session.findOne({ 
            where:      {id: id, userid: req.user.id}, 
            attributes: { exclude: ['createdAt', 'updatedAt'] }, 
            include: [
                { 
                    model: models.SessionTrack,  
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    include: [{model: models.Import}]   
                }
            ]
        }).catch(error => { console.log(error) })

        if(!session) return res.status(400).json({error: 'La session demandé n\'existe pas !'})
        return res.status(200).json({session})
    },

    all: async function(req, res){
        let { page, size } = req.query
        if(!size) size = 10
        const { limit, offset } = GetPagination(page, size);
        
        let sessions =  await models.Session.findAndCountAll({
            where: { userid: req.user.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            limit: limit,
            offset: offset
        }).catch(error => { console.log(error) })

        for(const key in sessions.rows){
            const session = sessions.rows[key].dataValues
            let imports = await models.SessionTrack.findAndCountAll({where: {sessionid: session.id}})
            sessions.rows[key].dataValues.importedIn = imports.count
        }
        
        const response = GetPagingDatas(sessions, page, limit)
        return res.status(200).json(response)
    },

    delete: async function(req, res){
        // let params = req.body // For postman
        let params = req.params // For web axios

        let validated = validator.validate(params, {sessionid: 'int'})
        if(validated.fails.length > 0) return res.status(400).json(validated)

        let session = await models.Session.findByPk(validated.validated.sessionid).catch(error => console.log(error))
        if(!session) return res.status(400).json({error: "Il s'emblerais que la session n'existe pas !"})

        session.destroy()

        return res.status(200).json(true)
    },

    create: async function(req, res){
        // Check of given data
        let validated = validator.validate(req.body, {'name': 'string' })

        // let user    = await models.User.findByPk(req.user.id)
        let session = await models.Session.create({
            session_name: validated.validated.name ?? 'Untilted',
            userid: req.user.id,
            public: false
        }).catch(error => { console.log(error) })

        // session.setUser(req.user.id)

        session      = returnFields(session.dataValues, ['id', 'session_name'])

        return res.status(200).json(session)
    },

    update: async function(req, res){
        let validated = validator.validate(req.body, { id: 'int', prop: 'string', new_val: 'any' })
        if(validated.errors) return res.status(403).json({error: validated.errors});

        let session = await models.Session.findOne({where: {id: validated.validated.id}})

        if(!session) return res.status(400).json({error: 'La session n\'existe pas !'})
        else if(session.userid !== req.user.id) return res.json(402).json({error: 'Vous n\'ête pas autoriser à modifié cet ressource'})

        try{
            console.log({ [validated.validated.prop]: validated.validated.new_val });
            session.set({ [validated.validated.prop]: validated.validated.new_val }) 
            await session.save()
            return res.json('tru')
        }catch(error){
            console.log(error);
            return res.status(500).json({error: 'Une erreur est survenu, veuillez réesayer plus tard !'})
        }
    },
    
    importIn: function(req, res){
        let validated = validator.validate(req.body, {
            'id': 'int'
        })
    },

    save: function(req, res){
        
    }

}