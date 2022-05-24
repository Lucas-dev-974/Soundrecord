const { send_mail } = require('../middleware/Email.js')
const {validator}   = require('../utils.js')
const jwt           = require('../middleware/Jwt.js')

require('dotenv').config();

module.exports = {
    get_mail: function(req, res){

    },

    send_mail: async function(req, res){
        let validated = validator(req.body, {to: string, subject: 'string', content: 'string'})
        if(validated.failsSize > 0) return res.status(403).json(validated.fails)

        send_mail(res, validated.validated.to, validated.validated.subject, validated.validated.content)
    },

    reset_password: function(req, res){
        let validated = validator(req.body, {email: 'string'})
        if(validated.failsSize > 0) return res.status(403).json({error: validated.fails})
        
        // Generate email token to verify for next step
        const user  = { email: validated.validated.email }
        const token = jwt.generateToken(user, true)

        // Build email content
        let email = {
            to: validated.validated.email,
            subject: 'Reset password',
            text: 'Cliquer <a href="' + process.env.APP_URL + '/authentication?mail_service=' + token + '&type=reset_password">ici</a> pour réinitialisé votre mot de passe'
        }
        
        // Send email when send return response
        send_mail(res, email, token)
    },
}