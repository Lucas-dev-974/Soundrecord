const { Op } = require('sequelize/dist');
const models = require('../models')
const {validator} = require('../utils.js')
const {GetPagination, GetPagingDatas} = require('../utils.js')


const self = module.exports = {
    SearchSession: async function(req, res){
        const validated = validator(req.body, {query: 'string', size: 'int', page: 'int'})
        const { limit, offset } = GetPagination(validated.validated.page, validated.validated.size);

        const sessions = await models.Session.findAndCountAll({
            where: {
                session_name: { [Op.like]: validated.validated.query + '%'}
            }, limit: limit, offset: offset
        }).catch(erro => console.log(erro))

        for(const key in sessions.rows){
            const session = sessions.rows[key].dataValues
            let imports = await models.SessionTrack.findAndCountAll({where: {sessionid: session.id}})
            sessions.rows[key].dataValues.importedIn = imports.count
        }

        const response = GetPagingDatas(sessions, validated.validated.page, limit)
        return res.status(200).json(response)
    },

    SearchUser: async function(req, res){
        const validated = validator(req.body, {query: 'string', size: 'int', page: 'int'})

        const { limit, offset } = GetPagination(validated.validated.page, validated.validated.size);

        const search = await models.User.findAndCountAll({
            where: [
                {name: { [Op.like]: validated.validated.query + '%'}},
                {email: { [Op.like]: validated.validated.query + '%'}}
            ], limit: limit, offset: offset
        }).catch(erro => console.log(erro))

        const response = GetPagingDatas(search, validated.validated.page, limit)
        return res.status(200).json(response)
    },

    SearchImport: async function(req, res){
        const validated = validator(req.body, {query: 'string', size: 'int', page: 'int'})

        const { limit, offset } = GetPagination(validated.validated.page, validated.validated.size);

        const search = await models.Import.findAndCountAll({
            where: {
                name: { [Op.like]: validated.validated.query + '%'}
            }, limit: limit, offset: offset
        }).catch(erro => console.log(erro))

        const response = GetPagingDatas(search, validated.validated.page, limit)
        return res.status(200).json(response)
    },
}