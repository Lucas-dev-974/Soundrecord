const multer = require('multer')
const path = require('path')
const fs   = require('fs')

const StoragePath = path.resolve(__dirname, '..')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let UserDirname
        switch(req.path){
            case '/pists/':
                UserDirname = StoragePath + '/public/' + 'user-' + req.userID + '/imported/'
                break
            default:
                return cb(new Error('Impossible d\'importer'))
        }

        req.fileInfos = file
        req.fileInfos['date'] = Date.now()

        if (!fs.existsSync(UserDirname)) fs.mkdirSync(UserDirname)
        cb(null, UserDirname)
    },

    filename: (req, file, cb) => {
        let name = req.userID + '-' + req.fileInfos.date + '-' + file.originalname.replace(/ /g, '')
        cb(null, name)
    },
})  

exports.upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        let ext = path.extname(file.originalname)
        if(ext !== '.mp3'){
            req.isNotAudio = true
            callback(null, false)
        } 
        else callback(null, true)
    }
}) 