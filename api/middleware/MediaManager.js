module.exports = {
    handleMediaUrl: function (req,  res, next){
        if(req.url.includes('profil-picture')){
            return res.status(500).json({message: "Media middleware OK"})
        }
        next()
    }
}