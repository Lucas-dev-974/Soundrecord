const fs = require('fs')
const path      = require('path')
const { validator, exclude } = require('../utils.js')
const models    = require('../models')
const filesPath = path.resolve(__dirname, '../public/')

require('dotenv').config();
const {GetPagination, GetPagingDatas } = require('../utils.js')
module.exports = {
    get: async function(req, res){
        // let validated = validator.validate(req.body, { "id": 'int' }) // For postman
        let validated = validator(req.params, { "id": 'int' })
        if(validated.fails.length > 0) return res.status(400).json(validated.fails)
        
        let pist = await models.Import.findOne({
            where:      { id: validated.validated.id },
            attributes: ['id', 'userID', 'name', 'imported_date']
        })
        if(!pist) return res.status(403).json({errors: 'L\'audio n\'a pas été trouvé !'})
        
        // create user directory to upload file and the file directory name
        let userDir = filesPath + '/user-' + req.user.id + '/imported/'
        let fileDir = userDir + req.user.id + '-' + pist.dataValues.imported_date + '-' + pist.dataValues.name + '.mp3' 


        
        // Check if file exist if not return error
        if(!fs.existsSync(fileDir)) return res.status(403).json({error: 'file does\'nt exist'}) 
        // const imageBuffer = fs.readFileSync()
        // ---------------------------------------
        let stat = fs.statSync(fileDir)['size']; 
        let readStream  
        let range  = (req.headers.range) ? req.headers.range : null
        if(range !== null){
            let parts = range.replace(/bytes=/, "").split("-");

            let partial_start = parts[0];
            let partial_end   = parts[1];
    
            if ((isNaN(partial_start) && partial_start.length > 1) || (isNaN(partial_end) && partial_end.length > 1)) {
                return res.sendStatus(500); //ERR_INCOMPLETE_CHUNKED_ENCODING
            }
    
            let start = parseInt(partial_start, 10);
            let end = partial_end ? parseInt(partial_end, 10) : stat.size - 1;
            let content_length = (end - start) + 1;
    
            res.status(206).header({
                'Content-Type': 'audio/mpeg',
                 'Content-Length': content_length,
                'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
            });
            
            readStream = fs.createReadStream(fileDir, {start: start, end: end});
        }else{
            res.header({
                'Content-Type': 'arraybuffer',
                'Content-Length': stat.size
            });
            readStream = fs.createReadStream(fileDir);
        }  
        return readStream.pipe(res);
    },


    all: async function(req, res){
        let   { page, size } = req.query
        if(!size) size = 10
        if(!page) page = 0

        const { limit, offset } = GetPagination(page, size);
        
        let pists  = await models.Import.findAndCountAll({
            where: { userid: req.user.id },
            attributes: ['id', 'userID', 'name', 'imported_date'],
            limit: limit,
            offset: offset
        }).catch(error => console.log(error))

        // for(const key in pists.rows){
        //     const pist = pists.rows[key].dataValues
        //     let sessions = await models.Session.findAndCountAll({where: {sessionid: pist.id}})
        //     sessions.rows[key].dataValues.importedIn = imports.count
        // }
        
        const response = GetPagingDatas(pists, page, limit)
        return res.status(200).json(response)
    },  

    /**
     * @summary Build default audio config to insert in database
     *          Return default audio config
     * @param {any} req 
     * @param {any} res 
     * @returns 
     */
    Import: async function(req, res){
        // Check if is autorized, Setting up in MulterMiddleware
        if(!req.AutorizedFile || req.Isaudio == false ) return res.status(403).json({ error: 'Un fichier de type mp3 est attendu !' })
        
        let validated = validator(req.body, {sessionid: 'int'})              // Check if we have session id
        
        // Audio data
        let pist = await models.Import.create({
            name: path.parse(req.fileInfos.originalname).name.replace(/ /g, ''),
            userID: req.user.id,
            imported_date: req.fileInfos.date,
            public: false
        }).catch(error => { console.log(error) })
        
        if(validated.failsSize === 0){
            let session_track = await models.SessionTrack.create({
                sessionid: validated.validated.sessionid,
                importid: pist.dataValues.id,
                userid: req.user.id,
                muted: false,
                color: 'green',
                src: process.env.APP_URL + '/api/pist/' + pist.id,
                gain: 0.5,
            }).catch(error => { console.log(error) })
            return res.status(200).json({
                import: pist.dataValues,
                session_track: session_track,
                test: exclude(pist, ['updatedAt', 'createdAt'])
            })
        }

        return res.status(200).json({
            src: process.env.APP_URL + '/api/pist/' + pist.id,
            ...pist.dataValues,
        })
    },

    delete: async function(req, res){
        let validated = validator(req.params, { pistid: 'int' })
        if(validated.fails.length > 0) return res.status(403).json({errors: validated.fails})
        try{
            let pist = await models.Import.findOne({ where: {id: validated.validated.pistid} })
            if(!pist) return res.status(400).json({error: 'La pist n\'existe plus !'})
            if(pist.userID !== req.user.id)  return res.status(401).json({error: 'Vous n\'ête pas autorisé à supprimer cet donné !'})
            console.log(pist);
            // Destroy entry in database
            await pist.destroy()

        }catch(error){
            console.log(error);
            return res.status(500).json({error: 'Une erreur c\'est produite !'})
        }
        return res.status(200).json({'infos': 'la pist à bien été supprimé !'})
    },

    update: async function(req, res){
        let validated = validator(req.body, { fields: 'string', datas: 'string', pistid: 'int' })
        if(validated.fails.length > 0) return res.status(400).json(validated.fails)

        let fields = validated.validated.fields.split('|')
        let datas  = validated.validated.datas.split('|')

        let fieldsPist = ['name']
        let pist = await models.Import.findOne({
            where: {id: validated.validated.pistid },
            // attributes: fieldsPist
        })

        if(!pist) return res.status(400).json({error: 'La pist n\'existe pas !'})
        if(pist.userid !== req.user.id) return res.status(400).json({ error: 'Vous n\'ête pas autorisé à modifier cet pist'})

        for(let i = 0; i < fields.length; i++){
            if(fieldsPist.includes(fields[i])) {
                try{
                    pist.set({ [fields[i]]: datas[i] })// {name: 'pistname'}
                    await pist.save()
                }catch(error){
                    console.log(error);
                    return res.status(500).json({error: 'Une erreur est survenue, veuillez réesayer plus tard'})
                }
            }
        }
        
        return res.status(200).json()
    },

    deleteIn: async function(req, res){
        let validated = validator(req.params, {pistid: 'int'})
        if(validated.fails.length > 0) return res.status(400).json(validated.fails)
        
        let pistSessionTrack = await models.SessionTrack.findOne({
            where: {id: validated.validated.pistid}
        })
        
        pistSessionTrack.destroy()
        pistSessionTrack.save()

        return res.status(200).json()
    },

    checkWherePistIsImported: async function(){
        let validated = validator(req.body, {pistid: 'int'})
        if(validated.fails.length > 0) return res.status(400).json(validated.fails)

        

        let SessionTrackSession = models.SessionTrack.findAll({
            where: { pistid: validated.validated.pistid } 
        })

        return res.status(200).json(SessionTrackSession)
    },

    importInFromPistID: async function(req, res){
        // Get session id and import id
        let validated = validator(req.body, { sessionid: 'int', importid: 'int'})
        if(validated.fails.length > 0) return res.status(400).json(validated.fails)
        
        let Import  = await models.Import.findOne({
            where: {userid: req.user.id, id: validated.validated.importid},
            attributes: ['id', 'userID', 'name', 'imported_date'],
        }).catch(error => console.log(error))
        

        let importIn = await models.SessionTrack.create({
            sessionid: validated.validated.sessionid,
            importid: validated.validated.importid,
            userid: req.user.id,
            selected: true,
            color: 'green',
            src: '/api/pist/' + validated.validated.importid,
            gain: 50
        }).catch(error => { console.log(error) })
        
        return res.status(200).json({
            name: Import.dataValues.name,
            ...importIn.dataValues
        })
    },

    getImported: async function(req, res){
        let validated = validator(req.params, {sessionid: 'int'})

        if(validated.fails.length > 0)
            return res.status(400).json(validated.fails)
        

        let session = await models.Session.findOne({
            where: {id: validated.validated.sessionid},
            include: [{
                model: models.SessionTrack,
                include: [{model: models.Import}]
            }]    
        })        

        if(session.dataValues.userid !== req.user.id) return res.status(401).json({error: 'Vous ne pouvez accédé à cet ressource'})

        let SessionTrack = []
        session.dataValues.SessionTracks.forEach(imported => {
            SessionTrack.push(imported)
        })
        
        return res.status(200).json(SessionTrack)
    },

    UpdatePist: async function(req, res){
        let validated = validator(req.body,  {pistid: 'int', field: 'string', value: 'string'})
        
        if(validated.fails.length > 0) return res.status(400).json(validated.fails)

        let pist = await models.SessionTrack.findOne({
            where: { id: validated.validated.pistid }
        })

        let updatable = Object.keys(pist.dataValues)

        if(!updatable.includes(validated.validated.field))  return res.status(400).json({error: ''})
        pist[validated.validated.field] = validated.validated.value
        pist.save()
        
        return res.status(200).json()
    },


    save_session: function(){
        
    }
}