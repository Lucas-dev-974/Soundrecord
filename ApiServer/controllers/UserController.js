const validator = require('../validator')
const models    = require('../models/')
const bcrypt = require('bcrypt')

const path = require('path')
const fs = require('fs')
const stream = require('stream')

module.exports = {
    get: async function(req, res){
        let validated = validator.validate(req.body, {userid: 'int'})
        if(validated.errors) {
            if(req.user.roleid !== 1) return res.status(401).json({error: 'Vous n\'ete pas autorisée recevoir ces information'})
            let users = await models.User.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'password']} })
            return res.status(200).json(users)
        }

        let user = await models.User.findOne({
            where: { id: validated.userid },
            attributes: { exclude: ['updatedAt', 'createdAt', 'password']}
        })

        if(!user) return res.status(200).json(user)
        return res.status(200).json(user)
    },

    update: async function(req, res){
        let validated = validator.validate(req.body, { fields: 'string', datas: 'string' })
        if(validated.errors) return res.status(400).json(validated)

        let fields = validated.fields.split('|')
        let datas  = validated.datas.split('|')

        let fieldsPist = ['name', 'email', 'password', 'roleid']
        let user = await models.User.findOne({
            where: {id: req.user.id },
            // attributes: fieldsuser
        })

        if(!user) return res.status(400).json({error: 'La user n\existe pas !'})
        
        if(user.dataValues.id == req.user.id){
           for(let i = 0; i < fields.length; i++){
                if(fieldsPist.includes(fields[i])) {
                    console.log(fields[i]);
                    if(fields[i] == 'password') datas[i] = await  bcrypt.hash(datas[i], 5)
                    if(fields[i] == 'roleid'){
                        if(req.UserRole !== 1) return res.status(401).json({error: 'Vous n\'ête pas autorisé à modifié cet données !'})
                    }
                    try{
                        user.set({ [fields[i]]: datas[i] })
                        await user.save()
                    }catch(error){
                        console.log(error);
                        return res.status(500).json({error: 'Une erreur est survenue, veuillez réesayer plus tard'})
                    }
                }
            }
        } else return res.status(400).json({ error: 'Vous n\'ête pas autorisé à modifier cet user'})

 
        
        return res.status(200).json()
    },
    
    delete: async function(req, res){
        let validated = validator.validate(req.body, { userid: 'int' })
        if(validated.errors) return res.status(400).json(validated)
        let user = await models.User.findByPk(validated.userid).catch(error => {
            console.log(error);
        })
        if(!user) return res.status(400).json({error: 'il s\'emblerais que l\'utilisateur n\'existe pas !'})
        try{
            await user.destroy()
        }catch(error){
            console.log(error);
        }

        return res.status(200).json()
    },

    upload: async function(req, res){
        // Check if is autorized, Setting up in MulterMiddleware
        if(!req.AutorizedFile || !req.Isimage ) return res.status(403).json({ error: 'Un fichier de type .png, .jpg, .jpeg est attendu !' })

        console.log(req.fileInfos);
        let user = await models.User.findByPk(req.user.id)
        user.set('picture', req.fileInfos.originalname)
        await user.save()
        
        return res.status(200).json()

    },

    getPicture: function(req, res){
        let pictureDir = path.resolve(__dirname, '../public/user-') + req.user.id + '/picture/' + req.user.picture
        if(!fs.existsSync(pictureDir)) pictureDir = path.resolve(__dirname, '../public/default_picture/defaultpp.jpg')

        const filereader = fs.createReadStream(pictureDir ) 
        const ps         = new stream.PassThrough() // Handle error during stream

        stream.pipeline(filereader, ps, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({error: 'Une erreur est survenue veuillez réesayer plus tard'}); 
            }
        })
        ps.pipe(res)
    }
}