const htmlspecialchars = require('htmlspecialchars')

module.exports = {
    validate: function(body, params){
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
                    let _result = this.checkType(body, key, _params[0])
                    result = {
                        fails:     {...result.fails, ..._result.fails },
                        validated: {...result.validated, ..._result.validated}
                    }
                }

            }else if(body[key]){
                let _result = this.checkType(body, key, _params[0])
                result = {
                    fails:     {...result.fails, ..._result.fails },
                    validated: {...result.validated, ..._result.validated}
                }
            }
        }

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