const models = require('../models')
const validator = require('../validator')

const {returnFields} = require('../utils.js')

module.exports = {
    get: async function(req, res){ 
        // return the current session if id params is given

        // let id = req.query.id ?? null // For axios request
        let id = req.body.id ?? null     // For postman request

        // if id is not number return error
        if(isNaN(id) == true) return res.status(400).json({error: 'L\'id renseigner est incorrect !'})
        else if(id == null){    // IF NO ID, CREATE NEW SESSION WITH TEXT
            let session = await models.Session.create({ // Create Session
                userid: req.userID,
                session_name: 'Untilted',
            })

            session = returnFields(session.dataValues, ['id', 'userid', 'session_name'])

            // Create text
            let text = await models.Text.create({ text: '', sessionid: session.id }).catch(error => { console.log(error) })

            session['text'] = returnFields(text.dataValues, ['text', 'id'])
            return res.status(200).json(session)
        }

        let session = await models.Session.findOne({ where: {id: id}, 
            attributes: { exclude: ['createdAt', 'updatedAt'] }, 
            include: [
                { model: models.Text, attributes: ['id', 'text'] },
                { model: models.ImportedInProject, attributes: ['id', 'sessionid', 'importid']}
            ]}).catch(error => { console.log(error) })
            

        text       = session.dataValues.Text.dataValues // 
        importedIn = session.dataValues.ImportedInProjects
        // session    = returnFields(session.dataValues, ['id', 'session_name', 'userid']);     
        
        // Check if token userID is the userid via database
        if(session.userid !== req.userID) return res.status(403).json({error: 'Vous devez avoir créer cet session pour la récuperer !'})

        return res.status(200).json(session)
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
    },
    
    import: function(req, res){
        let validated = validator.validate(req.body, {
            'id': 'int'
        })
    }
}