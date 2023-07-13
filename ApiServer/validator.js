const htmlspecialchars = require('htmlspecialchars')

module.exports = self = {

    /**
     * @summary Lets check if an given array of object correspond to params data type requirement
     * @param {array} body
     * @param {array} params 
     * @returns { validated:object, validatedSize:integer, fails:object}
     */
    validate: function(body, params){
        let result = { fails: [], validated: {}, validatedSize: 0 };
        
        // Boocle on object entries of params
        for(const [key, value] of Object.entries(params)){
            if(value){
                if(!body[key]){
                    result = { 
                        fails: {...result.fails,  [key]: 'Le champ ' + key + ' dois être renseigner !'},
                        validated: {...result.validated}
                    };                    
                }else{
                    let _result = self.checkType(body, key, value);
                    result = {
                        fails:     {...result.fails, ..._result.fails },
                        validated: {...result.validated, ..._result.validated}
                    };
                };

            }else if(body[key]){
                let _result = self.checkType(body, key, value)
                result = {
                    fails:     {...result.fails, ..._result.fails },
                    validated: {...result.validated, ..._result.validated}
                };
            };
        };
        
        result.validatedSize = Object.entries(result.validated).length
        return result;
    },

    /**
     * 
     * @param {Array} body 
     * @param {Array} key 
     * @param {*} type 
     * @returns 
     */
    checkType: function(body, key, type){
        let errors = [];
        let validated = [];

        console.log('in CheckType:', body, key, type);
        
        switch(type){
            case 'string':
                if(typeof(body[key]) !== 'string') errors.push({[type]: 'Le champs ' + key + ' doit être une chaine de charactère'});
                else                             validated[key] = htmlspecialchars(body[key]);
                break;

            case 'int':
                
                if(Number.isInteger(body[key])) validated[key] = body[key];
                else errors.push({[type]: 'Le champ ' + key + ' doit être un nombre'});
                break;

            case 'decimal':
                if(Number(body[key]) === n && n % 1 !== 0) validated[key] = body[key];
                else errors.push({[type]: 'Le champ ' + key + ' doit être un décimal'});
                break;
            
            case 'boolean':
                if(typeof(body[key]) === boolean) validated[key] = body[key];
                else errors.push({[type]: 'Le champ ' + key + ' doit être un boolean'});
                break;
            default: 
                errors.push({[type]: 'type non reconnue !'});
                break;
        }


        return {
            fails: {...errors},
            validated: validated
        }
    }
}