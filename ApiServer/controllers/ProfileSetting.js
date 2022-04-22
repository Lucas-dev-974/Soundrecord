// Default setting: bannerbg - bannercolor - show{profile}: name, email... 
const { validator } = require('../utils.js')
const models = require('../models')
const htmlspecialchars = require('htmlspecialchars')
const res = require('express/lib/response')

const self = module.exports = {
    get: async function(req, res){
        let validated = validator(req.body, { setting_name: 'string' })
        if(validated.errors) return res.status(402).json(validated.errors)

        const setting = await models.ProfileSettings.findOne({
            where: {
                setting_name: validated.setting_name,
                userid: req.user.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })

        if(!setting) res.status(404).json({error: 'Aucun paramètre disponible ici'})
        else         res.status(200).json(setting)
    },  

    all: async function(req, res){  
        const user = models.User.findOne({where: {id: req.user.id}}).catch(error => console.log(error))
        if(!user)  return res.status(403).json({error: 'L\'utilisateur n\'existe pas'})

        const settings = await models.ProfileSettings.findAll({
            where: {userid: req.user.id},
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        return res.status(200).json(settings)
    },

    update: async function(req, res){
        let validated = validator(req.body, { setting_name: 'string', value: 'string' })
        if(validated.errors) return res.status(402).json(validated.errors)

        let setting = await models.ProfileSettings.findOne({
            where: { userid: req.user.id, setting_name: validated.setting_name },
            // attributes: { exclude: ['createdAt', 'updatedAt']}
        })  

        console.log(setting);
        if(!setting) setting = await models.ProfileSettings.create({userid: req.user.id, setting_name: validated.setting_name, setting_value: validated.value})
        else{
            setting.setting_value = validated.value
            setting = await setting.save()
            // await setting.save()        
        }

        if(!setting) res.status(404).json({error: 'Aucun paramètre disponible ici'})
        else         res.status(200).json(setting)
    },

    upload: function(req, res){
        // if(req)
    },

    getProfile: async function(req, res){ // Return user infos
        let userid = req.query.userid ? htmlspecialchars(req.query.userid) : htmlspecialchars(req.user.id)
        if(!userid || isNaN(userid)) return res.status(403).json({error: 'Aucun identifiant fournie !'})

        let settings = await self.getProfileSettings(userid)
        
        let user, creation, mixed
        if(settings.show_options){
            user = await models.User.findOne({
                where: {id: userid},
                attributes: settings.show_options.split(',')
            })
            delete settings.show_options
        }

        if(!user) return res.status(403).json({error: 'L\'utilisateur n\'existe pas'})

        return res.status(200).json({
            user: {...user.dataValues},
            settings: {...settings}
        })
    },

    getProfileSettings: async function(userid){ 
        let profile_settings = await models.ProfileSettings.findOne({where: {userid: userid}})
        if(!profile_settings){
            return {
                show_options: "email,name,pseudo",
            }
        }else{
            const result = profile_settings.dataValues.setting_value.split(',')
            let query = []
            result.forEach((value, key) => {
                if(value == 'fb')   result[key] = ('facebook_link')
                if(value == 'inst') result[key] = ('instagram_link')
            });

            return query
        }

    }
}