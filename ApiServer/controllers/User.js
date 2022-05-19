const _validator = require('../validator')
const models    = require('../models')
const bcrypt = require('bcrypt')

const path = require('path')
const fs = require('fs')
const stream = require('stream')
const { GetPagination, validator }  = require('../utils.js')

module.exports = {
    get: async function(req, res){
        const user = await models.User.findOne({
            where: {id: req.user.id},
            attributes: { exclude: ['updatedAt', 'createdAt', 'password']}
        })

        if(!user) return res.status(200).json(user)
        return res.status(200).json(user) 
    },

    all: async function(req, res){
        let users = null
        let { page, size } = req.query
        const { limit, offset } = GetPagination(page, size);

        if(req.user.role == 1) {
            users = await models.User.findAndCountAll({
                attributes: { exclude: ['updatedAt', 'createdAt', 'password', 'roleid']},
                limit: limit,
                offset: offset
            })
                    
            return res.status(200).json(response)
        }

        if(!users) return res.status(200).json(users)
        return res.status(200).json(users) 
    },

    update: async function(req, res){
        const user = await models.User.findOne({ where: {id: req.user.id } })
        let validated = validator(req.body, { name: 'string', email: 'string', pseudo: 'string', password: 'string', facebook_link: 'string', instagram_link: 'string' })
        
        if(validated.validatedSize > 0){
            Object.entries(validated.validated).forEach(async(data, key) => {
                user.set(data[0], data[1])
                await user.save()
            })
        }
        return res.status(200).json(req.body)
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
        if(!req.AutorizedFile || !req.Isimage ) return res.status(403).json({ error: 'Un fichier de type .png - .jpg - .jpeg est attendu !' })

        console.log(req.fileInfos);
        let user = await models.User.findByPk(req.user.id)
        user.set('picture', req.fileInfos.originalname)
        await user.save()
        
        return res.status(200).json()

    },

    picture: async function(req, res){
        let userid = req.query.userid ?? req.user.id

        let picture_dir
        if(userid){
            const picture = await models.User.findOne({where: {id: userid}, attributes: ['picture']})
            if(picture .picture!= null)
                picture_dir = path.resolve(__dirname, '../public/user-') + userid + '/picture/' + picture.dataValues.picture.replace(/ /g, '')
        }
        

        if(!fs.existsSync(picture_dir)) picture_dir = path.resolve(__dirname, '../public/default_picture/defaultpp.jpg')

        const filereader = fs.createReadStream(picture_dir ) 
        const ps         = new stream.PassThrough() // Handle error during stream

        stream.pipeline(filereader, ps, (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({error: 'Une erreur est survenue veuillez réesayer plus tard'}); 
            }
        })
        ps.pipe(res)
    },

    get_creators: function(req, res){
        
    }
}