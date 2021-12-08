module.exports = {
    validate: function(body, params){
        let errors    = []
        let validated = {}
        for(const [key, value] of Object.entries(params)){
            console.log(key);
            if(body[key]){
                switch(value){
                    case 'string':
                        if(typeof(body[key]) !==  'string'){
                            errors.push('Le champs ' + key + ' doit être une chaine de charactère')
                        }else validated[key] = body[key]
                        break

                    case 'int':
                        if(Number.isInteger(body[key])) validated[key] = body[key]
                        else errors.push('Le champs ' + key + ' doit être un nombre')
                        break

                    case 'decimal':
                        break

                    default: 
                        errors.push({
                            [value]: 'type non reconnue !'
                        })
                }
            }else{
                errors.push('Le champ ' + key + ' n\'a pas était renseigner ! \n')
            }
        }

        if(errors.length > 0) return {errors: errors}
        else                  return validated
    }
}