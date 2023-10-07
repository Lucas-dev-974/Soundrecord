const { validator, manageCatchErrorModel } = require("../utils.js");
const models = require("../models");

const self = module.exports = {
    searchCommentForResponse: function(comments, responses){
        for(const [index, response] of Object.entries(responses)){
            const commentIndex = response.responseof
            if(comments[commentIndex]){
                console.log("have question ");
               
                if(!comments[commentIndex].responses) comments[commentIndex].responses = []
                console.log("comments responses:", comments[commentIndex].responses);
                comments[commentIndex].responses.push(response)
                // Todo  mange subcomments

            }
        }

        return comments
    },

    getAudioComments: async function(req, res){
        const validated = validator(req.params, {
            audioid: "int|required"
        })

        if(validated.errors) return res.status(400).json(validated)

        let comments = await models.Comment.findAll({
            where: {
                ...validated, 
                enable: true
            }
        })

        const _comments = {}
        const _response = {}
        
        for(const {dataValues} of comments){
            const author = await models.User.findOne({
                where: {id: dataValues.userid},
                attributes: ["id", "pseudo", "picture"]
            }).catch(error => {return manageCatchErrorModel(error)})

            dataValues.author = author
            const signaled = await models.SignaledComment.findAndCountAll({
                where: {commentid: dataValues.id}
            }).catch(error => {return manageCatchErrorModel(error)})

            dataValues.signaled = signaled.count
            if(dataValues.responseof != null){
                _response[dataValues.id] = dataValues
            }else{
                _comments[dataValues.id] = dataValues
            }
        }

        const response = self.searchCommentForResponse(_comments, _response)
        if(!comments) return res.status(200).json([])   
        return res.status(200).json(response)
    },

    post: async function (req, res) {
        const validated = validator(req.body, {
            content: "string|required",
            audioid: "int|required",
            responseof: "int"
        })

        if(validated.errors) return res.status(400).json(validated.errors)

        const audio = await models.Audio.findOne({
            where: {id: validated.audioid}
        }).catch(error => {return manageCatchErrorModel(error)})
        if(!audio) return res.status(404).json("Il n'est pas possible de placer un commentaire sous un audio qui n'existe pas.")
        
        const comment = await models.Comment.create({
            ...validated,
            userid: req.user.id
        }).catch(error => {
            return manageCatchErrorModel(res, error)
        })



        return res.status(200).json(comment)
    },
  
    edit: async function (req, res) {
        const validated = validator(req.body, {
            commentid: "int|required",
            content: "string|required",
        })

        if(validated.errors) return res.status(400).json(validated.errors)

        const comment = await models.Comment.findOne({
            where: {id: validated.commentid, enable: true}
        }).catch(error => {return manageCatchErrorModel(error)})

        if(comment.userid != req.user.id){
            return res.status(401).json("Vous ne pouvez pas modifier un comment qui n'est pas le votre !")
        }

        comment.set("content", validated.content)
        comment.save()
        return res.status(200).json(true)
    },
    
    remove: async function (req, res) {
        const validated = validator(req.params, {
            commentid: "int|required"
        })

        if(validated.errors) return res.status(400).json(validated.errors)
        const comment = await models.Comment.findOne({
            where: {id: validated.commentid, enable: true}
        })

        if(comment.userid != req.user.id) return res.status(401).json("Vous ne pouvez pas supprimer un commentaire qui n'est pas le votre !")

        comment.destroy()

        return res.status(200).json(true)


    },
    
    signal: async function (req, res) {
        const validated = validator(req.params, {
            commentid: "int|required",
        })

        if(validated.errors) return res.status(400).json(validated.errors)

        const comment = await models.Comment.findOne({
            where: {
                id: validated.commentid,
                enable: true
            }
        }).catch(error => {return manageCatchErrorModel(error)})

        if(!comment) return res.status(404).json("Le commentaire n'existe plus.")

        const signaled = await models.SignaledComment.findOrCreate({
            where: {
                commentid: validated.commentid,
                userid: req.user.id
            }
        }).catch(error => {return manageCatchErrorModel(res, error)})
        
        if(!signaled[1]){
            signaled[0].destroy()
        }

        return res.status(200).json(signaled)
    },

    // Todo maybe review that code 
    mostSignaledComments: async function(req, res){
        const signaleds = await models.SignaledComment.findAndCountAll({
            attributes: ['commentid'],
            group: 'commentid'
        }).catch(error => {return manageCatchErrorModel(res, error)})


        const index = 0;
        for(const signaled of signaleds.rows){

            try{
                // TODO here
                const comment = await models.Comment.findOne({
                    where: signaled.dataValues.commentid
                }).catch(error => {return manageCatchErrorModel(res, error)})
    
            }catch(error){
                console.log(error);
            }

            signaled = {
                comment: comment,
                sigledsTime: signaleds.count[index]
            }
            index++
        }
        return res.status(200).json(signaleds)
    }
  };
  