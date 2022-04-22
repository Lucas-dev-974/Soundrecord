module.exports = {
    get: async function(req, res){
        const { model,id } = req.query
        console.log(model, id);
        let error = []
        if(typeof(model) != 'string' || !model) error.push({error: 'Format de donnée reçus incorrect pour la donnée model'})
        if(typeof(id)    != 'integer'   || !id)    error.push({error: 'Format de donnée reçus incorrect pour la donnée id'})
        if(error.length > 0) return res.status(403).json(error)
         

    },

    all: async function(){

    },

    delilke: async function(){

    },

    ProfileLike: async function(){

    },

    CreationLike: function(){
        
    }
}