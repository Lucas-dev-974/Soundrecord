const { send_mail } = require('../middleware/Email.js')
const {validator}   = require('../utils.js')
const jwt           = require('../middleware/Jwt.js')

const randtoken = require('rand-token')
module.exports = {
    get_mail: function(req, res){

    },

    send_mail: async function(req, res){
        let mail_send = await send_mail(res, 'lucas.lvn97439@gmail.com', 'TEST DEVELOPMENT', 'Test de développerment des mails <a href="http://localhost:8080/profile?mail_service={TOKEN}&type=reset_password&message=Veuillez renseigné un nouveaux mot de passe"> go here </a>')
        if(mail_send) return res.status(200).json({infos: 'Mail envoyé'})
    },

    reset_password: function(req, res){
        let validated = validator(req.body, {email: 'string'})
        if(validated.failsSize > 0) return res.status(403).json({error: validated.fails})
        

        // Generate email token
        const user = { email: validated.validated.email }
        const token = jwt.generateToken(user, true)
        // Build email content
        let email = {
            to: validated.validated.email,
            subject: 'Reset password',
            text: 'Cliquer <a href="http://localhost:8080/authentication?mail_service=' + token + '&type=reset_password">ici</a> pour réinitialisé votre mot de passe'
        }
        
        // Send email when send return response
        send_mail(res, email, token)
    },

}