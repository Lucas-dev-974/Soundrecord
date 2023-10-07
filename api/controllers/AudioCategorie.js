const { validator, exclude, manageCatchErrorModel } = require("../utils.js");
const models = require("../models");

module.exports = {
    linkAudioToCategories: async function(req, res){
        const validated = validator(req.body, {
            audioId: 'required|int',
            categorieId: 'required|int',
            categorieName: "string"
        })
        
        if(validated.errors) return res.status(400).json(validated.errors)

        const audio = await models.Audio.findOne({
            where: {id: validated.audioId}
        }).catch(error => { return manageCatchErrorModel(res, error)} )

        if(!audio) return res.status(404).json({message: "L'audio n'existe pas/plus."})

        let categorie = await models.Categories.findOne({
            where: {id: validated.categorieId}
        }).catch(error => { return manageCatchErrorModel(res, error)} )

        if(!validated.categorieName && !categorie){
            return res.status(400).json({message: "Veuillez spécifier un nom pour la catégorie."})
        }
        
        if(!categorie){
            categorie = await models.Categories.create({
                name: validated.categorieName 
            }).catch(error => { return manageCatchErrorModel(error)} )
        }

        const audioCategorie = await models.AudioCategorie.findOrCreate({
            where: {
                audioId: audio.id,
                categorieId: categorie.id ?? categorie.dataValues.id
            }
        }).catch(error => { return manageCatchErrorModel(res, error)} )

        return res.status(200).json(audioCategorie)
    },
}