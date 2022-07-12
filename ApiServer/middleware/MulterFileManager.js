const multer = require('multer')
const path   = require('path')
const fs     = require('fs')

const StoragePath = path.resolve(__dirname, '..') + '/public/user-'

const file_utils = {
    get_storage_path(path, userid){
        let folder_file
        switch(path){
            case '/pist': // if path of the route is /api/pist/ 
                // We want to difine where to import the file
                folder_file = StoragePath + userid + '/imported/'   
                break
            case '/picture':
                folder_file = StoragePath + userid + '/picture/'
                break

            case '/profile-setting/banner-upload':
                folder_file = StoragePath + userid + '/banner/'
                break

            default:
                return cb(new Error('Impossible d\'importer'))
        }

        return folder_file
    }
}

/**
 * @summary Storage fonction allow to define where to save file in fonction of req.path
 */
const storage = multer.diskStorage({

    /**
     * @summary Destination function allow to define the folder of the file 
     * @param {Request} req 
     * @param {File} file 
     * @param {Function} cb 
     */
    destination: async  (req, file, cb) => {
        // Repository where to import all file for the usere
        let folder_file = file_utils.get_storage_path(req.path, req.user.id)

        req.fileInfos         = file    
        req.fileInfos['date'] = Date.now()
        
        // If the folder does'nt exist create one
        if (!fs.existsSync(folder_file))  fs.mkdirSync(folder_file, { recursive: true })
        cb(null, folder_file)
    },

    /**
     * @summary This function allow to define the name of the file in fonction of req.path
     * @param {Request} req 
     * @param {File} file 
     * @param {Function} cb 
     */
    filename: (req, file, cb) => {
        let name 
        if(req.path = '/profile-setting/banner-upload'){
            name = 'banner' + path.extname(file.originalname)
        }else if(req.path == '/picture'){
            name = 'profile-picture' + path.extname(file.originalname)
        }else{
            name = req.user.id + '-' + req.fileInfos.date + '-' + file.originalname.replace(/ /g, '')
        }

        req.filename = name
        cb(null, name)
    },
})  

exports.upload = multer({
    /**
     * @summary This fontion allow to filter the file via it extension
     * @param {Request}  req 
     * @param {File}     file 
     * @param {Function} callback 
     */
    fileFilter: function(req, file, callback){
        let ext = path.extname(file.originalname)
        let extensions_img = ['.jpeg', '.png', '.jpg']
        let extensions_sng = ['.mp3', '.wav']

        req.Isaudio = false
        req.Isimage = false

        // If the extension name is not included in extensions arrays
        if(!extensions_img.includes(ext) || !extensions_sng.includes(ext)){
            req.AutorizedFile = false
            callback(null, false)     // Return an error
        }else req.AutorizedFile = true  
        

        if(extensions_sng.includes(ext)) req.Isaudio = true
        else                             req.Isimage = true

        req.filename = file
        req.fileext  = ext
        callback(null, true)
    },

    storage: storage,
}) 