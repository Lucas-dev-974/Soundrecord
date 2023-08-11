const htmlspecialchars = require('htmlspecialchars')

module.exports = self = {

    /**
     * Validates if the given array of objects corresponds to the data type requirements specified in params.
     * @param {object} body - The data object to validate.
     * @param {object} params - The parameter object specifying the data type requirements for each field.
     * @returns {object} - An object with validation results containing validated data, validation errors, and the size of validated data.
     */
    validate: function(body, params){
        let result = { fails: {}, validated: {}, validatedSize: 0 };

        // Loop through the object entries of params
        for (const [key, rule] of Object.entries(params)) {
            if (body[key] || rule) {
                // Check if the field is required
                if (!body[key] && rule) {
                    result.fails[key] = `Le champ ${key} doit être renseigné !`;
                } else {
                    // Validate the field based on the specified data type rule
                    let _result = self.checkType(body, key, rule);
                    result.fails = { ...result.fails, ..._result.fails };
                    result.validated = { ...result.validated, ..._result.validated };
                }
            }
        }

        result.validatedSize = Object.keys(result.validated).length;
        return result;
    },


    /**
     * Checks the data type of a specific field in the body object based on the specified rules.
     * @param {object} body - The data object to validate.
     * @param {string} key - The key of the field to validate.
     * @param {string} rules - The data type rules for the field (e.g., 'string|required' or 'int').
     * @returns {object} - An object with validation results containing validated data and validation errors.
     */
    checkType: function (body, key, rules) {
        let errors = {};
        let validated = {};

        const [type, isRequired] = this.getRules(rules.split("|"));

        // Check if the field is required
        if (isRequired && !body[key]) {
            errors.push({ [key]: `Le champ ${key} doit être renseigné !` });
        } else if (body[key] !== undefined) {
            // Validate the field based on the specified data type rule
            switch (type) {
                case 'string':
                    if (typeof body[key] !== 'string') errors[key] = `Le champ ${key} est incorrecte`;
                    else validated[key] = htmlspecialchars(body[key]);
                    break;

                case 'int':
                    if (Number.isInteger(Number(body[key]))) validated[key] = body[key];
                    else errors[key] = `Le champ ${key} est incorrecte`;
                    break;

                case 'decimal':
                    const n = parseFloat(body[key]);
                    if (!isNaN(n) && n % 1 !== 0) validated[key] = n;
                    else errors[key] = `Le champ ${key} est incorrecte`;
                    break;

                case 'boolean':
                    if (typeof body[key] === 'boolean') validated[key] = body[key];
                    else errors[key] = `Le champ ${key} est incorrecte`;
                    break;

                default:
                    errors[key] = `Le champ ${key} est incorrecte`;
                    break;
            }
        }

        return {
            fails: errors,
            validated,
        };
    },

    /**
     * Parses the rules array to get the data type and required status for a field.
     * @param {array} rulesArr - The array containing data type rules for the field.
     * @returns {array} - An array containing the data type and required status.
     */
    getRules: function (rulesArr) {
        const type = rulesArr.find(rule => ['string', 'int', 'decimal', 'boolean'].includes(rule));
        const isRequired = rulesArr.includes('required');
        return [type, isRequired];
    }
};
