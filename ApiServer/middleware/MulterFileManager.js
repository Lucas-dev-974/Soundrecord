const multer = require('multer')
const path = require('path')
const fs   = require('fs')

const StoragePath = path.resolve(__dirname, '..')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let UserDirname // Repository where to import all file for the user
        
        switch(req.path){
            case '/pists/': // if path of the route is /api/pist/ 
                // We want to difine where to import the file
                UserDirname = StoragePath + '/public/' + 'user-' + req.userID + '/imported/'
                break
            default:
                return cb(new Error('Impossible d\'importer'))
        }

        // let us to use the data file in the controller
        req.fileInfos = file    
        req.fileInfos['date'] = Date.now()

        // If the folder does'nt exist create one
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

    // Upload only if file is
    fileFilter: function(req, file, callback){
        let ext = path.extname(file.originalname)
        
        let extensions = ['.mp3']
        let error = false

        extensions.forEach(ext => {
            if(ext !== ext) error = true
        })
        if(error == true){
            req.isNotAudio = true
            callback(null, false) 
        } 
        else callback(null, true)
    }
}) 