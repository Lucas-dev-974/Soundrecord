const multer = require('multer')
const path = require('path')
const fs   = require('fs')

const StoragePath = path.resolve(__dirname, '..') + '/public/user-'

const storage = multer.diskStorage({
    destination: async  (req, file, cb) => {
        let folderFile // Repository where to import all file for the usere
        switch(req.path){
            case '/pist': // if path of the route is /api/pist/ 
                // We want to difine where to import the file
                folderFile = StoragePath + req.user.id + '/imported/'   
                break
            case '/picture':
                folderFile = StoragePath + req.user.id + '/picture/'
                break
            default:
                return cb(new Error('Impossible d\'importer'))
        }

        // let us to use the data file in the controller
        req.fileInfos = file    
        req.fileInfos['date'] = Date.now()

        // If the folder does'nt exist create one
        if (!fs.existsSync(folderFile))  fs.mkdirSync(folderFile, { recursive: true })
        cb(null, folderFile)
    },

    filename: (req, file, cb) => {
        console.log('in file name');
        let name
        if( req.path == '/picture') name = file.originalname.replace(/ /g, '')
        else name = req.user.id + '-' + req.fileInfos.date + '-' + file.originalname.replace(/ /g, '')
        cb(null, name)
    },
})  

exports.upload = multer({
    // Upload only if file is
    fileFilter: function(req, file, callback){
        console.log('in filter file');
        let ext = path.extname(file.originalname)
        let extensions = ['.mp3', '.jpeg', '.png', '.jpg', '.wav']

        if(!extensions.includes(ext)){
            req.AutorizedFile = false
            callback(null, false) // Return an errorz
        }else req.AutorizedFile = true
        
        
        if(ext == '.mp3' || ext == '.wav'){
            req.Isaudio = true
            req.Isimage = false
        }else{
            req.Isaudio = false
            req.Isimage = true
        }
        
        callback(null, true)
    },

    storage: storage,
}) 