const fs = require('fs')
const path      = require('path')
const validator = require('../validator')
const models    = require('../models')
const { json } = require('body-parser')

const filesPath = path.resolve(__dirname, '../public/')

module.exports = {

    getAll: async function(req, res){
        try{
            let pists = await models.Import.findAll({
                where: { 'userID': req.userID },
                include: [
                    { model: models.User }
                ]
            })
            return res.status(200).json(pists)
        }catch(err){
            console.log(err);
        }
    },

    get: async function(req, res){

        // Check if params is given
        let validated = validator.validate(req.params, { "id": 'int' })
        if(validated.errors) return res.status(403).json(validated)     
        
        // Get Imported file infos in database
        let pist = await models.Import.findOne({    
            attributes: ['id', 'userID', 'name', 'imported_date'],
            where: {id: validated.id}
        })

        
        if(!pist) return res.status(403).json({errors: 'L\'audio n\'a pas été trouvé !'})

        // create user directory to upload file and the file directory name
        let userDir = filesPath + '/user-' + req.userID + '/imported/'
        let fileDir = userDir + req.userID + '-' + pist.dataValues.imported_date + '-' + pist.dataValues.name + '.mp3' 

        // Check si le fichié existe si non retourne une erreur
        if(!fs.existsSync(fileDir)) return res.status(403).json({}) 
        let stat = fs.statSync(fileDir); 
        
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
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
            readStream = fs.createReadStream(fileDir);
        }
        readStream.pipe(res);
    },

    import: function(req, res){
        if(req.isNotAudio === true) return res.status(403).json({
            error: 'Un fichier de type mp3 est attendu !'
        })
        console.log('------------------------okokokokok');
        console.log(req.fileInfos);

        models.Import.create({
            name: path.parse(req.fileInfos.originalname).name.replace(/ /g, ''),
            userID: req.userID,
            imported_date: req.fileInfos.date
        }).then(imp => {
            // console.log(imp);
            // console.log('-------------- Error ---------------');
        }).catch(err => {
            console.log('-------------- Error ---------------');
            console.log(err);
        })

        return res.status(200).json({})
    },

    delete: function(req, res){

    }
}