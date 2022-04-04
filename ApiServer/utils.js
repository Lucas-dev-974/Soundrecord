module.exports = {
    returnFields(data, fields){
        let fieldsToReturn = {}
        for(const [key, value] of Object.entries(data)){
            fields.forEach(field => {
                if(key == field) fieldsToReturn[key] = value
            });
        }
        return fieldsToReturn
    },

}