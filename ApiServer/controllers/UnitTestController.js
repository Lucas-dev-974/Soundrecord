module.exports = {
    Livre: function(req, res){
        return res.status(200).json({
            titre: 'Livre titre',
            content: 'lorem ipsum'
        })
    }
}