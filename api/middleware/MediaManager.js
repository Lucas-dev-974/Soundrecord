module.exports = {
    handleMediaUrl: function (req,  res, next){
        if(req.url.includes('medias')){
            if(req.url.includes('audio')){
                next()
            }
        } 
        next()
    }
}