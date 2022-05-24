const htmlspecialchars = require('htmlspecialchars')

const self = module.exports = {
    returnFields(data, fields){ // ter
        let fieldsToReturn = {}
        for(const [key, value] of Object.entries(data)){
            fields.forEach(field => {
                if(key == field) fieldsToReturn[key] = value
            });
        }
        return fieldsToReturn
    },

    // Return hashed password given in params
    HashPassword: function(password){
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        return password;
    },


    // For sequelize database search with pagination we need certein params like {limit, offset}
    // Here with this function  we can get these params with the page and the pages number
    GetPagination: function(page = 0, size = 10){
        const limit = size ? +size : 3
        const offset = page ? page * limit : 0
        return { limit, offset }
    },

    // Return datas of asked page
    GetPagingDatas: function(data, page, limit){
        const { count: totalItems, rows: datas } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, datas, totalPages, currentPage };
    },

    // Check if params is in good type and don't increase length limit
    // Dont validate the params if its not good
    // Params is type required for specific request params
    validator: function(body, params){
        let result = { fails: [], validated: {} }

        for(const [key, value] of Object.entries(params)){

            let _params = value.split(':')
            if(_params.length > 0){
                if(body[key] == 'undefined'){
                    // console.log(key);
                    result = { 
                        fails: {...result.fails,  [key]: 'Le champ ' + key + ' dois être renseigner !'},
                        validated: {...result.validated}
                    }                    
                    
                }else{
                    // console.log('key:', key);
                    let _result = self.checkType(body, key, _params[0])
                    
                    result = {
                        fails:     {...result.fails, ..._result.fails },
                        validated: {...result.validated, ..._result.validated}
                    }
                }

            }else if(body[key]){
                
                let _result = self.checkType(body, key, _params[0])
                result = {
                    fails:     {...result.fails, ..._result.fails },
                    validated: {...result.validated, ..._result.validated},
                }
            }
        }

        result['failsSize'] = Object.entries(result.fails).length
        result['validatedSize'] = Object.entries(result.validated).length
        return result
    },

    checkType: function(body, key, value){
        let errors = {}
        let validated = {}
        switch(value){
            case 'string':
                if(typeof(body[key]) !==  'string'){
                    errors[key] = 'Le champs ' + key + ' doit être une chaine de charactère'
                }else validated[key] = htmlspecialchars(body[key])
                break

            case 'int':
                try{
                    body[key] = parseInt(body[key])
                }catch(err){
                    console.log(err);
                }
                if(Number.isInteger(body[key])) validated[key] = body[key]
                else errors[key] = 'Le champ ' + key + ' doit être un nombre'
                break

            case 'boolean':
                if(typeof(body[key]) == 'boolean') validated[key] = body[key]
                else errors[key] = 'Le champ ' + key + ' doit être un boolean'
                break

            default: 
                errors.push({
                    [value]: 'type non reconnue !'
                })
        }

        return { fails: {...errors}, validated: validated }
    }
}

