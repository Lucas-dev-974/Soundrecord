const htmlspecialchars = require('htmlspecialchars')

const self = module.exports = {
    returnFields(data, fields){
        let fieldsToReturn = {}
        for(const [key, value] of Object.entries(data)){
            fields.forEach(field => {
                if(key == field) fieldsToReturn[key] = value
            });
        }
        return fieldsToReturn
    },

    HashPassword: function(password){
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        return password;
    },

    GetPagination: function(page = 0, size = 10){
        const limit = size ? +size : 3
        const offset = page ? page * limit : 0
        return { limit, offset }
    },

    GetPagingDatas: function(data, page, limit){
        const { count: totalItems, rows: datas } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, datas, totalPages, currentPage };
    },

    validator: function(body, params){
        let result = {
            fails: [],
            validated: {}
        }

        for(const [key, value] of Object.entries(params)){
            let _params = value.split(':')
            if(_params.length > 1){
                if(!body[key]){
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
                    error[key] = 'Le champs ' + key + ' doit être une chaine de charactère'
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

            case 'decimal':
                break

            default: 
                errors.push({
                    [value]: 'type non reconnue !'
                })
        }


        return {
            fails: {...errors},
            validated: validated
        }
    }
}

